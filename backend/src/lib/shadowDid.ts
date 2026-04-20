import { createHmac, randomBytes } from "crypto";

export function computeShadowDID(
  email: string,
  perUserSalt: string,
  secret: string
): string {
  const normalizedEmail = email.toLowerCase().trim();
  const hmac = createHmac("sha256", secret);
  hmac.update(`${normalizedEmail}:${perUserSalt}`);
  return hmac.digest("hex");
}

export function generateDidSalt(): string {
  return randomBytes(16).toString("hex");
}
