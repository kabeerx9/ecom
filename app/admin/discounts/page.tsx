import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconPlus, IconEdit, IconEye, IconDiscount2, IconTrash } from "@tabler/icons-react";

// Sample discount data
const sampleDiscounts = [
  {
    id: "1",
    code: "WELCOME20",
    description: "20% off for new students",
    type: "percentage",
    value: "20%",
    usage: "45/100",
    status: "active",
    expires: "2025-12-31",
  },
  {
    id: "2",
    code: "FESTIVAL",
    description: "Festival season discount",
    type: "fixed",
    value: "₹500",
    usage: "123/200",
    status: "active",
    expires: "2024-11-15",
  },
  {
    id: "3",
    code: "STUDENT10",
    description: "10% off for verified students",
    type: "percentage",
    value: "10%",
    usage: "89/∞",
    status: "active",
    expires: "Never",
  },
  {
    id: "4",
    code: "EXPIRED",
    description: "Old semester discount",
    type: "percentage",
    value: "15%",
    usage: "156/200",
    status: "expired",
    expires: "2024-01-31",
  },
];

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Discounts</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage promotional codes and discounts
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/discounts/new">
            <IconPlus className="size-4 mr-2" />
            New Discount
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sampleDiscounts.filter(d => d.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">413</div>
            <p className="text-xs text-muted-foreground">
              Codes redeemed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹24.5K</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹592</div>
            <p className="text-xs text-muted-foreground">
              Per redemption
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Discounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Discounts</CardTitle>
          <CardDescription>
            Manage promotional codes and discount campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead className="hidden sm:table-cell">Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="hidden md:table-cell">Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleDiscounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium font-mono">
                    {discount.code}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {discount.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {discount.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {discount.value}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {discount.usage}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        discount.status === "active"
                          ? "default"
                          : discount.status === "expired"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {discount.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {discount.expires}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/discounts/${discount.id}`}>
                          <IconEye className="size-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/discounts/${discount.id}/edit`}>
                          <IconEdit className="size-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <IconTrash className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconDiscount2 className="size-5" />
              Quick Create
            </CardTitle>
            <CardDescription>
              Create common discount types quickly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <span className="font-mono mr-2">STUDENT25</span>
              25% off for students
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="font-mono mr-2">FLASH50</span>
              ₹500 off orders above ₹2,000
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="font-mono mr-2">LOYALTY</span>
              15% off for repeat customers
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Discount performance insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Most Used Code</span>
                <span className="font-medium">FESTIVAL (123 uses)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Highest Savings</span>
                <span className="font-medium">₹8,450 (WELCOME20)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Conversion Rate</span>
                <span className="font-medium">24.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
