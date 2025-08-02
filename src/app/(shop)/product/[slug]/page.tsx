export const revalidate = 10080

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";

import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: ProductPageProps,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug

  // fetch post information
  const product = await getProductBySlug(slug);

  return {
    metadataBase: new URL('https://acme.com'),
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`],
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Mobile SlideShow */}
      <ProductMobileSlideshow
        images={product.images}
        title={product.title}
        className="md:hidden block"
      />

      {/* Desktop Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Selector de Tallas y Cantidad */}
        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>

      </div>
    </div>
  );
}