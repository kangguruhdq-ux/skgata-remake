"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const skipSplash = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => setIsDone(true), 400);
  }, []);

  useEffect(() => {
    setMounted(true);

    // Allow user to press Escape to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipSplash();
    };
    window.addEventListener("keydown", handleKeyDown);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => setIsDone(true), 500);
          }, 250);
          return 100;
        }
        // Smooth acceleration
        const increment = prev > 75 ? 10 : prev > 40 ? 7 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [skipSplash]);

  if (!mounted || isDone) return null;

  // Status message according to progress
  const getStatusMessage = () => {
    if (progress < 25) return "Menginisialisasi Kernel Vokasi Skagata...";
    if (progress < 55) return "Menghubungkan 8 Konsentrasi Keahlian & Lab...";
    if (progress < 85) return "Memuat Database Guru, Prestasi & Fasilitas...";
    if (progress < 100) return "Mengoptimalkan Tampilan Interaktif 3D...";
    return "Selamat Datang di SMK Negeri 3 Yogyakarta!";
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-slate-950 text-white flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-500 ease-out ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
      }`}
    >
      {/* Dynamic Background Matrix & Ambient Radar Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.22)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:28px_28px] pointer-events-none" />

      {/* Futuristic Radar Sweep */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-[500px] h-[500px] rounded-full border border-emerald-500/20 animate-[spin_10s_linear_infinite]" />
        <div className="w-[700px] h-[700px] rounded-full border border-emerald-500/10 animate-[spin_16s_linear_infinite_reverse]" />
      </div>

      {/* Top Bar Skip Control */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={skipSplash}
          className="text-[11px] font-mono tracking-wider text-slate-400 hover:text-emerald-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 backdrop-blur-md shadow-lg"
          title="Lewati Animasi Memuat (Esc)"
        >
          <span>LEWATI</span>
          <span className="text-[10px] bg-slate-800 px-1 py-0.2 rounded border border-slate-600">Esc</span>
          <ArrowRight className="w-3 h-3 text-emerald-400" />
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* Tech Cyber Holographic Center */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center mb-6">
          {/* Outer Segmented Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/50 animate-[spin_14s_linear_infinite]" />

          {/* Glowing Node Points */}
          <div className="absolute top-0 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_12px_#34d399] animate-ping" />
          <div className="absolute bottom-0 w-2 h-2 bg-teal-300 rounded-full shadow-[0_0_10px_#2dd4bf]" />

          {/* Inner Counter-Rotating Ring with Crosshairs */}
          <div className="absolute inset-3 rounded-full border border-teal-400/30 animate-[spin_9s_linear_infinite_reverse]" />

          {/* Central Pulsing Green Aura */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-2xl animate-pulse" />

          {/* Center Emblem Shield with 3D Depth */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-skagata-900 to-slate-950 border-2 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.55)] flex items-center justify-center p-3 transition-transform duration-500 hover:scale-105">
            <img
              src="https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-1024x1024.png"
              alt="Logo SMKN 3 Yogyakarta"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>

        {/* School Name & Technical Badges */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>SMK PUSAT KEUNGGULAN &bull; STM 2 JETIS</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            SMK NEGERI 3 YOGYAKARTA
          </h1>

          <p className="text-xs text-slate-400 font-light max-w-sm mx-auto">
            Konsisten Mencetak Teknisi Unggul & Berkarakter Luhur Sejak 1952
          </p>
        </div>

        {/* Progress Bar & Dynamic Status Terminal */}
        <div className="w-72 sm:w-80 mt-8 space-y-2.5">
          {/* Glowing Track */}
          <div className="h-2 w-full bg-slate-900/90 rounded-full overflow-hidden border border-slate-700/60 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full shadow-[0_0_14px_rgba(52,211,153,0.9)] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Info Readout */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-0.5">
            <span className="flex items-center gap-2 truncate pr-2 text-slate-300 text-left">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
              <span className="truncate">{getStatusMessage()}</span>
            </span>
            <span className="text-emerald-400 font-bold flex-shrink-0">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
