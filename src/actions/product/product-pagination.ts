"use server";

import { prisma } from "@/lib/prisma";

interface PaginationsOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationsOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(take)) || take < 1) take = 12;
  try {
    const [count, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
      }),
    ]);
    const totalPages = Math.ceil(count / take);
    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
        type: product.gender,
      })),
    };
  } catch (error) {
    console.log("Error al cargar los productos:", error);
    throw new Error("No se pudo cargar los productos");
  }
};
