"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1, // Get only the first image
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return {
        ok: false,
        message: "Orden no encontrada",
      };
    }

    if (session.user.role === "user") {
      if (order.userId !== session.user.id) {
        return {
          ok: false,
          message: "No tiene permiso para ver esta orden",
        };
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error al obtener la orden",
    };
  }
};
