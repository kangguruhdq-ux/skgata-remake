import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    // Run parallel aggregation queries
    const [
      totalVisits,
      todayVisits,
      activeOnline,
      rawDevices,
      rawTopPages,
      allLogs7d,
      allLogs24h,
      distinctIpsResult,
    ] = await Promise.all([
      prisma.visitorLog.count(),
      prisma.visitorLog.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.visitorLog.count({ where: { createdAt: { gte: fiveMinutesAgo } } }),
      prisma.visitorLog.groupBy({
        by: ["device"],
        _count: { id: true },
      }),
      prisma.visitorLog.groupBy({
        by: ["path"],
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 8,
      }),
      prisma.visitorLog.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true, ip: true },
      }),
      prisma.visitorLog.findMany({
        where: { createdAt: { gte: todayStart } },
        select: { createdAt: true, ip: true },
      }),
      prisma.visitorLog.groupBy({
        by: ["ip"],
      }),
    ]);

    const uniqueVisitors = distinctIpsResult.length;

    // Device breakdown
    const devices = {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    };
    rawDevices.forEach((d) => {
      const dev = (d.device || "desktop").toLowerCase();
      if (dev.includes("mobile") || dev.includes("phone")) devices.mobile += d._count.id;
      else if (dev.includes("tablet")) devices.tablet += d._count.id;
      else devices.desktop += d._count.id;
    });

    // Top pages list
    const topPages = rawTopPages.map((p) => ({
      path: p.path,
      views: p._count.id,
    }));

    // 24h breakdown (8 intervals)
    const hours24 = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
    const traffic24h = hours24.map((label, idx) => {
      const startHour = idx * 3;
      const endHour = startHour + 3;
      const inBucket = allLogs24h.filter((l) => {
        const h = new Date(l.createdAt).getHours();
        return h >= startHour && h < endHour;
      });
      const uniqueIps = new Set(inBucket.map((l) => l.ip)).size;
      return {
        label,
        visitors: uniqueIps,
        pageviews: inBucket.length,
      };
    });

    // 7d breakdown
    const daysName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const traffic7d: { label: string; visitors: number; pageviews: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      const inDay = allLogs7d.filter((l) => {
        const time = new Date(l.createdAt).getTime();
        return time >= dayStart.getTime() && time < dayEnd.getTime();
      });
      const uniqueIps = new Set(inDay.map((l) => l.ip)).size;
      traffic7d.push({
        label: daysName[d.getDay()],
        visitors: uniqueIps,
        pageviews: inDay.length,
      });
    }

    // 30d breakdown
    const traffic30d = [
      { label: "Minggu 1", visitors: 0, pageviews: 0 },
      { label: "Minggu 2", visitors: 0, pageviews: 0 },
      { label: "Minggu 3", visitors: 0, pageviews: 0 },
      { label: "Minggu 4", visitors: 0, pageviews: 0 },
    ];
    // Fill week buckets
    for (let w = 0; w < 4; w++) {
      const wStart = new Date(now.getTime() - (4 - w) * 7 * 24 * 60 * 60 * 1000);
      const wEnd = new Date(now.getTime() - (3 - w) * 7 * 24 * 60 * 60 * 1000);
      const inWeek = allLogs7d.filter((l) => {
        const time = new Date(l.createdAt).getTime();
        return time >= wStart.getTime() && time < wEnd.getTime();
      });
      traffic30d[w].visitors = new Set(inWeek.map((l) => l.ip)).size;
      traffic30d[w].pageviews = inWeek.length;
    }

    // Year breakdown
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const trafficYear = months.map((label, mIdx) => {
      return {
        label,
        visitors: mIdx === now.getMonth() ? uniqueVisitors : 0,
        pageviews: mIdx === now.getMonth() ? totalVisits : 0,
      };
    });

    return NextResponse.json({
      status: "success",
      summary: {
        totalVisits,
        uniqueVisitors,
        todayVisits,
        activeOnline: Math.max(activeOnline, 1),
      },
      devices,
      topPages,
      traffic: {
        "24h": traffic24h,
        "7d": traffic7d,
        "30d": traffic30d,
        year: trafficYear,
      },
      timestamp: now.toISOString(),
    });
  } catch (error: any) {
    console.error("GET /api/admin/analytics error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
