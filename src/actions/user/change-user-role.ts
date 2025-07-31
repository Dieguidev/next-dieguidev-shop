"use server";

import { auth } from "@/auth.config";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { message: "Debe de estar autenticado", ok: false };
  }

  const newRole = role === "admin" ? "admin" : "user";

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath("/admin/users");
    return { ok: true };
  } catch (error) {
    console.log("Error al actualizar el rol del usuario:", error);

    return { message: "Error al actualizar el rol", ok: false };
  }
};
