"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { message: "Debe de estar autenticado", ok: false };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      emailVerified: true,
      password: true,
    },
  });
  return {
    users,
    ok: true,
  };
};
