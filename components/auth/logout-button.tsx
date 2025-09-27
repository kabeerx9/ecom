"use client";
import React, { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogOut() {
    try {
      setLoading(true);
      await authClient.signOut();
      router.push("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleLogOut();
      }}
      disabled={loading}
      className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
