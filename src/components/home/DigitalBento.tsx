"use client";

import React, { useState } from "react";
import TiltCard from "@/components/3d/TiltCard";

export default function DigitalBento() {
  const [filterQuery, setFilterQuery] = useState("");

  const portals = [
    {
      id: "kelulusan",
      name: "KELULUSAN",
      badge: "Tahun 2026",
      desc: "Informasi status kelulusan taruna-taruni tahun pelajaran 2025/2026.",
      actionText: "Buka portal",
      url: "https://kelulusansmk.my.id",
      cardClass:
        "portal-card p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-md hover:shadow-xl interactive-card flex flex-col justify-between group reveal-up delay-1",
      iconBox:
        "w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-lg backdrop-blur-sm",
      icon: "fa-solid fa-graduation-cap",
      badgeClass: "text-[10px] uppercase font-bold tracking-widest bg-black/25 px-2 py-0.5 rounded",
      linkClass: "text-emerald-100 group-hover:text-white",
    },
    {
      id: "kelasiber",
      name: "KELASIBER",
      badge: "E-Learning",
      desc: "Platform LMS resmi penugasan, modul ajar interaktif, dan ujian daring.",
      actionText: "Login Moodle",
      url: "http://kelasiber.skagata.sch.id",
      cardClass:
        "portal-card p-5 rounded-2xl bg-slate-900 text-white shadow-md hover:shadow-xl interactive-card flex flex-col justify-between group reveal-up delay-2",
      iconBox:
        "w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg",
      icon: "fa-solid fa-chalkboard-user",
      badgeClass: "text-[10px] uppercase font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded text-emerald-400",
      linkClass: "text-emerald-400 group-hover:text-emerald-300",
    },
    {
      id: "skagatatv",
      name: "SKAGATA TV",
      badge: "Live Studio",
      desc: "Kanal siaran resmi liputan kegiatan, tutorial teknik, dan pentas karya siswa.",
      actionText: "Tonton Channel",
      url: "https://www.youtube.com/c/SkagataTV/videos",
      cardClass:
        "portal-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-300 interactive-card flex flex-col justify-between group reveal-up delay-3",
      iconBox:
        "w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg group-hover:bg-red-600 group-hover:text-white transition",
      icon: "fa-solid fa-tv",
      badgeClass: "text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100",
      linkClass: "text-red-600",
    },
    {
      id: "opac",
      name: "OPAC Widura",
      badge: "Perpustakaan",
      desc: "Katalog online pencarian buku cetak & digital library Perpustakaan Widura.",
      actionText: "Telusuri Buku",
      url: "http://opac.smkn3jogja.sch.id:5776/",
      cardClass:
        "portal-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-skagata-500 interactive-card flex flex-col justify-between group reveal-up delay-4",
      iconBox:
        "w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg group-hover:bg-amber-600 group-hover:text-white transition",
      icon: "fa-solid fa-book-open",
      badgeClass: "text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100",
      linkClass: "text-amber-700",
    },
    {
      id: "dapodik",
      name: "DAPODIK",
      badge: "Kemdikbud",
      desc: "Sinkronisasi Data Pokok Pendidikan pendidik, tenaga kependidikan, dan murid.",
      actionText: "Akses Server",
      url: "http://sia.smkn3jogja.sch.id:5774",
      cardClass:
        "portal-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 interactive-card flex flex-col justify-between group reveal-up delay-1",
      iconBox:
        "w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg group-hover:bg-blue-600 group-hover:text-white transition",
      icon: "fa-solid fa-database",
      badgeClass: "text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded",
      linkClass: "text-blue-700",
    },
    {
      id: "rspk",
      name: "RSPK",
      badge: "Pusat Keunggulan",
      desc: "Rapot SMK Pusat Keunggulan, evaluasi capaian kompetensi vokasi terstandarisasi.",
      actionText: "Buka RSPK",
      url: "http://sia.smkn3jogja.sch.id:7252",
      cardClass:
        "portal-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300 interactive-card flex flex-col justify-between group reveal-up delay-2",
      iconBox:
        "w-11 h-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-lg group-hover:bg-teal-600 group-hover:text-white transition",
      icon: "fa-solid fa-award",
      badgeClass: "text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded",
      linkClass: "text-teal-700",
    },
    {
      id: "mpd",
      name: "MPD (Penilaian)",
      badge: "Nilai Digital",
      desc: "Manajemen Penilaian Digital untuk guru, wali kelas, dan rekapitulasi nilai rapor.",
      actionText: "Akses MPD",
      url: "http://sia.smkn3jogja.sch.id:3780/",
      cardClass:
        "portal-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 interactive-card flex flex-col justify-between group reveal-up delay-3",
      iconBox:
        "w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg group-hover:bg-purple-600 group-hover:text-white transition",
      icon: "fa-solid fa-calculator",
      badgeClass: "text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded",
      linkClass: "text-purple-700",
    },
    {
      id: "paperless",
      name: "PAPERLESS CLOUD",
      badge: "Cloud Data",
      desc: "Penyimpanan arsip digital sekolah, kurikulum, dan administrasi perkantoran efisien.",
      actionText: "Cloud Storage",
      url: "http://cloud.skagata.sch.id:9070/",
      cardClass:
        "portal-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 interactive-card flex flex-col justify-between group reveal-up delay-4",
      iconBox:
        "w-11 h-11 rounded-xl bg-emerald-100 text-skagata-700 flex items-center justify-center text-lg group-hover:bg-skagata-700 group-hover:text-white transition",
      icon: "fa-solid fa-cloud-arrow-up",
      badgeClass: "text-[10px] font-bold text-skagata-700 bg-emerald-50 px-2 py-0.5 rounded",
      linkClass: "text-skagata-700",
    },
  ];

  const filteredPortals = portals.filter(
    (s) =>
      s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.badge.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section id="layanan-digital" className="py-14 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header with search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 reveal-up">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-skagata-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 mb-2">
              <i className="fa-solid fa-laptop-code" />
              <span>Smart Digital Campus</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
              Ekosistem Layanan Digital Terpadu
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Akses langsung seluruh portal akademik, administrasi paperless, dan perpustakaan digital SMKN 3 Yogyakarta.
            </p>
          </div>

          {/* Filter Search for digital portals */}
          <div className="mt-4 md:mt-0 relative w-full sm:w-72">
            <input
              type="text"
              id="portalSearch"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Cari layanan digital..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-9 focus:outline-none focus:ring-2 focus:ring-skagata-500 focus:bg-white transition shadow-sm"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs" />
          </div>
        </div>

        {/* Bento Grid Cards */}
        <div id="portalGrid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
          {filteredPortals.map((portal) => (
            <TiltCard key={portal.id} className="rounded-2xl h-full">
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${portal.cardClass} h-full`}
              >
                <div className="flex items-center justify-between">
                  <div className={portal.iconBox}>
                    <i className={portal.icon} />
                  </div>
                  <span className={portal.badgeClass}>{portal.badge}</span>
                </div>
                <div className="mt-5">
                  <h3 className="font-display font-bold text-base">{portal.name}</h3>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      portal.id === "kelulusan"
                        ? "text-emerald-100"
                        : portal.id === "kelasiber"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    {portal.desc}
                  </p>
                </div>
                <div className={`mt-4 flex items-center gap-2 text-xs font-semibold ${portal.linkClass}`}>
                  <span>{portal.actionText}</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
