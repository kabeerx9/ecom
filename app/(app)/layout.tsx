import Navbar from "@/components/navbar";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto w-full flex-1 px-4 py-6">
        {children}
      </main>
    </div>
  );
}

