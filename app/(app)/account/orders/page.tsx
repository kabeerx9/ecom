"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ORDERS = [
  {
    id: "ord_0001",
    number: "#1001",
    date: "2025-09-12",
    total: "₹2,499",
    status: "Delivered",
    items: "BITS Hoodie (M), Sneaker Laces",
  },
  {
    id: "ord_0002",
    number: "#1002",
    date: "2025-09-20",
    total: "₹1,299",
    status: "Shipped",
    items: "BITS T-shirt (L)",
  },
  {
    id: "ord_0003",
    number: "#1003",
    date: "2025-09-24",
    total: "₹5,499",
    status: "Processing",
    items: "Campus Sneakers (42)",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: "default" | "secondary" | "outline"; label: string }> = {
    Delivered: { variant: "secondary", label: "Delivered" },
    Shipped: { variant: "default", label: "Shipped" },
    Processing: { variant: "outline", label: "Processing" },
  };
  const meta = map[status] ?? { variant: "outline", label: status };
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Orders</h1>
        <p className="text-sm text-muted-foreground">Your recent orders.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.number}</TableCell>
                  <TableCell className="hidden sm:table-cell">{o.date}</TableCell>
                  <TableCell className="hidden md:table-cell">{o.items}</TableCell>
                  <TableCell>{o.total}</TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell>
                    <Link className="text-sm underline underline-offset-4" href={`/account/orders/${o.id}`}>
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
