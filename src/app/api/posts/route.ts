import { NextResponse } from "next/server";
import { POSTS_DATA } from "@/lib/data-initial";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  let sourcePosts = POSTS_DATA;

  try {
    const record = await prisma.cmsData.findUnique({
      where: { id: "singleton" },
    });
    if (record && record.data) {
      const parsed = JSON.parse(record.data);
      if (parsed.posts && Array.isArray(parsed.posts) && parsed.posts.length > 0) {
        sourcePosts = parsed.posts;
      }
    }
  } catch (e) {
    // fallback
  }

  let filtered = sourcePosts;

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
