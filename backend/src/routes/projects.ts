import { Router } from "express";
import Stripe from "stripe";
import { prisma } from "../lib/prisma";
import { apiKeyMiddleware } from "../middleware/apiKey";
import { audit } from "../services/audit";
import { env } from "../lib/env";

const router = Router();

// GET /api/projects — List all projects (public)
router.get("/", async (_req, res) => {
  const projects = await prisma.project.findMany({
    include: { _count: { select: { donations: true } } },
  });

  const result = await Promise.all(
    projects.map(async (p) => {
      const agg = await prisma.donation.aggregate({
        where: { locationId: p.id },
        _sum: { amount: true },
      });
      return {
        id: p.id,
        title: p.title,
        city: p.city,
        shortDescription: p.shortDescription,
        status: p.status,
        donationCount: p._count.donations,
        totalDonatedCents: agg._sum.amount ?? 0,
      };
    })
  );

  res.json(result);
});

// GET /api/projects/:id — Project detail (public)
router.get("/:id", async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: { _count: { select: { donations: true } } },
  });

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const agg = await prisma.donation.aggregate({
    where: { locationId: project.id },
    _sum: { amount: true },
  });

  res.json({
    id: project.id,
    title: project.title,
    city: project.city,
    shortDescription: project.shortDescription,
    status: project.status,
    donationCount: project._count.donations,
    totalDonatedCents: agg._sum.amount ?? 0,
    hasStripeConnect: !!project.stripeAccountId,
  });
});

// POST /api/projects/:id/connect — Start Stripe Connect onboarding (protected)
router.post("/:id/connect", apiKeyMiddleware, async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
  });

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);

  const account = await stripe.accounts.create({
    type: "express",
    country: "IT",
    business_type: "non_profit",
    metadata: { projectId: project.id },
  });

  await prisma.project.update({
    where: { id: project.id },
    data: { stripeAccountId: account.id },
  });

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `https://petra.io/api/projects/${project.id}/connect/refresh`,
    return_url: `https://petra.io/api/projects/${project.id}/connect/complete`,
    type: "account_onboarding",
  });

  await audit({
    action: "STRIPE_CONNECT_STARTED",
    entity: "Project",
    entityId: project.id,
    data: { stripeAccountId: account.id },
    requestId: (req as any).requestId,
  });

  res.json({ url: accountLink.url });
});

export default router;
