"use client";

import { useMemo } from "react";
import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS } from "@/lib/demo-data";

function copy(text: string) {
  navigator.clipboard?.writeText(text);
}

export default function Page() {
  const discounted = useMemo(() => {
    const withDisc = PRODUCTS.filter((p) => (p.originalPrice ?? p.price) > p.price).map((p) => ({
      p,
      pct: Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100),
    }));
    withDisc.sort((a, b) => b.pct - a.pct);
    return withDisc;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Discounts</h1>
        <p className="text-sm text-muted-foreground">Save on selected sneakers and merchandise.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Student Exclusive</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="mb-3">Flat 10% off on merch.</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">CODE: BITS10</Badge>
              <Button size="sm" variant="outline" onClick={() => copy("BITS10")}>Copy</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sneaker Fest</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="mb-3">Extra ₹500 off on select sneakers.</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">CODE: KICKS500</Badge>
              <Button size="sm" variant="outline" onClick={() => copy("KICKS500")}>Copy</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Festive Combo</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="mb-3">Buy hoodie + tee and save 15%.</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">AUTO APPLIED</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Top savings up to <span className="text-foreground font-medium">{discounted[0]?.pct ?? 0}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {discounted.map(({ p }) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
