export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1 className="text-xl font-semibold">Category</h1>
      <p className="text-sm text-muted-foreground">{params.slug}</p>
    </div>
  );
}

