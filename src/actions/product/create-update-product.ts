"use server";

import { Gender, Size } from "@/generated/prisma";
import { Product } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import z from "zod";

const productSchema = z.object({
  id: z.string().uuidv4().optional().nullable(),
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuidv4(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.enum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  const prismaTx = await prisma.$transaction(async (tx) => {
    let product: Product;
    const tagsArray = rest.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());
    if (id) {
      await tx.product.update({
        where: { id },
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tagsArray },
        },
      });
    }

    return {};
  });

  return {
    ok: true,
  };
};
