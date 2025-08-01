import { getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/category/get-categories";

interface ProductAdminPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductAdminPage({ params }: ProductAdminPageProps) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])


  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }


  if (!categories) {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'Crear Producto' : `Editar Producto: ${product?.title}`;

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}