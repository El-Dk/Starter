import type { Request, Response, NextFunction } from "express";
import type { Permission } from "@app/shared";

export function authorize(...required: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "No autenticado" });
    const allowed = required.every((permission) =>
      req.user!.permissions.includes(permission)
    );
    if (!allowed) return res.status(403).json({ message: "Permisos insuficientes" });
    next();
  };
}
