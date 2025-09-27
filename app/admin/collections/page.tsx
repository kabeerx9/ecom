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
import { IconPlus, IconEdit, IconEye, IconStack2 } from "@tabler/icons-react";

// Sample collection data
const sampleCollections = [
  {
    id: "1",
    title: "Campus Essentials",
    description: "Must-have items for BITS students",
    productCount: 24,
    status: "active",
  },
  {
    id: "2",
    title: "Sports & Athletics",
    description: "Gear for courts, fields, and fitness",
    productCount: 18,
    status: "active",
  },
  {
    id: "3",
    title: "Tech Accessories",
    description: "Gadgets and accessories for modern students",
    productCount: 12,
    status: "active",
  },
  {
    id: "4",
    title: "Winter Collection",
    description: "Warm clothing for the Pilani winters",
    productCount: 8,
    status: "draft",
  },
];

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Collections</h1>
          <p className="text-sm text-muted-foreground">
            Organize your products into themed collections
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/collections/new">
            <IconPlus className="size-4 mr-2" />
            New Collection
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{sampleCollections.length}</div>
            <p className="text-xs text-emerald-600">
              3 active, 1 draft
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-teal-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">
              {sampleCollections.reduce((sum, col) => sum + col.productCount, 0)}
            </div>
            <p className="text-xs text-teal-600">
              Across all collections
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(sampleCollections.reduce((sum, col) => sum + col.productCount, 0) / sampleCollections.length)}
            </div>
            <p className="text-xs text-green-600">
              Per collection
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Collections Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleCollections.map((collection, index) => (
          <Card key={collection.id} className={`hover:shadow-lg transition-shadow ${
            index % 3 === 0 ? 'border-l-4 border-l-emerald-500' :
            index % 3 === 1 ? 'border-l-4 border-l-teal-500' :
            'border-l-4 border-l-green-500'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    index % 3 === 0 ? 'bg-emerald-100 text-emerald-600' :
                    index % 3 === 1 ? 'bg-teal-100 text-teal-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <IconStack2 className="size-4" />
                  </div>
                  {collection.title}
                </CardTitle>
                <Badge variant={collection.status === "active" ? "default" : "secondary"} className={
                  collection.status === "active" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : ""
                }>
                  {collection.status}
                </Badge>
              </div>
              <CardDescription>{collection.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-emerald-600">
                  {collection.productCount} products
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" asChild className="hover:bg-emerald-50 hover:text-emerald-600">
                    <Link href={`/admin/collections/${collection.id}`}>
                      <IconEye className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="hover:bg-emerald-50 hover:text-emerald-600">
                    <Link href={`/admin/collections/${collection.id}/edit`}>
                      <IconEdit className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest changes to your collections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="size-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <span className="font-medium">Campus Essentials</span> collection updated
              </div>
              <div className="text-muted-foreground">2 hours ago</div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="size-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                New collection <span className="font-medium">Winter Collection</span> created
              </div>
              <div className="text-muted-foreground">1 day ago</div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="size-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <span className="font-medium">Tech Accessories</span> published
              </div>
              <div className="text-muted-foreground">3 days ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
