import { Router } from "express";
import Stripe from "stripe";
import { randomUUID } from "crypto";
import pino from "pino";
import { prisma } from "../lib/prisma";
import { computeLeafHash } from "../services/merkle";
import { computeShadowDID, generateDidSalt } from "../lib/shadowDid";
import { audit } from "../services/audit";
import { env } from "../lib/env";

const logger = pino({ level: env.LOG_LEVEL });
const router = Router();

router.post("/stripe", async (req, res) => {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.warn({ error: message }, "Webhook signature verification failed");
    res.status(400).json({ error: `Webhook Error: ${message}` });
    return;
  }

  const reqId = (req as Request & { requestId?: string }).requestId;

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const { email, locationId } = pi.metadata;

      if (!email || !locationId) {
        logger.error(
          { paymentIntentId: pi.id },
          "Missing metadata on PaymentIntent"
        );
        break;
      }

      try {
        // Find or create user with HMAC shadow DID
        const didSalt = generateDidSalt();
        const shadowDID = computeShadowDID(email, didSalt, env.SHADOW_DID_SECRET);

        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: { email, shadowDID, didSalt },
          });
        }

        // Create donation with leafHash
        const nonce = randomUUID();
        const donationId = randomUUID();
        const timestamp = new Date();

        const leafHash = computeLeafHash(
          donationId,
          pi.amount,
          nonce,
          timestamp.toISOString()
        );

        await prisma.donation.create({
          data: {
            id: donationId,
            amount: pi.amount,
            currency: pi.currency.toUpperCase(),
            timestamp,
            leafHash,
            nonce,
            locationId,
            userId: user.id,
            stripePaymentIntentId: pi.id,
          },
        });

        await audit({
          action: "DONATION_CREATED",
          entity: "Donation",
          entityId: donationId,
          data: {
            amount: pi.amount,
            locationId,
            stripePaymentIntentId: pi.id,
          },
          requestId: reqId,
          ip: req.ip,
        });

        logger.info(
          { donationId, paymentIntentId: pi.id, amount: pi.amount },
          "Donation created from webhook"
        );
      } catch (err) {
        logger.error(
          { error: err, paymentIntentId: pi.id },
          "Failed to create donation from webhook"
        );
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      logger.warn({ paymentIntentId: pi.id }, "Payment failed");
      await audit({
        action: "PAYMENT_FAILED",
        entity: "PaymentIntent",
        entityId: pi.id,
        requestId: reqId,
      });
      break;
    }

    default:
      logger.info({ type: event.type }, "Unhandled webhook event type");
  }

  res.json({ received: true });
});

export default router;
