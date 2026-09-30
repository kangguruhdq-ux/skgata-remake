import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-server";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { status: "unauthenticated", user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      status: "authenticated",
      user: {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role,
        loginAt: new Date(session.iat * 1000).toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
