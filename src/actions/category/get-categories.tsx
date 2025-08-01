'use server'

import { prisma } from "@/lib/prisma"


export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []

  }

}