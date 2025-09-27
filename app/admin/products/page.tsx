import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconPlus, IconEdit, IconEye } from "@tabler/icons-react";

// Sample product data
const sampleProducts = [
  {
    id: "1",
    name: "BITS Classic Hoodie",
    category: "Merchandise",
    status: "published",
    price: "₹1,299",
    stock: 45,
  },
  {
    id: "2",
    name: "Campus Sneakers",
    category: "Sneakers",
    status: "published",
    price: "₹2,499",
    stock: 23,
  },
  {
    id: "3",
    name: "BITS Logo T-Shirt",
    category: "Merchandise",
    status: "draft",
    price: "₹599",
    stock: 0,
  },
  {
    id: "4",
    name: "Engineering Kit",
    category: "Merchandise",
    status: "published",
    price: "₹899",
    stock: 12,
  },
];

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage your store's product catalog
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <IconPlus className="size-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">247</div>
            <p className="text-xs text-emerald-600">
              +12 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">189</div>
            <p className="text-xs text-blue-600">
              76% of total
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">23</div>
            <p className="text-xs text-orange-600">
              Need restocking
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹2.4L</div>
            <p className="text-xs text-green-600">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            A list of all products in your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.category}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={product.status === "published" ? "default" : "secondary"}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.price}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/products/${product.id}`}>
                          <IconEye className="size-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <IconEdit className="size-4" />
                        </Link>
                      </Button>
                    </div>
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
