"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Newspaper,
  Layers,
  Users,
  Briefcase,
  Laptop,
  Settings,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Lock,
  History,
  Wrench,
  GraduationCap,
  Bot,
  Compass,
} from "lucide-react";
import { getAdminSession, clearAdminSession, AdminUser } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState<AdminUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    const current = getAdminSession();
    if (!current) {
      router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setSession(current);
    }
    setIsCheckingAuth(false);

    const handleAuthChange = () => {
      const updated = getAdminSession();
      if (!updated && !pathname.startsWith("/admin/login")) {
        router.replace("/admin/login");
      } else {
        setSession(updated);
      }
    };

    window.addEventListener("skagata_auth_changed", handleAuthChange);
    return () => window.removeEventListener("skagata_auth_changed", handleAuthChange);
  }, [pathname, isLoginPage, router]);

  // If on login page, render children directly without admin chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while verifying credentials
  if (isCheckingAuth || !session) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-display font-bold text-lg text-slate-100">
          Memverifikasi Otorisasi Sesi...
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          SKAGATA Enterprise Security System
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari sesi Administrator SKAGATA?")) {
      clearAdminSession();
      router.replace("/admin/login");
    }
  };

  const navItems = [
    { label: "Overview Analytics", href: "/admin", icon: LayoutDashboard },
    { label: "Kelola Berita & Kabar", href: "/admin/berita", icon: Newspaper },
    { label: "Kelola 8 Jurusan", href: "/admin/jurusan", icon: Layers },
    { label: "Direktori Guru & SDM", href: "/admin/sdm", icon: Users },
    { label: "Sejarah & Galeri Arsip", href: "/admin/sejarah", icon: History },
    { label: "Fasilitas Bengkel & Sarana", href: "/admin/fasilitas", icon: Wrench },
    { label: "Profil & Visi Misi", href: "/admin/profil", icon: GraduationCap },
    { label: "Bursa Kerja (BKK)", href: "/admin/karir", icon: Briefcase },
    { label: "Layanan & Portal", href: "/admin/layanan", icon: Laptop },
    { label: "AI Bot & Kuis Jurusan", href: "/admin/ai-chatbot", icon: Bot },
    { label: "Pengaturan & 5 Medsos", href: "/admin/pengaturan", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white h-16 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden w-9 h-9 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-300"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow">
              SK
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-none">
                SKAGATA CMS Portal
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 inline" />
                <span>Terautentikasi ({session.role})</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Web Publik</span>
          </Link>

          {/* User profile & Logout */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-700 text-xs">
            <div className="hidden sm:flex flex-col text-right">
              <span className="font-semibold text-slate-200 text-xs leading-none">
                {session.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                {session.email}
              </span>
            </div>

            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
              AD
            </div>

            <button
              onClick={handleLogout}
              title="Keluar / Logout Sesi"
              className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-semibold">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-16 bottom-0 left-0 w-64 bg-slate-900 text-slate-300 z-30 border-r border-slate-800 p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Menu Navigasi CMS
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real-Time Sync Engine</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Setiap perubahan tersimpan otomatis ke browser storage & state publik.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area with smooth animated transitions between pages */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
