"use server";
import { prisma } from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        inStock: true,
      },
    });

    if (!product) {
      return 0;
    }

    return product.inStock;
  } catch (error) {
    console.error("Failed to fetch product by slug:", error);
    throw error;
  }
};
