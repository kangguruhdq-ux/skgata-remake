import { NextResponse } from "next/server";
import { MAJORS_DATA } from "@/lib/data-initial";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const record = await prisma.cmsData.findUnique({
      where: { id: "singleton" },
    });
    if (record && record.data) {
      const parsed = JSON.parse(record.data);
      if (parsed.majors && Array.isArray(parsed.majors) && parsed.majors.length > 0) {
        return NextResponse.json({
          status: "success",
          total: parsed.majors.length,
          data: parsed.majors,
        });
      }
    }
  } catch (e) {
    // fallback
  }

  return NextResponse.json({
    status: "success",
    total: MAJORS_DATA.length,
    data: MAJORS_DATA,
  });
}
