export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-xl font-semibold">Order Detail</h1>
      <p className="text-sm text-muted-foreground">Order ID: {id}</p>
    </div>
  );
}
