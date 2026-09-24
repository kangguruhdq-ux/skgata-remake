import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import {
  SCHOOL_INFO,
  MAJORS_DATA,
  SERVICES_DATA,
  POSTS_DATA,
  TEACHERS_DATA,
  JOBS_DATA,
  VIDEOS_DATA,
  INITIAL_TIMELINE,
  INITIAL_ARCHIVE_PHOTOS,
  INITIAL_FACILITIES,
  INITIAL_PROFILE,
  INITIAL_SOCIAL_LINKS,
  INITIAL_PORTAL_ITEMS,
  INITIAL_TOKOH_QUOTES,
  INITIAL_CHATBOT_SETTINGS,
  INITIAL_QUIZ_QUESTIONS,
} from "@/lib/data-initial";

const BACKUP_DIR = path.join(process.cwd(), "data");
const BACKUP_FILE = path.join(BACKUP_DIR, "cms-backup.json");

function getDefaultState() {
  return {
    schoolInfo: SCHOOL_INFO,
    majors: MAJORS_DATA,
    services: SERVICES_DATA,
    posts: POSTS_DATA,
    teachers: TEACHERS_DATA,
    jobs: JOBS_DATA,
    videos: VIDEOS_DATA,
    timeline: INITIAL_TIMELINE,
    archivePhotos: INITIAL_ARCHIVE_PHOTOS,
    facilities: INITIAL_FACILITIES,
    profile: INITIAL_PROFILE,
    socialLinks: INITIAL_SOCIAL_LINKS,
    activeVideoId: "tJhzVg7Nq4g",
    announcement: {
      enabled: true,
      badge: "INFO RESMI SPMB 2026",
      text: "Penerimaan Peserta Didik Baru (SPMB) SMK Negeri 3 Yogyakarta Tahun Ajaran 2026/2027 telah dibuka secara resmi.",
      linkText: "Pelajari Panduan & Alur Pendaftaran",
      linkUrl: "/kabar?category=SPMB",
      theme: "emerald" as const,
    },
    portalItems: INITIAL_PORTAL_ITEMS,
    tokohQuotes: INITIAL_TOKOH_QUOTES,
    chatbotSettings: INITIAL_CHATBOT_SETTINGS,
    quizQuestions: INITIAL_QUIZ_QUESTIONS,
  };
}

export async function GET() {
  try {
    // 1. Try reading from Prisma database
    try {
      const record = await prisma.cmsData.findUnique({
        where: { id: "singleton" },
      });
      if (record && record.data) {
        let parsed = JSON.parse(record.data);
        const isStale =
          !parsed.teachers ||
          !Array.isArray(parsed.teachers) ||
          parsed.teachers.length < 10 ||
          parsed.teachers.some((t: any) => t.photo?.includes("unsplash.com") || t.photo?.includes("wikimedia.org"));

        if (isStale) {
          const defaultData = getDefaultState();
          parsed = {
            ...defaultData,
            ...parsed,
            teachers: TEACHERS_DATA,
            majors: MAJORS_DATA,
            tokohQuotes: INITIAL_TOKOH_QUOTES,
          };
          // Persist upgraded 148 teachers state back to Prisma
          prisma.cmsData.update({
            where: { id: "singleton" },
            data: { data: JSON.stringify(parsed) },
          }).catch((err) => console.warn("Background Prisma upgrade skipped:", err));
        }

        return NextResponse.json(
          {
            status: "success",
            source: "database",
            data: parsed,
          },
          {
            headers: {
              "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
            },
          }
        );
      }
    } catch (dbErr) {
      console.warn("Prisma read failed, attempting file backup fallback:", dbErr);
    }

    // 2. Try reading from filesystem backup
    if (fs.existsSync(BACKUP_FILE)) {
      try {
        const fileContent = fs.readFileSync(BACKUP_FILE, "utf-8");
        const parsed = JSON.parse(fileContent);
        return NextResponse.json(
          {
            status: "success",
            source: "backup_file",
            data: parsed,
          },
          {
            headers: {
              "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
            },
          }
        );
      } catch (fileErr) {
        console.warn("File backup read failed:", fileErr);
      }
    }

    // 3. Fallback to default state and seed the DB
    const defaultData = getDefaultState();
    try {
      await prisma.cmsData.upsert({
        where: { id: "singleton" },
        update: { data: JSON.stringify(defaultData) },
        create: { id: "singleton", data: JSON.stringify(defaultData) },
      });
    } catch (seedErr) {
      console.warn("Initial DB seed skipped:", seedErr);
    }

    return NextResponse.json(
      {
        status: "success",
        source: "initial_default",
        data: defaultData,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/cms error:", error);
    return NextResponse.json(
      { status: "error", message: error.message, data: getDefaultState() },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cmsPayload = body.data || body;

    if (!cmsPayload || typeof cmsPayload !== "object") {
      return NextResponse.json(
        { status: "error", message: "Invalid payload format." },
        { status: 400 }
      );
    }

    const jsonString = JSON.stringify(cmsPayload);

    // 1. Save to Prisma Database
    let dbSuccess = false;
    try {
      await prisma.cmsData.upsert({
        where: { id: "singleton" },
        update: { data: jsonString },
        create: { id: "singleton", data: jsonString },
      });
      dbSuccess = true;
    } catch (dbErr: any) {
      console.error("Failed to save to Prisma database:", dbErr);
    }

    // 2. Save to file backup for safety & resilience
    try {
      if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
      }
      fs.writeFileSync(BACKUP_FILE, jsonString, "utf-8");
    } catch (fsErr) {
      console.warn("Failed to write filesystem backup:", fsErr);
    }

    return NextResponse.json({
      status: "success",
      dbPersisted: dbSuccess,
      message: "Data CMS berhasil disimpan ke database produksi.",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("POST /api/cms error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
