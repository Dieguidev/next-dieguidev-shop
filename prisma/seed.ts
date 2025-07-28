import { PrismaClient } from "@/generated/prisma";
import { initialData } from "@/seed/seed";
import { countries } from "@/seed/seed-countries";

const prisma = new PrismaClient();
const { categories, products, users } = initialData;

export async function main() {
  await Promise.all([
    await prisma.country.deleteMany(),
    await prisma.user.deleteMany(),
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany(),
  ]);

  //add countries
  await prisma.country.createMany({
    data: countries,
  });

  // add users
  await prisma.user.createMany({
    data: users,
  });

  // add categories
  const categoriesData = categories.map((categorie) => ({
    name: categorie,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });
  // add products
  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = new Map(
    categoriesDB.map((category) => [category.name, category.id])
  );
  const productsData = products.map((product) => {
    const categoryId = categoriesMap.get(product.type);
    if (!categoryId)
      throw new Error(`Category not found for type: ${product.type}`);
    return {
      title: product.title,
      description: product.description,
      inStock: product.inStock,
      price: product.price,
      sizes: product.sizes,
      slug: product.slug,
      tags: product.tags,
      gender: product.gender,
      categoryId: categoryId,
    };
  });
  await prisma.product.createMany({
    data: productsData,
  });

  // add productimages

  const productsDB = await prisma.product.findMany();
  const productsMap = new Map(
    productsDB.map((product) => [product.slug, product.id])
  );

  const productImagesData = products.flatMap((product) => {
    const productId = productsMap.get(product.slug);
    if (!productId)
      throw new Error(`Product not found for slug: ${product.slug}`);
    return product.images.map((image) => ({
      url: image,
      productId,
    }));
  });

  await prisma.productImage.createMany({
    data: productImagesData,
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
