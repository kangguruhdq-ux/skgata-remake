"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  Home,
  Layers,
  GraduationCap,
  Film,
  Laptop,
  Newspaper,
  Briefcase,
  ExternalLink,
  Megaphone,
  UserCheck,
  Building,
  Settings,
  Compass,
} from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[310px] sm:w-[340px] max-w-[85vw] bg-white dark:bg-slate-900 dark:text-slate-100 z-50 shadow-2xl border-l border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-skagata-900 text-white flex items-center justify-center p-1">
              <img
                src="https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-300x300.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-display font-extrabold text-xs text-slate-900 dark:text-white block">
                  SMKN 3 YOGYAKARTA
                </span>
                <span className="font-serif italic font-black text-red-600 dark:text-red-400 text-[11px]">
                  Skagata Jaya !
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Navigasi Cepat Mobile
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle className="!p-1.5" />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center transition"
              aria-label="Tutup Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-1.5 text-xs sm:text-sm flex-1">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-skagata-800 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100/70 transition"
          >
            <Home className="w-4 h-4 text-skagata-600 dark:text-emerald-400" />
            <span>Beranda</span>
          </Link>

          {/* Section Profil */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 block mb-1">
              Profil Sekolah
            </span>
            <Link
              href="/profil"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-skagata-700 dark:text-emerald-400 font-semibold bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950 transition"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Data Pokok & Profil Sekolah</span>
            </Link>
            <Link
              href="/profil/sambutan"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <UserCheck className="w-4 h-4 text-slate-400" />
              <span>Sambutan Kepala Sekolah</span>
            </Link>
            <Link
              href="/profil/sejarah"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Building className="w-4 h-4 text-slate-400" />
              <span>Sejarah STM 2 Jetis 1952</span>
            </Link>
            <Link
              href="/profil/visi-misi"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Visi, Misi & 4 Pilar</span>
            </Link>
            <Link
              href="/profil/fasilitas"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Laptop className="w-4 h-4 text-slate-400" />
              <span>Fasilitas Bengkel & Lab</span>
            </Link>
          </div>

          {/* Section Program Keahlian */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 block mb-1">
              Akademik & Karir
            </span>
            <Link
              href="/program-keahlian"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>Program Keahlian (8 Jurusan)</span>
            </Link>
            <Link
              href="/kuis-jurusan"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-amber-600 dark:text-amber-400 font-bold bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/60 transition"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Kuis Rekomendasi Jurusan</span>
            </Link>
            <Link
              href="/karir"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span>Bursa Kerja SMK (BKK)</span>
            </Link>
          </div>

          {/* Section Pokja & Unit Penunjang (Sesuai Web Asli) */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 block mb-1">
              Pokja & Unit Penunjang
            </span>
            <div className="grid grid-cols-2 gap-1 px-1">
              <a
                href="http://perpustakaan.smkn3jogja.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Perpus Widura
              </a>
              <a
                href="https://bnsp.go.id/detaillsp?id=1008"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • LSP P1 BNSP
              </a>
              <a
                href="http://smm.smkn3jogja.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Penjaminan Mutu
              </a>
              <a
                href="http://tefa.skagata.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • BLUD & TEFA
              </a>
              <Link
                href="/layanan"
                onClick={onClose}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Bimbingan BK
              </Link>
              <Link
                href="/layanan"
                onClick={onClose}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • PLIS! ICT Center
              </Link>
              <Link
                href="/profil/visi-misi"
                onClick={onClose}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Kesiswaan
              </Link>
              <Link
                href="/kabar"
                onClick={onClose}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • OSIS Skagata
              </Link>
            </div>
          </div>

          {/* Section Layanan Digital (Sesuai Web Asli) */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 block mb-1">
              Layanan Digital Resmi
            </span>
            <div className="grid grid-cols-2 gap-1 px-1">
              <Link
                href="/layanan"
                onClick={onClose}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Info Publik
              </Link>
              <a
                href="https://forms.gle/4ieEgX1dudo8ULyV9"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Legalisasi Ijazah
              </a>
              <a
                href="https://kamimendengar.skagata.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • WBS Mendengar
              </a>
              <a
                href="http://kelasiber.skagata.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Daftar Ulang XI-XII
              </a>
              <Link
                href="/kabar?category=SPMB"
                onClick={onClose}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Daftar Siswa Baru
              </Link>
              <Link
                href="/kabar"
                onClick={onClose}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition font-medium"
              >
                • Kliping Media
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <Link
            href="/kabar?category=SPMB"
            onClick={onClose}
            className="w-full block py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white text-center rounded-xl font-bold shadow-sm transition text-xs"
          >
            Pendaftaran SPMB 2026
          </Link>
        </div>
      </aside>
    </>
  );
}
