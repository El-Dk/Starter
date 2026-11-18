import type { AuthUser } from "@app/shared";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
export {};
