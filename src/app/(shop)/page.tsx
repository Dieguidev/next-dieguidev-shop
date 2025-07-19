import { ProductsGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
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
