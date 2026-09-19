import { NextResponse } from "next/server";
import { MAJORS_DATA } from "@/lib/data-initial";

export async function GET() {
  return NextResponse.json({
    status: "success",
    total: MAJORS_DATA.length,
    data: MAJORS_DATA,
  });
}
