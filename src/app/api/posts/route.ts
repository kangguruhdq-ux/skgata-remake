import { NextResponse } from "next/server";
import { POSTS_DATA } from "@/lib/data-initial";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  let filtered = POSTS_DATA;

  if (category && category !== "Semua") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    status: "success",
    total: filtered.length,
    data: filtered,
  });
}
