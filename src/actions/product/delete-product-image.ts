"use server";

import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL || "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar imagenes de FS",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    const result = await cloudinary.uploader.destroy(
      `next-dieguidev-shop/products/${imageName}`,
      {
        resource_type: "image",
        invalidate: true,
      }
    );

    if (result.result !== "ok") {
      return {
        ok: false,
        message: "No se pudo eliminar la imagen en Cloudinary",
      };
    }

    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);

    return {
      ok: true,
      message: "Imagen eliminada correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
};
