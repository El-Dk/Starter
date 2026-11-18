import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { AuthUser, Permission } from "@app/shared";
import { env } from "../../config/env.js";
import { AuthRepository } from "./auth.repository.js";

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async login(email: string, password: string) {
    const record = await this.repository.findByEmail(email);
    if (!record || !record.isActive || !(await bcrypt.compare(password, record.passwordHash))) {
      throw new Error("INVALID_CREDENTIALS");
    }
    const user = this.toAuthUser(record);
    const accessToken = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
    });
    return { accessToken, user };
  }

  async getUser(id: string): Promise<AuthUser | null> {
    const record = await this.repository.findById(id);
    return record ? this.toAuthUser(record) : null;
  }

  private toAuthUser(record: NonNullable<Awaited<ReturnType<AuthRepository["findById"]>>>): AuthUser {
    return {
      id: record.id,
      name: record.name,
      email: record.email,
      roles: record.userRoles.map(({ role }) => role.name),
      permissions: this.repository.getEffectivePermissions(record) as Permission[]
    };
  }
}

export const authRepository = new AuthRepository();
export const authService = new AuthService(authRepository);
