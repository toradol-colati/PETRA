import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/batches — List all batches (transparency dashboard)
router.get("/", async (_req, res) => {
  const batches = await prisma.batch.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      rootHash: true,
      xrplTxHash: true,
      status: true,
      leafCount: true,
      totalAmount: true,
      createdAt: true,
    },
  });

  res.json(batches);
});

// GET /api/batches/:id — Batch detail with donations
router.get("/:id", async (req, res) => {
  const batch = await prisma.batch.findUnique({
    where: { id: req.params.id },
    include: {
      donations: {
        select: {
          id: true,
          amount: true,
          leafHash: true,
          timestamp: true,
        },
      },
    },
  });

  if (!batch) {
    res.status(404).json({ error: "Batch not found" });
    return;
  }

  res.json(batch);
});

export default router;
