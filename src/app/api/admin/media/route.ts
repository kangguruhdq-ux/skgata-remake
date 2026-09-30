import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-server";
import { logAuditAction } from "@/lib/audit";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "media", "uploads");

// Initial school media items to seed into database if empty
const INITIAL_ASSETS = [
  {
    filename: "logo.webp",
    originalName: "Logo SMK Negeri 3 Yogyakarta.webp",
    url: "/media/school/logo.webp",
    mimeType: "image/webp",
    size: 24500,
    category: "general",
    alt: "Logo Resmi SMK Negeri 3 Yogyakarta",
    usageContext: "Header, Footer, Dokumen Resmi",
  },
  {
    filename: "kepala-sekolah.webp",
    originalName: "Kepala Sekolah Widada.webp",
    url: "/media/school/kepala-sekolah.webp",
    mimeType: "image/webp",
    size: 65400,
    category: "teacher",
    alt: "Kepala Sekolah Widada, S.Pd., M.Pd.",
    usageContext: "Sambutan Kepala Sekolah & Profil",
  },
  {
    filename: "gerbang-utama.webp",
    originalName: "Gerbang Kampus STM 2 Jetis.webp",
    url: "/media/school/gerbang-utama.webp",
    mimeType: "image/webp",
    size: 112000,
    category: "facility",
    alt: "Gerbang Utama Kampus SMK Negeri 3 Yogyakarta",
    usageContext: "Profil Sejarah & Fasilitas",
  },
  {
    filename: "video-profil.webp",
    originalName: "Video Profil Sekolah Thumbnail.webp",
    url: "/media/school/video-profil.webp",
    mimeType: "image/webp",
    size: 89000,
    category: "general",
    alt: "Thumbnail Video Profil Kampus SKAGATA",
    usageContext: "Beranda Utama & Video Profil",
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let items = await prisma.mediaItem.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Auto-seed baseline assets if empty
    if (items.length === 0) {
      for (const asset of INITIAL_ASSETS) {
        await prisma.mediaItem.create({ data: asset });
      }
      items = await prisma.mediaItem.findMany({ orderBy: { createdAt: "desc" } });
    }

    // Filter in-memory
    let filtered = items;
    if (category && category !== "ALL") {
      filtered = filtered.filter((i) => i.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.filename.toLowerCase().includes(q) ||
          i.originalName.toLowerCase().includes(q) ||
          (i.alt && i.alt.toLowerCase().includes(q)) ||
          (i.usageContext && i.usageContext.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      status: "success",
      count: filtered.length,
      total: items.length,
      data: filtered,
    });
  } catch (error: any) {
    console.error("GET /api/admin/media error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
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
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "general";
    const alt = (formData.get("alt") as string) || "";
    const usageContext = (formData.get("usageContext") as string) || "";

    if (!file) {
      return NextResponse.json(
        { status: "error", message: "File gambar tidak ditemukan dalam formulir." },
        { status: 400 }
      );
    }

    // Validate MIME type
    const validMimes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { status: "error", message: "Format file tidak didukung. Harap unggah WEBP, PNG, JPG, atau SVG." },
        { status: 400 }
      );
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { status: "error", message: "Ukuran file melebihi batas maksimum 5MB." },
        { status: 400 }
      );
    }

    // Ensure uploads directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const cleanOriginal = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const ext = path.extname(cleanOriginal) || ".webp";
    const uniqueName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/media/uploads/${uniqueName}`;

    // Save to Prisma
    const record = await prisma.mediaItem.create({
      data: {
        filename: uniqueName,
        originalName: file.name,
        url: publicUrl,
        mimeType: file.type,
        size: file.size,
        category,
        alt: alt || file.name,
        usageContext: usageContext || null,
      },
    });

    await logAuditAction({
      actor: session.email,
      action: "MEDIA_UPLOAD",
      entity: "MEDIA",
      entityId: record.id,
      details: `Mengunggah media baru: ${record.originalName} (${Math.round(file.size / 1024)} KB)`,
      ip,
    });

    return NextResponse.json({
      status: "success",
      message: "Gambar berhasil diunggah.",
      data: record,
    });
  } catch (error: any) {
    console.error("POST /api/admin/media error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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
    const { id, alt, category, usageContext } = body;

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID Media wajib disertakan." },
        { status: 400 }
      );
    }

    const updated = await prisma.mediaItem.update({
      where: { id },
      data: {
        alt: alt !== undefined ? String(alt).trim() : undefined,
        category: category !== undefined ? String(category).trim() : undefined,
        usageContext: usageContext !== undefined ? String(usageContext).trim() : undefined,
      },
    });

    await logAuditAction({
      actor: session.email,
      action: "UPDATE",
      entity: "MEDIA",
      entityId: id,
      details: `Memperbarui metadata media: ${updated.filename}`,
      ip,
    });

    return NextResponse.json({
      status: "success",
      message: "Metadata media berhasil diperbarui.",
      data: updated,
    });
  } catch (error: any) {
    console.error("PUT /api/admin/media error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Akses tidak diizinkan." },
        { status: 401 }
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID Media wajib disertakan." },
        { status: 400 }
      );
    }

    const item = await prisma.mediaItem.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json(
        { status: "error", message: "File media tidak ditemukan." },
        { status: 404 }
      );
    }

    // Protect system assets in /media/school from filesystem deletion
    if (item.url.startsWith("/media/uploads/")) {
      const filePath = path.join(process.cwd(), "public", item.url);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.warn("Failed to delete local file:", unlinkErr);
        }
      }
    }

    await prisma.mediaItem.delete({ where: { id } });

    await logAuditAction({
      actor: session.email,
      action: "MEDIA_DELETE",
      entity: "MEDIA",
      entityId: id,
      details: `Menghapus media: ${item.originalName || item.filename}`,
      ip,
    });

    return NextResponse.json({
      status: "success",
      message: "Media berhasil dihapus.",
    });
  } catch (error: any) {
    console.error("DELETE /api/admin/media error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
