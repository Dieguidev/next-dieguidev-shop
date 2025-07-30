"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  address: Address,
  productsToOrder: ProductToOrder[]
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsToOrder.map((item) => item.productId),
      },
    },
  });

  const itemsInOrder = productsToOrder.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Crea un mapa para acceso rápido a los productos por id
  const productMap = new Map(products.map((product) => [product.id, product]));

  // Calcula subTotal en una sola pasada
  const subTotal = productsToOrder.reduce((total, item) => {
    const product = productMap.get(item.productId);
    return product ? total + item.quantity * product.price : total;
  }, 0);

  const tax = subTotal * 0.15;

  const total = subTotal + tax;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //update stock products
      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = productsToOrder
          .filter((item) => item.productId === product.id)
          .reduce((total, item) => total + item.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`No se encontró el producto con id ${product.id}`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene suficiente stock`);
        }
      });

      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          subTotal,
          tax,
          total,
          itemsInOrder,
          OrderItem: {
            createMany: {
              data: productsToOrder.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                price: productMap.get(item.productId)?.price || 0,
              })),
            },
          },
          OrderAddress: {
            create: {
              firstName: address.firstName,
              lastName: address.lastName,
              phone: address.phone,
              address: address.address,
              address2: address.address2,
              city: address.city,
              postalCode: address.postalCode,
              countryId: address.country,
            },
          },
        },
        include: {
          // OrderItem: true,
          OrderAddress: true,
        },
      });

      return {
        order,
        updatedProducts,
        orderAddress: order.OrderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
