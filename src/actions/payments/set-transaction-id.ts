"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return {
        ok: false,
        message: "No hay sesión de usuario",
      };
    }

    const order = await prisma.order.update({
      where: {
        id: orderId,
        userId: userId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: "Orden no encontrada o no pertenece al usuario",
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar el ID de transacción",
    };
  }
};
