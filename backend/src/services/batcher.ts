import { prisma } from "../lib/prisma";
import { merkleRoot } from "./merkle";
import { anchorBatch } from "./xrpl";
import { audit } from "./audit";
import pino from "pino";

const logger = pino({ level: process.env.LOG_LEVEL || "info" });

export async function batchPendingDonations(): Promise<string | null> {
  const result = await prisma.$transaction(async (tx) => {
    // FOR UPDATE SKIP LOCKED prevents race conditions:
    // concurrent invocations skip already-locked rows
    const unbatched = await tx.$queryRaw<
      Array<{ id: string; leafHash: string; amount: number }>
    >`
      SELECT id, "leafHash", amount
      FROM "Donation"
      WHERE batched = false
      ORDER BY timestamp ASC
      FOR UPDATE SKIP LOCKED
    `;

    if (!Array.isArray(unbatched) || unbatched.length === 0) {
      logger.info("No unbatched donations found");
      return null;
    }

    const leaves = unbatched.map((d) => d.leafHash);
    const root = merkleRoot(leaves);
    const totalAmount = unbatched.reduce((sum, d) => sum + Number(d.amount), 0);

    const batch = await tx.batch.create({
      data: {
        rootHash: root,
        status: "PENDING",
        leafCount: unbatched.length,
        totalAmount,
      },
    });

    await tx.donation.updateMany({
      where: { id: { in: unbatched.map((d) => d.id) } },
      data: { batched: true, batchId: batch.id },
    });

    return batch;
  });

  if (!result) return null;

  logger.info(
    {
      batchId: result.id,
      rootHash: result.rootHash,
      leafCount: result.leafCount,
    },
    "Batch created"
  );

  await audit({
    action: "BATCH_CREATED",
    entity: "Batch",
    entityId: result.id,
    data: {
      rootHash: result.rootHash,
      leafCount: result.leafCount,
      totalAmount: result.totalAmount,
    },
  });

  // Anchor on XRPL
  try {
    const { txHash } = await anchorBatch(result.rootHash);
    await markBatchCommitted(result.id, txHash);
    return result.id;
  } catch (err) {
    logger.error(
      { error: err, batchId: result.id },
      "Failed to anchor batch on XRPL"
    );

    await prisma.batch.update({
      where: { id: result.id },
      data: { status: "FAILED" },
    });

    await audit({
      action: "BATCH_ANCHOR_FAILED",
      entity: "Batch",
      entityId: result.id,
      data: { error: err instanceof Error ? err.message : String(err) },
    });

    return null;
  }
}

export async function markBatchCommitted(
  batchId: string,
  xrplTxHash: string
): Promise<void> {
  await prisma.batch.update({
    where: { id: batchId },
    data: { status: "COMMITTED", xrplTxHash },
  });

  logger.info({ batchId, xrplTxHash }, "Batch committed to XRPL");

  await audit({
    action: "BATCH_COMMITTED",
    entity: "Batch",
    entityId: batchId,
    data: { xrplTxHash },
  });
}
