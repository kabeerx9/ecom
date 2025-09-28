import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user || session.user.role !== "admin") return error("Forbidden", 403);

  const items = await prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, slug: true } });
  return ok(items);
}

