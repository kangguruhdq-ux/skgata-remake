"use client";

const AUTH_KEY = "skagata_admin_session";

export interface AdminUser {
  username?: string;
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

  // Call server logout endpoint
  fetch("/api/auth/logout", { method: "POST" }).catch((err) => {
    console.warn("Failed to notify server logout:", err);
  });
}

export async function authenticateAdmin(userOrEmail: string, pass: string): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userOrEmail,
        password: pass,
      }),
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      return {
        success: false,
        error: data.message || "Kombinasi ID Pengguna dan Kata Sandi tidak cocok.",
      };
    }

    const session: AdminUser = {
      username: data.user.email.split("@")[0],
      name: data.user.name,
      role: data.user.role,
      email: data.user.email,
      loginAt: data.user.loginAt || new Date().toISOString(),
    };

    setAdminSession(session);
    return { success: true, user: session };
  } catch (err: any) {
    return {
      success: false,
      error: "Koneksi ke server gagal. Pastikan jaringan Anda terhubung.",
    };
  }
}
