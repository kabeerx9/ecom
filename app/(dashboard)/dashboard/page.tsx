"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { UserDetailsCard } from "@/components/user-details-card";
import { authClient } from "@/lib/auth-client";

import data from "../data.json";

export default function Page() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session?.user) {
    return <div>No user data available</div>;
  }

  return (
    <>
      {/* User Details Card - Added at the top */}
      <div className="px-4 lg:px-6">
        <UserDetailsCard user={session.user} />
      </div>

      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}
