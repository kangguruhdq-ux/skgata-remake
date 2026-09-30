import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const nodes = await prisma.organizationNode.findMany({
      where: { isActive: true },
      orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json(
      {
        status: "success",
        count: nodes.length,
        data: nodes,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/organization error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
