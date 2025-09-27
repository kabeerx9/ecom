export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Admin • Edit Collection</h1>
      <p className="text-sm text-muted-foreground">Editing collection ID: {id}</p>
    </div>
  );
}
