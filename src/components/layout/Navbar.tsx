"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, ChevronDown, Wrench, Shield, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

interface NavbarProps {
  onOpenSearch: () => void;
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export default function Navbar({ onOpenSearch, onToggleDrawer, isDrawerOpen }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [majorsOpen, setMajorsOpen] = useState(false);
  const [pokjaOpen, setPokjaOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-slate-200/90 transition-all duration-300 shadow-sm w-full max-w-full overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-2 w-full min-w-0">
          {/* Brand Identity with authentic Skagata Jaya! badge */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-skagata-900 border border-emerald-500/30 text-white flex items-center justify-center p-1 sm:p-1.5 shadow-md group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shrink-0">
              <img
                src="https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-300x300.png"
                alt="Logo SMKN 3 Yogyakarta"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add("fallback-logo");
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-display font-black text-xs sm:text-base lg:text-lg text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-skagata-700 transition truncate">
                  <span className="sm:hidden">SMKN 3 YOGYAKARTA</span>
                  <span className="hidden sm:inline">SMK NEGERI 3 YOGYAKARTA</span>
                </span>
                <span className="font-serif italic font-black text-red-600 dark:text-red-400 text-[10px] sm:text-xs lg:text-sm tracking-wide shrink-0">
                  Skagata Jaya !
                </span>
                <span className="hidden 2xl:inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-skagata-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 shrink-0">
                  STM 2 Jetis
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-0.5 hidden 2xl:block">
                Pusat Keunggulan • Ketarunaan & Teknologi
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 font-medium text-xs 2xl:text-sm text-slate-700 dark:text-slate-200 flex-shrink-0">
            <Link
              href="/"
              className="px-2 xl:px-2.5 py-1.5 xl:py-2 text-skagata-700 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 transition whitespace-nowrap"
            >
              Beranda
            </Link>

            {/* Dropdown Profil (Click navigates to /profil, Hover reveals subpages) */}
            <div
              className="relative group"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <Link
                href="/profil"
                className="px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl hover:text-skagata-700 dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 flex items-center gap-1 transition whitespace-nowrap"
                onClick={() => setProfileOpen(false)}
              >
                <span>Profil</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    profileOpen ? "rotate-180 text-skagata-700 dark:text-emerald-400" : "opacity-70"
                  }`}
                />
              </Link>

              <div
                className={`absolute top-full left-0 w-72 pt-2 transition-all duration-200 z-50 ${
                  profileOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2.5 space-y-1">
                  <Link
                    href="/profil"
                    className="block px-3 py-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-skagata-900 dark:text-emerald-300 block text-sm">Data Pokok & Profil Sekolah</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">NPSN, Akreditasi A, ISO, Rombel & Guru</span>
                  </Link>
                  <Link
                    href="/profil/sambutan"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Sambutan Kepala Sekolah</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Pesan dan visi pendidikan Skagata</span>
                  </Link>
                  <Link
                    href="/profil/sejarah"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Sejarah STM 2 Jetis</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Sekolah teknik tertua sejak 1952</span>
                  </Link>
                  <Link
                    href="/profil/visi-misi"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Visi, Misi & 4 Pilar</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Ketarunaan, Kewirausahaan, Budaya</span>
                  </Link>
                  <Link
                    href="/profil/struktur-organisasi"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Struktur Organisasi</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Bagan tata kelola manajemen</span>
                  </Link>
                  <Link
                    href="/profil/sdm"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Pendidik & Tenaga Kependidikan</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Direktori pencarian guru & staf</span>
                  </Link>
                  <Link
                    href="/profil/fasilitas"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Fasilitas Bengkel & Lab</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Sarana prasarana modern standar industri</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Dropdown Program Keahlian (8 Jurusan) */}
            <div
              className="relative group"
              onMouseEnter={() => setMajorsOpen(true)}
              onMouseLeave={() => setMajorsOpen(false)}
            >
              <Link
                href="/program-keahlian"
                className="px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl hover:text-skagata-700 dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 flex items-center gap-1 transition whitespace-nowrap"
                onClick={() => setMajorsOpen(false)}
              >
                <span>Program Keahlian</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    majorsOpen ? "rotate-180 text-skagata-700 dark:text-emerald-400" : "opacity-70"
                  }`}
                />
              </Link>

              <div
                className={`absolute top-full left-0 w-80 pt-2 transition-all duration-200 z-50 ${
                  majorsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2.5 grid grid-cols-2 gap-1">
                  <Link
                    href="/jurusan/broadcasting-perfilman"
                    className="px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Broadcasting (BP)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Studio Skagata TV</span>
                  </Link>
                  <Link
                    href="/jurusan/teknik-jaringan-komputer-telekomunikasi"
                    className="px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Jaringan (TJKT)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Fiber Optik & Cloud</span>
                  </Link>
                  <Link
                    href="/jurusan/desain-pemodelan-informasi-bangunan"
                    className="px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Desain BIM (DPIB)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Arsitektur 3D Revit</span>
                  </Link>
                  <Link
                    href="/jurusan/teknik-konstruksi-perumahan"
                    className="px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Konstruksi (TKP)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Struktur Gedung</span>
                  </Link>
                  <Link
                    href="/jurusan/teknik-elektronika"
                    className="px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Elektronika (TE)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Modena & Robotika</span>
                  </Link>
                  <Link
                    href="/jurusan/teknik-ketenagalistrikan"
                    className="px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Listrik (TITL)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Daya & Panel Surya</span>
                  </Link>
                  <Link
                    href="/jurusan/teknik-kendaraan-ringan-otomotif"
                    className="px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Otomotif (TKRO)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Injeksi EFI & EV</span>
                  </Link>
                  <Link
                    href="/jurusan/teknik-pemesinan"
                    className="px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Mesin (TP)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">CNC Center Presisi</span>
                  </Link>
                  <div className="col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-1">
                    <Link
                      href="/jurusan"
                      className="text-xs text-skagata-700 dark:text-emerald-400 font-bold hover:underline"
                    >
                      Lihat Semua 8 Konsentrasi &rarr;
                    </Link>
                    <Link
                      href="/kuis-jurusan"
                      className="text-[11px] text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Kuis Jurusan</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Pokja & Unit Penunjang (Sesuai Web Asli) */}
            <div
              className="relative group"
              onMouseEnter={() => setPokjaOpen(true)}
              onMouseLeave={() => setPokjaOpen(false)}
            >
              <button
                className="px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl hover:text-skagata-700 dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 flex items-center gap-1 transition whitespace-nowrap"
                onClick={() => setPokjaOpen(!pokjaOpen)}
              >
                <span>Pokja & Unit Penunjang</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    pokjaOpen ? "rotate-180 text-skagata-700 dark:text-emerald-400" : "opacity-70"
                  }`}
                />
              </button>

              <div
                className={`absolute top-full left-0 w-72 pt-2 transition-all duration-200 z-50 ${
                  pokjaOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 space-y-0.5 text-xs">
                  <a
                    href="http://perpustakaan.smkn3jogja.sch.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Perpustakaan Widura</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Katalog Online OPAC & E-Library</span>
                  </a>
                  <a
                    href="https://bnsp.go.id/detaillsp?id=1008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">LSP P1 SMKN 3 Yogyakarta</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Sertifikasi Keahlian BNSP</span>
                  </a>
                  <a
                    href="http://smm.smkn3jogja.sch.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Sistem Penunjang Penjaminan Mutu</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">SPMI & Audit Mutu Internal</span>
                  </a>
                  <a
                    href="http://tefa.skagata.sch.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Badan Layanan Umum Daerah</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">BLUD & Teaching Factory (TEFA)</span>
                  </a>
                  <Link
                    href="/layanan"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Bimbingan dan Konseling</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Layanan Karir & Konsultasi Taruna</span>
                  </Link>
                  <Link
                    href="/layanan"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">PLIS! – ICT Center</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Pusat Layanan Informasi & Jaringan</span>
                  </Link>
                  <Link
                    href="/profil/visi-misi"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Kesiswaan</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Pembinaan Karakter & Ketarunaan</span>
                  </Link>
                  <Link
                    href="/kabar"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">OSIS</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Organisasi Siswa Intra Sekolah</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bursa Kerja SMK Link */}
            <Link
              href="/karir"
              className="px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl hover:text-skagata-700 dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition whitespace-nowrap"
            >
              Bursa Kerja SMK
            </Link>

            {/* Dropdown Layanan Digital (Sesuai Web Asli) */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl hover:text-skagata-700 dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 flex items-center gap-1 transition whitespace-nowrap"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Layanan Digital</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-skagata-700 dark:text-emerald-400" : "opacity-70"
                  }`}
                />
              </button>

              <div
                className={`absolute top-full left-0 w-64 pt-2 transition-all duration-200 z-50 ${
                  servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 space-y-0.5 text-xs">
                  <Link
                    href="/layanan"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Informasi Publik</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Keterbukaan Informasi & Regulasi</span>
                  </Link>
                  <a
                    href="https://forms.gle/4ieEgX1dudo8ULyV9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Legalisasi Ijasah</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Layanan Daring untuk Alumni</span>
                  </a>
                  <a
                    href="https://kamimendengar.skagata.sch.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Skagata Mendengar</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">WBS Kanal Pengaduan Aman</span>
                  </a>
                  <a
                    href="http://kelasiber.skagata.sch.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Daftar Ulang Siswa XI & XII</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Registrasi Berkala Tingkat Atas</span>
                  </a>
                  <Link
                    href="/kabar?category=SPMB"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Daftar Ulang Siswa Baru</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Alur & Syarat SPMB 2026</span>
                  </Link>
                  <Link
                    href="/kabar"
                    className="block px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-skagata-700 dark:hover:text-emerald-400 transition"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Kliping Media</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Liputan Media & Berita Terkini</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/kabar"
              className="px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl hover:text-skagata-700 dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition whitespace-nowrap"
            >
              Kabar & SPMB
            </Link>
          </nav>

          {/* Right Action: ThemeToggle + Search + SPMB + Mobile Trigger */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Dark/Light Mode Switcher */}
            <ThemeToggle />

            {/* Unified Search Button */}
            <button
              onClick={onOpenSearch}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-slate-600 dark:text-slate-300 hover:text-skagata-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-700 flex items-center justify-center transition"
              title="Cari portal, jurusan, berita atau guru (Ctrl+K)"
              aria-label="Cari"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* SPMB Quick Action */}
            <Link
              href="/kabar?category=SPMB"
              className="hidden sm:flex bg-gradient-to-r from-skagata-700 to-emerald-600 hover:from-skagata-800 hover:to-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition-all items-center gap-1.5 btn-bounce"
            >
              <span>SPMB 2026</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Morphing Hamburger Button */}
            <button
              onClick={onToggleDrawer}
              className="xl:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center focus:outline-none transition p-1.5 sm:p-2.5"
              aria-label="Buka Menu Navigasi"
            >
              <div className="w-5 h-4 flex flex-col justify-between relative">
                <span
                  className={`block h-0.5 w-full bg-slate-800 dark:bg-slate-200 rounded-full transition-all duration-300 ${
                    isDrawerOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-slate-800 dark:bg-slate-200 rounded-full transition-all duration-300 ${
                    isDrawerOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-slate-800 dark:bg-slate-200 rounded-full transition-all duration-300 ${
                    isDrawerOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
