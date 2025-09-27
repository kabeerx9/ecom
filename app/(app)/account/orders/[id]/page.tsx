export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-xl font-semibold">Order Detail</h1>
      <p className="text-sm text-muted-foreground">Order ID: {params.id}</p>
    </div>
  );
}

