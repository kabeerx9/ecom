export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Admin • Edit Collection</h1>
      <p className="text-sm text-muted-foreground">Editing collection ID: {params.id}</p>
    </div>
  );
}

