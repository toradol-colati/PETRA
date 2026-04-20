import { randomUUID } from "crypto";
import type { Request, Response, NextFunction } from "express";

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestId = randomUUID();
  (req as Request & { requestId: string }).requestId = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
}
