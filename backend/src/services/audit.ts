import { prisma } from "../lib/prisma";
import pino from "pino";

const logger = pino({ level: process.env.LOG_LEVEL || "info" });

interface AuditEntry {
  action: string;
  entity: string;
  entityId?: string;
  data?: Record<string, unknown>;
  requestId?: string;
  ip?: string;
}

export async function audit(entry: AuditEntry): Promise<void> {
  try {
    await prisma.auditLog.create({ data: entry });
    logger.info({ audit: entry }, "Audit entry recorded");
  } catch (err) {
    logger.error({ error: err, audit: entry }, "Failed to record audit entry");
  }
}
