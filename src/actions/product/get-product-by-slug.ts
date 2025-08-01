"use server";

import { prisma } from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
            productId: true,
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product by slug");
  }
};
