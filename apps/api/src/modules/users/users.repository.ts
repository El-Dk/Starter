import { prisma } from "../../lib/prisma.js";

export class UsersRepository {
  findAll() {
    return prisma.user.findMany({
      where: { isActive: true },
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { createdAt: "desc" }
    });
  }
}
