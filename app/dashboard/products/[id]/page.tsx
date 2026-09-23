interface ProductsDetailProps {
  params: Promise<{ id: string }>; // 👈 params bersifat ASYNC di Next.js terbaru;
}

export default async function ProductsDetail({ params }: ProductsDetailProps) {
  const { id } = await params;
  return (
    <>
      <div>
        <h1>Products Details Pages #{id}</h1>
      </div>
    </>
  );
}
