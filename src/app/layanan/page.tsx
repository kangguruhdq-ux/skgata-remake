"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Laptop,
  GraduationCap,
  School,
  Tv,
  BookOpen,
  Database,
  Award,
  Calculator,
  Cloud,
  ChevronRight,
  ExternalLink,
  Search,
  ShieldCheck,
  Megaphone,
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/data-initial";

export default function LayananPage() {
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const extraServices = [
    {
      id: "srv-legalisir",
      name: "Legalisasi Ijazah Online",
      badge: "Alumni",
      description: "Layanan permohonan legalisir ijazah dan transkrip nilai secara daring untuk alumni STM 2 Jetis.",
      url: "https://forms.gle/4ieEgX1dudo8ULyV9",
      icon: "ShieldCheck",
      category: "Administrasi",
    },
    {
      id: "srv-lsp",
      name: "LSP P1 SMKN 3 Yogyakarta",
      badge: "BNSP",
      description: "Portal Lembaga Sertifikasi Profesi Pihak Pertama terlisensi resmi Badan Nasional Sertifikasi Profesi.",
      url: "https://bnsp.go.id/detaillsp?id=1008",
      icon: "Award",
      category: "Akademik",
    },
    {
      id: "srv-jamu",
      name: "SIMPAN JAMU Mutu",
      badge: "Penjaminan Mutu",
      description: "Sistem Informasi Manajemen Penjaminan Mutu Internal pendidikan kejuruan berstandar ISO.",
      url: "http://smm.smkn3jogja.sch.id/",
      icon: "Database",
      category: "Administrasi",
    },
    {
      id: "srv-mendengar",
      name: "Skagata Mendengar (WBS)",
      badge: "Whistleblowing",
      description: "Kanal pengaduan aman dan aspirasi taruna, orang tua, dan masyarakat terbebas dari perundungan.",
      url: "https://kamimendengar.skagata.sch.id/",
      icon: "Megaphone",
      category: "Aspirasi",
    },
  ];

  const allServices = [
    ...SERVICES_DATA.map((s) => ({
      ...s,
      category: s.category === "LMS" || s.category === "Nilai" ? "Akademik" : s.category,
    })),
    ...extraServices,
  ];

  const categories = ["Semua", "Akademik", "Perpustakaan", "Cloud", "Aspirasi", "Administrasi"];

  const filtered = allServices.filter((s) => {
    const matchesCat = filterCategory === "Semua" || s.category === filterCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.badge.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-skagata-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800">Layanan Digital</span>
        </nav>

        {/* Title Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg w-fit mb-2">
                <Laptop className="w-4 h-4" />
                <span>Integrated Campus Portals</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
                Pusat Layanan Digital & Informasi Publik
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Direktori satu pintu seluruh sistem akademik, administrasi paperless, pelaporan WBS, dan perpustakaan SMKN 3 Yogyakarta.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari portal layanan..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-skagata-500 focus:bg-white transition"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition ${
                  filterCategory === cat
                    ? "bg-skagata-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((srv) => (
            <a
              key={srv.id}
              href={srv.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-400 transition interactive-card flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {srv.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {srv.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-skagata-700 transition">
                  {srv.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-skagata-700 group-hover:text-skagata-900">
                <span>Buka Layanan</span>
                <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
