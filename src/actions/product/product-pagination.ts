"use server";

import { Category } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface PaginationsOptions {
  page?: number;
  take?: number;
  gender?: Category;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationsOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(take)) || take < 1) take = 12;
  try {
    const [count, products] = await Promise.all([
      prisma.product.count({
        where: {
          gender,
        },
      }),
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
        where: {
          gender,
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
    console.log(error);

    throw new Error(
      "Ha ocurrido un error inesperado. Por favor, intenta nuevamente."
    );
  }
};
