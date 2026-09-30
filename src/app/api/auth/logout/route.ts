import { NextRequest, NextResponse } from "next/server";
import { getServerSession, clearAuthCookie } from "@/lib/auth-server";
import { logAuditAction } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const session = await getServerSession();

    if (session) {
      await logAuditAction({
        actor: session.email,
        action: "LOGOUT",
        entity: "AUTH",
        details: "Sesi admin ditutup / logout manual",
        ip,
      });
    }

    clearAuthCookie();

    return NextResponse.json({
      status: "success",
      message: "Berhasil keluar dari sesi.",
    });
  } catch (error: any) {
    console.error("POST /api/auth/logout error:", error);
    clearAuthCookie();
    return NextResponse.json({ status: "success" });
  }
}
