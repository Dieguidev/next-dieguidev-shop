import { getPaginatedProductsWithImages } from "@/actions";
import { ProductsGrid, Title } from "@/components";

interface HomeProps {
  searchParams?: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const { products } = await getPaginatedProductsWithImages({ page });

  console.log(searchParams);


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
