import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 text-center">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Access Denied (403)</h1>
        <p className="text-sm text-muted-foreground mb-6">
          You do not have permission to view this page.
        </p>
        <Link href="/">
          <span className="underline underline-offset-4">Go back home</span>
        </Link>
      </div>
    </div>
  );
}

