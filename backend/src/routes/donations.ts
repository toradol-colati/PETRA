import { Router } from "express";
import Stripe from "stripe";
import { prisma } from "../lib/prisma";
import { createDonationSchema } from "../schemas/donation";
import { generateMerkleProof, verifyMerkleProof } from "../services/merkle";
import { audit } from "../services/audit";
import { env } from "../lib/env";
import { getExplorerUrl } from "../services/xrpl";

const router = Router();

// POST /api/donations — Create Stripe PaymentIntent (pre-donation)
router.post("/", async (req, res) => {
  const parsed = createDonationSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { amount, currency, locationId, email } = parsed.data;

  const project = await prisma.project.findUnique({
    where: { id: locationId },
  });

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  if (project.status !== "ACTIVE") {
    res
      .status(422)
      .json({ error: "Project is not currently accepting donations" });
    return;
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);

  const params: Stripe.PaymentIntentCreateParams = {
    amount,
    currency: currency.toLowerCase(),
    metadata: { email, locationId },
  };

  if (project.stripeAccountId) {
    params.transfer_data = { destination: project.stripeAccountId };
  }

  const paymentIntent = await stripe.paymentIntents.create(params);

  await audit({
    action: "PAYMENT_INTENT_CREATED",
    entity: "PaymentIntent",
    entityId: paymentIntent.id,
    data: { amount, locationId },
    requestId: (req as any).requestId,
    ip: req.ip,
  });

  res.status(201).json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
});

// GET /api/donations/:id
router.get("/:id", async (req, res) => {
  const donation = await prisma.donation.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      amount: true,
      currency: true,
      timestamp: true,
      leafHash: true,
      batched: true,
      batch: {
        select: {
          id: true,
          rootHash: true,
          xrplTxHash: true,
          status: true,
          leafCount: true,
        },
      },
    },
  });

  if (!donation) {
    res.status(404).json({ error: "Donation not found" });
    return;
  }

  res.json(donation);
});

// GET /api/donations/:id/verify — End-to-end cryptographic verification
router.get("/:id/verify", async (req, res) => {
  const donation = await prisma.donation.findUnique({
    where: { id: req.params.id },
    include: {
      batch: {
        include: {
          donations: { select: { leafHash: true } },
        },
      },
    },
  });

  if (!donation) {
    res.status(404).json({ error: "Donation not found" });
    return;
  }

  if (!donation.batch) {
    res.json({
      verified: false,
      reason: "Donation not yet included in a batch",
      donation: {
        id: donation.id,
        leafHash: donation.leafHash,
        amount: donation.amount,
      },
    });
    return;
  }

  const leaves = donation.batch.donations.map((d) => d.leafHash);
  const proofResult = generateMerkleProof(leaves, donation.leafHash);

  if (!proofResult) {
    res.json({ verified: false, reason: "Leaf not found in batch tree" });
    return;
  }

  const verified = verifyMerkleProof(
    donation.leafHash,
    proofResult.proof,
    donation.batch.rootHash
  );

  res.json({
    verified,
    donation: {
      id: donation.id,
      leafHash: donation.leafHash,
      amount: donation.amount,
      timestamp: donation.timestamp,
    },
    batch: {
      id: donation.batch.id,
      rootHash: donation.batch.rootHash,
      xrplTxHash: donation.batch.xrplTxHash,
      status: donation.batch.status,
    },
    proof: proofResult.proof,
    xrplExplorerUrl: donation.batch.xrplTxHash
      ? getExplorerUrl(donation.batch.xrplTxHash)
      : null,
  });
});

export default router;
