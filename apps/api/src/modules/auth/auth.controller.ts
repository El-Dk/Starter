import type { Request, Response, NextFunction } from "express";
import { loginSchema } from "./auth.schemas.js";
import { authService } from "./auth.service.js";

export class AuthController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = loginSchema.parse(req.body);
      res.json(await authService.login(input.email, input.password));
    } catch (error) {
      if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
        res.status(401).json({ message: "Credenciales inválidas" });
        return;
      }
      next(error);
    }
  };

  me = (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "No autenticado" });
    res.json(req.user);
  };
}

export const authController = new AuthController();
