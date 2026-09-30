import { NextRequest, NextResponse } from "next/server";
import { POSTS_DATA } from "@/lib/data-initial";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-server";
import { logAuditAction } from "@/lib/audit";

export async function GET(request: NextRequest) {
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

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Akses tidak diizinkan." },
        { status: 401 }
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const body = await req.json();

    const { title, excerpt, content, category, coverImage, author } = body;

    if (!title || !content) {
      return NextResponse.json(
        { status: "error", message: "Judul dan konten berita wajib diisi." },
        { status: 400 }
      );
    }

    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newPost = {
      id: `post-${Date.now()}`,
      title,
      slug,
      excerpt: excerpt || content.slice(0, 160),
      content,
      category: category || "Berita",
      coverImage: coverImage || "/media/school/video-profil.webp",
      author: author || "Humas SMKN 3 Yogyakarta",
      views: 0,
      publishedAt: new Date().toISOString().split("T")[0],
    };

    // Update in CMSData singleton
    const record = await prisma.cmsData.findUnique({ where: { id: "singleton" } });
    if (record && record.data) {
      const parsed = JSON.parse(record.data);
      const currentPosts = parsed.posts || POSTS_DATA;
      parsed.posts = [newPost, ...currentPosts];
      await prisma.cmsData.update({
        where: { id: "singleton" },
        data: { data: JSON.stringify(parsed) },
      });
    }

    await logAuditAction({
      actor: session.email,
      action: "CREATE",
      entity: "POST",
      entityId: newPost.id,
      details: `Membuat artikel baru: ${newPost.title}`,
      ip,
    });

    return NextResponse.json({
      status: "success",
      message: "Artikel berita berhasil diterbitkan.",
      data: newPost,
    });
  } catch (error: any) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
