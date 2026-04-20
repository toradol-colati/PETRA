import type { Request, Response, NextFunction } from "express";
import { getIronSession } from "iron-session";

interface SessionData {
  userId?: string;
}

const SESSION_OPTIONS = {
  cookieName: "petra_session",
  password: process.env.SESSION_SECRET || "a]3hd8f2kd9s0f3j5k6l7m8n9o0p1q2r3s4t5u6v7",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const session = await getIronSession<SessionData>(req, res, SESSION_OPTIONS);

  if (!session.userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  (req as Request & { userId: string }).userId = session.userId;
  next();
}

export { SESSION_OPTIONS };
export type { SessionData };
