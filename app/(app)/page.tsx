import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">BITS Store</span>
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
        <Card className="border-emerald-200 hover:border-emerald-300 transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🏆</span>
              </div>
              <span className="text-emerald-700">Campus Spirit</span>
            </CardTitle>
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

        <Card className="border-teal-200 hover:border-teal-300 transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🎓</span>
              </div>
              <span className="text-teal-700">Student Essentials</span>
            </CardTitle>
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

        <Card className="border-green-200 hover:border-green-300 transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">⚡</span>
              </div>
              <span className="text-green-700">Fast Delivery</span>
            </CardTitle>
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
          <Button variant="outline" asChild className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400">
            <Link href="/category/sneakers">🎯 Sneakers</Link>
          </Button>
          <Button variant="outline" asChild className="border-teal-300 text-teal-700 hover:bg-teal-50 hover:border-teal-400">
            <Link href="/category/merchandise">👕 Merchandise</Link>
          </Button>
          <Button variant="outline" asChild className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400">
            <Link href="/collections">📚 Collections</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
