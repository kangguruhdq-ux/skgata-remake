"use client";

const AUTH_KEY = "skagata_admin_session";

export interface AdminUser {
  username: string;
  name: string;
  role: string;
  email: string;
  loginAt: string;
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAdminSession(user: AdminUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("skagata_auth_changed"));
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("skagata_auth_changed"));
}

export function authenticateAdmin(userOrEmail: string, pass: string): { success: boolean; error?: string } {
  const cleanUser = userOrEmail.trim().toLowerCase();
  const cleanPass = pass.trim();

  // Valid credentials:
  // 1. admin / skagata2026
  // 2. admin@smkn3jogja.sch.id / skagata1952
  const isValid =
    (cleanUser === "admin" && cleanPass === "skagata2026") ||
    (cleanUser === "admin@smkn3jogja.sch.id" && (cleanPass === "skagata1952" || cleanPass === "skagata2026"));

  if (isValid) {
    const session: AdminUser = {
      username: "admin",
      name: "Administrator Utama SKAGATA",
      role: "Super Admin & Humas",
      email: "humas@smkn3jogja.sch.id",
      loginAt: new Date().toISOString(),
    };
    setAdminSession(session);
    return { success: true };
  }

  return {
    success: false,
    error: "Kombinasi ID Pengguna dan Kata Sandi tidak cocok. Silakan periksa kembali atau gunakan tombol 'Akun Demo'.",
  };
}
