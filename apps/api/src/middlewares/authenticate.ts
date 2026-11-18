import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { authService } from "../modules/auth/auth.service.js";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
    if (typeof payload.sub !== "string") {
      return res.status(401).json({ message: "Token inválido" });
    }
    const user = await authService.getUser(payload.sub);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
