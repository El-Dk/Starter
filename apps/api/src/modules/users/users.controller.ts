import type { Request, Response, NextFunction } from "express";
import { usersService } from "./users.service.js";

export class UsersController {
  list = async (_req: Request, res: Response, next: NextFunction) => {
    try { res.json(await usersService.listUsers()); } catch (error) { next(error); }
  };
}
export const usersController = new UsersController();
