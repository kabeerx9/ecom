import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) notFound();
  return (
    <div>
      <h1 className="text-xl font-semibold">Product</h1>
      <p className="text-sm text-muted-foreground">Slug: {slug}</p>
    </div>
  );
}
