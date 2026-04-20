import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";
import { env } from "./lib/env";
import { prisma } from "./lib/prisma";
import { requestIdMiddleware } from "./middleware/requestId";
import { publicRateLimit, webhookRateLimit } from "./middleware/rateLimit";
import donationRoutes from "./routes/donations";
import projectRoutes from "./routes/projects";
import batchRoutes from "./routes/batches";
import webhookRoutes from "./routes/webhooks";

const logger = pino({ level: env.LOG_LEVEL });
const app = express();

// Global middleware
app.use(cors());
app.use(helmet());
app.use(requestIdMiddleware);

// Webhook route MUST use express.raw before express.json
app.use(
  "/api/webhooks",
  webhookRateLimit,
  express.raw({ type: "application/json" }),
  webhookRoutes
);

// JSON parsing for all other routes
app.use(express.json());

// Health check with DB connectivity
app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      db: "connected",
      xrpl_network: env.XRPL_NETWORK,
    });
  } catch {
    res.status(503).json({
      status: "degraded",
      db: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

// Public routes (rate limited)
app.use("/api/donations", publicRateLimit, donationRoutes);
app.use("/api/projects", publicRateLimit, projectRoutes);
app.use("/api/batches", publicRateLimit, batchRoutes);

app.listen(env.PORT, () => {
  logger.info(
    { port: env.PORT, env: env.NODE_ENV, xrpl: env.XRPL_NETWORK },
    "Petra backend started"
  );
});
