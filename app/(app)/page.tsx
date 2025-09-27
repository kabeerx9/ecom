import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">BITS Store</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your official destination for BITS Pilani merchandise, campus essentials, and exclusive apparel.
          From courts to campus—find your perfect gear.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/collections">Browse Collections</Link>
          </Button>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>🏆 Campus Spirit</CardTitle>
            <CardDescription>
              Official BITS Pilani apparel and accessories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Show your BITS pride with our curated selection of t-shirts, hoodies, and accessories featuring the iconic BITS logo and colors.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎓 Student Essentials</CardTitle>
            <CardDescription>
              Everything you need for campus life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              From notebooks and stationery to tech accessories and dorm essentials—find everything you need for your BITS journey.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚡ Fast Delivery</CardTitle>
            <CardDescription>
              Quick and reliable campus delivery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get your orders delivered right to your hostel or department. Fast, reliable service for the BITS community.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-2xl font-semibold">Popular Categories</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/category/sneakers">Sneakers</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/category/merchandise">Merchandise</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/collections">Collections</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
