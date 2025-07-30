"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return { message: "Debe de estar autenticado", ok: false };
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return {
    orders,
    ok: true,
  };
};
