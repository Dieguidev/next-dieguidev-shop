import { PrismaClient } from "@/generated/prisma";
import { initialData } from "@/seed/seed";

const prisma = new PrismaClient();
const { categories, products } = initialData;

export async function main() {
  await Promise.all([
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany(),
  ]);

  const categoriesData = categories.map((categorie) => ({
    name: categorie,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  console.log("Seeding database...");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
