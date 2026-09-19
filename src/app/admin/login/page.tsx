"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, User, ArrowRight, ArrowLeft, KeyRound, Eye, EyeOff, AlertCircle } from "lucide-react";
import { authenticateAdmin, getAdminSession } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect directly to admin overview
    const session = getAdminSession();
    if (session) {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      const res = authenticateAdmin(username, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setErrorMsg(res.error || "Gagal masuk");
        setLoading(false);
      }
    }, 400);
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-6 antialiased relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website Utama</span>
        </Link>

        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          Enkripsi Sesi Aktif
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto relative z-10 pt-6 pb-6">
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          {/* Header & Crest */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-skagata-900 border-2 border-emerald-500/60 p-2 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/80">
              <img
                src="https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-300x300.png"
                alt="Logo SMKN 3 Yogyakarta"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <h1 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
              Otentikasi Admin SKAGATA
            </h1>
            <p className="text-xs text-slate-400">
              Akses khusus pengelola web resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis)
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">
                Username / Email Petugas
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin atau email sekolah"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 btn-bounce"
            >
              {loading ? (
                <span>Memverifikasi Akses...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Masuk ke Dashboard CMS</span>
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sistem dilindungi otorisasi role berbasis token internal</span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-slate-600 text-[11px] relative z-10">
        &copy; 2026 SMK Negeri 3 Yogyakarta. All rights reserved.
      </div>
    </div>
  );
}
