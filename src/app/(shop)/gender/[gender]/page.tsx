import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { Category } from "@/interfaces";

import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { gender: Category };
  searchParams?: {
    page?: string;
  };
}


export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { gender } = await params;
  const searchParam = await searchParams;

  const page = searchParam?.page ? parseInt(searchParam.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender });




  if (products.length === 0) {
    notFound();
  }

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
  }

  return (
    <>
      <Title
        title={`Articulos ${labels[gender]}`}
        subtitle="La mejor tienda de productos"
        className="mb-2"
      />

      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}