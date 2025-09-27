export default function Page() {
  return (
    <div className="px-4 lg:px-6">
      <h1 className="text-lg font-medium">Admin: First</h1>
      <p className="text-sm text-muted-foreground">
        This is an admin-only page. Only users with role "admin" can view it.
      </p>
    </div>
  );
}

