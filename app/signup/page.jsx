import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";
import { GraduationCap, ShoppingBag, Truck, Star, Users } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 translate-y-32"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 max-w-lg mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">BITS Store</h1>
                <p className="text-orange-100">Join the Campus Community</p>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Welcome to
              <br />
              <span className="text-yellow-300">BITS Family</span>
            </h2>
            <p className="text-lg text-orange-100 leading-relaxed">
              Join thousands of BITS students who trust us for their campus shopping needs. Get exclusive access to merchandise, fast delivery, and special student discounts.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm">Join 10,000+ BITS students</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-sm">Exclusive student discounts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-sm">Free delivery on campus</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-sm">Premium quality guaranteed</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              ))}
              <span className="ml-2 text-sm font-medium">4.9/5</span>
            </div>
            <p className="text-sm text-orange-100">
              "BITS Store has everything I need for campus life. The quality is amazing and delivery is super fast!"
            </p>
            <p className="text-xs text-orange-200 mt-2">— Freshman, BITS Pilani</p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BITS Store</h1>
                <p className="text-gray-600">Official Campus Store</p>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Join BITS Store</h2>
              <p className="text-gray-600">Create your account and start shopping</p>
            </div>

            <SignupForm />

            {/* Additional Links */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>

              <Button variant="outline" asChild className="w-full">
                <Link href="/login">
                  Sign In Instead
                </Link>
              </Button>

              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-orange-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-orange-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
