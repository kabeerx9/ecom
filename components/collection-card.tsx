"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CollectionCard({
  slug,
  title,
  description,
  color,
  count,
}: {
  slug: string;
  title: string;
  description: string;
  color?: string;
  count: number;
}) {
  return (
    <Link href={`/collections/${slug}`}>
      <Card className="overflow-hidden group transition-shadow duration-200 hover:shadow-sm">
        <div
          className="relative w-full pb-[45%]"
          style={{ background: color || "linear-gradient(135deg,#f8fafc,#e2e8f0)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 group-hover:opacity-60 transition-opacity" />
          <Badge className="absolute left-2 top-2 bg-black/70 text-white" variant="secondary">
            {count} items
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

