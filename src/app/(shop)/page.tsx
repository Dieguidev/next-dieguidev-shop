import { getPaginatedProductsWithImages } from "@/actions";
import { ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface HomeProps {
  searchParams?: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const page = params?.page ? parseInt(params.page) : 1;

  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page });

  console.log(totalPages, currentPage);

  if (products.length === 0) {
    redirect('/')
  }


  return (
    <>
      <Title
        title="Tienda Dieguidev"
        subtitle="La mejor tienda de productos"
        className="mb-2"
      />

      <ProductsGrid products={products} />

    </>
  );
}
