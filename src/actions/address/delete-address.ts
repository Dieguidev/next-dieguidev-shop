"use server";

import { prisma } from "@/lib/prisma";

export const removeAddress = async (userId: string) => {
  try {
    const addressDB = await prisma.userAddress.findFirst({
      where: { userId },
    });
    if (!addressDB) {
      return;
    }
    await prisma.userAddress.delete({
      where: { userId },
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la dirección",
    };
  }
};
