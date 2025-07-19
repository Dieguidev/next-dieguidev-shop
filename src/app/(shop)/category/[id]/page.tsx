interface CategoryPageProps {
  params: { id: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;
  return (
    <div>
      <h1>Category Page: {id}</h1>
    </div>
  );
}