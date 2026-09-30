import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { signTokenEdge, verifyTokenEdge, SessionPayload } from "@/lib/jwt-edge";

export type { SessionPayload };

export const COOKIE_NAME = "skagata_admin_token";

// Create signed token
export async function signToken(payload: Omit<SessionPayload, "iat" | "exp">, expiresInSeconds = 7 * 24 * 3600): Promise<string> {
  return signTokenEdge(payload, expiresInSeconds);
}

// Verify signed token
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  return verifyTokenEdge(token);
}

// Get server session from cookies in Route Handlers & Server Components
export async function getServerSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}

// Set auth cookie
export function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 3600, // 7 days
  });
}

// Clear auth cookie
export function clearAuthCookie() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// Seed admin user in database if not present
export async function ensureDefaultAdminUser() {
  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: "humas@smkn3jogja.sch.id" },
          { email: "admin@smkn3jogja.sch.id" },
        ],
      },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          name: "Administrator Utama SKAGATA",
          email: "humas@smkn3jogja.sch.id",
          role: "SUPERADMIN",
          password: process.env.INITIAL_ADMIN_PASSWORD || "skagata2026",
          avatar: "/media/school/logo.webp",
        },
      });
    }
  } catch (err) {
    console.warn("Failed to check/seed default admin user:", err);
  }
}
