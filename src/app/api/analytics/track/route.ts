import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";
    const referer = req.headers.get("referer") || "";

    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path.slice(0, 255) : "/";

    // Ignore admin tracking
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ status: "ignored" });
    }

    // Determine device type
    let device = "desktop";
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      device = "tablet";
    } else if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(userAgent)) {
      device = "mobile";
    }

    // Determine browser
    let browser = "Other";
    if (/edg\//i.test(userAgent)) browser = "Edge";
    else if (/chrome|crios/i.test(userAgent)) browser = "Chrome";
    else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
    else if (/safari/i.test(userAgent)) browser = "Safari";

    // Save to VisitorLog
    await prisma.visitorLog.create({
      data: {
        ip,
        path,
        userAgent: userAgent.slice(0, 500),
        referer: referer.slice(0, 500),
        device,
        browser,
      },
    });

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    // Analytics failure should never break user requests
    return NextResponse.json({ status: "ignored" }, { status: 200 });
  }
}
