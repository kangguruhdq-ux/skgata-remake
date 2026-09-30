import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-server";
import { getAuditLogs, clearAllAuditLogs } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Akses tidak diizinkan." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const action = searchParams.get("action") || undefined;
    const entity = searchParams.get("entity") || undefined;

    const result = await getAuditLogs({ limit, offset, action, entity });

    return NextResponse.json({
      status: "success",
      ...result,
    });
  } catch (error: any) {
    console.error("GET /api/admin/audit-log error:", error);
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
    await clearAllAuditLogs(session.email, ip);

    return NextResponse.json({
      status: "success",
      message: "Seluruh log audit berhasil dibersihkan oleh administrator.",
    });
  } catch (error: any) {
    console.error("DELETE /api/admin/audit-log error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
