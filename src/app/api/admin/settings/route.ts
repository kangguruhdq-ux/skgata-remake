import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-server";
import { logAuditAction } from "@/lib/audit";

export async function GET() {
  try {
    let settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: { id: "default" },
      });
    }

    return NextResponse.json({
      status: "success",
      data: settings,
    });
  } catch (error: any) {
    console.error("GET /api/admin/settings error:", error);
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
    const body = await req.json();

    const updated = await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: {
        schoolName: body.schoolName,
        tagline: body.tagline,
        phone: body.phone,
        email: body.email,
        address: body.address,
        headmaster: body.headmaster,
        logoUrl: body.logoUrl,
        faviconUrl: body.faviconUrl,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        metaKeywords: body.metaKeywords,
        socialInstagram: body.socialInstagram,
        socialYoutube: body.socialYoutube,
        socialTiktok: body.socialTiktok,
        socialFacebook: body.socialFacebook,
        socialTwitter: body.socialTwitter,
        activeVideoId: body.activeVideoId,
        spmbActive: body.spmbActive !== undefined ? Boolean(body.spmbActive) : undefined,
        spmbUrl: body.spmbUrl,
        navLinks: body.navLinks ? JSON.stringify(body.navLinks) : undefined,
      },
      create: {
        id: "default",
        schoolName: body.schoolName || "SMK Negeri 3 Yogyakarta",
        tagline: body.tagline || "Konsisten Mencetak Teknisi Unggul, Berkarakter Taruna & Budaya",
        phone: body.phone || "(0274) 513503",
        email: body.email || "humas@smkn3jogja.sch.id",
        address: body.address || "Jl. R.W. Monginsidi No. 2, Jetis, Yogyakarta (STM 2 Jetis)",
        headmaster: body.headmaster || "Widada, S.Pd., M.Pd.",
        logoUrl: body.logoUrl || "/media/school/logo.webp",
        faviconUrl: body.faviconUrl || "/favicon.ico",
        metaTitle: body.metaTitle || "SMK Negeri 3 Yogyakarta | STM 2 Jetis Unggul & Berkarakter",
        metaDescription: body.metaDescription || "Website resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis).",
        metaKeywords: body.metaKeywords || "SMK Negeri 3 Yogyakarta, STM 2 Jetis",
        socialInstagram: body.socialInstagram || "https://www.instagram.com/smkn3jogja",
        socialYoutube: body.socialYoutube || "https://www.youtube.com/@smknegeri3yogyakarta",
        socialTiktok: body.socialTiktok || "https://www.tiktok.com/@smkn3jogja",
        socialFacebook: body.socialFacebook || "https://www.facebook.com/smkn3jogja",
        socialTwitter: body.socialTwitter || "https://twitter.com/smkn3jogja",
        activeVideoId: body.activeVideoId || "tJhzVg7Nq4g",
        spmbActive: body.spmbActive !== false,
        spmbUrl: body.spmbUrl || "https://smkn3jogja.sch.id/pengumuman/",
        navLinks: body.navLinks ? JSON.stringify(body.navLinks) : null,
      },
    });

    await logAuditAction({
      actor: session.email,
      action: "SETTINGS_CHANGE",
      entity: "SETTINGS",
      details: "Memperbarui konfigurasi identitas situs, SEO, dan media sosial",
      ip,
    });

    return NextResponse.json({
      status: "success",
      message: "Pengaturan situs berhasil disimpan ke database.",
      data: updated,
    });
  } catch (error: any) {
    console.error("POST /api/admin/settings error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
