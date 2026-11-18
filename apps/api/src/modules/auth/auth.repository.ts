import { PermissionEffect } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

export class AuthRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: { include: { role: { include: { permissions: { include: { permission: true } } } } } },
        permissions: { include: { permission: true } }
      }
    });
  }

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id, isActive: true },
      include: {
        userRoles: { include: { role: { include: { permissions: { include: { permission: true } } } } } },
        permissions: { include: { permission: true } }
      }
    });
  }

  getEffectivePermissions(user: NonNullable<Awaited<ReturnType<AuthRepository["findById"]>>>) {
    const fromRoles = user.userRoles.flatMap(({ role }) =>
      role.permissions.map(({ permission }) => permission.key)
    );
    const grants = user.permissions
      .filter(({ effect }) => effect === PermissionEffect.GRANT)
      .map(({ permission }) => permission.key);
    const denies = new Set(user.permissions
      .filter(({ effect }) => effect === PermissionEffect.DENY)
      .map(({ permission }) => permission.key));
    return [...new Set([...fromRoles, ...grants])].filter((key) => !denies.has(key));
  }
}
