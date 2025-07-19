import { ProductsGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

interface CategoryPageProps {
  params: { id: Category };
}
const products = initialData.products;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  const categoryProducts = products.filter(
    (product) => product.gender === id
  );

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
  }

  return (
    <>
      <Title
        title={`Articulos ${labels[id]}`}
        subtitle="La mejor tienda de productos"
        className="mb-2"
      />

      <ProductsGrid products={categoryProducts} />
    </>
  );
}