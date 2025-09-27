import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  if (!params?.slug) notFound();
  return (
    <div>
      <h1 className="text-xl font-semibold">Product</h1>
      <p className="text-sm text-muted-foreground">Slug: {params.slug}</p>
    </div>
  );
}

