import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, PermissionEffect } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const permissionKeys = [
  "dashboard:read", "users:read", "users:create", "users:update", "users:delete",
  "roles:read", "roles:manage", "reports:read", "settings:read"
];

async function main() {
  const permissions = await Promise.all(permissionKeys.map((key) =>
    prisma.permission.upsert({ where: { key }, update: {}, create: { key } })
  ));
  const permissionByKey = new Map(permissions.map((permission) => [permission.key, permission.id]));

  const roleDefinitions = {
    admin: permissionKeys,
    supervisor: ["dashboard:read", "users:read", "reports:read"],
    user: ["dashboard:read"]
  };

  for (const [name, keys] of Object.entries(roleDefinitions)) {
    const role = await prisma.role.upsert({ where: { name }, update: {}, create: { name } });
    for (const key of keys) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permissionByKey.get(key)! } },
        update: {},
        create: { roleId: role.id, permissionId: permissionByKey.get(key)! }
      });
    }
  }

  const adminHash = await bcrypt.hash("Admin123!", 12);
  const userHash = await bcrypt.hash("User123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { name: "Administrador", passwordHash: adminHash, isActive: true },
    create: { name: "Administrador", email: "admin@example.com", passwordHash: adminHash }
  });
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: { name: "Usuario de prueba", passwordHash: userHash, isActive: true },
    create: { name: "Usuario de prueba", email: "user@example.com", passwordHash: userHash }
  });

  const adminRole = await prisma.role.findUniqueOrThrow({ where: { name: "admin" } });
  const userRole = await prisma.role.findUniqueOrThrow({ where: { name: "user" } });
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: adminRole.id } }, update: {},
    create: { userId: admin.id, roleId: adminRole.id }
  });
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: userRole.id } }, update: {},
    create: { userId: user.id, roleId: userRole.id }
  });

  const reportsPermissionId = permissionByKey.get("reports:read")!;
  await prisma.userPermission.upsert({
    where: { userId_permissionId: { userId: user.id, permissionId: reportsPermissionId } },
    update: { effect: PermissionEffect.GRANT },
    create: { userId: user.id, permissionId: reportsPermissionId, effect: PermissionEffect.GRANT }
  });

  console.log("Seed completado: usuarios, roles y permisos demo creados.");
}

main()
  .catch((error) => { console.error(error); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); });
