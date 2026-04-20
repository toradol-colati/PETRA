import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, "STRIPE_WEBHOOK_SECRET is required"),
  XRPL_MASTER_SEED: z.string().min(1, "XRPL_MASTER_SEED is required"),
  SHADOW_DID_SECRET: z.string().min(32, "SHADOW_DID_SECRET must be at least 32 chars"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 chars"),
  API_KEY: z.string().min(16, "API_KEY must be at least 16 chars"),
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  XRPL_NETWORK: z.enum(["testnet", "mainnet", "devnet"]).default("testnet"),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    const errors = result.error.flatten().fieldErrors;
    for (const [key, msgs] of Object.entries(errors)) {
      console.error(`  ${key}: ${msgs?.join(", ")}`);
    }
    process.exit(1);
  }

  return result.data;
}

export const env = validateEnv();
