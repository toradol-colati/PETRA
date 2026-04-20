import type { Request, Response, NextFunction } from "express";
import { env } from "../lib/env";

export function apiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== env.API_KEY) {
    res.status(401).json({ error: "Invalid or missing API key" });
    return;
  }

  next();
}
