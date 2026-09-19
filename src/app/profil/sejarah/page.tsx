"use client";

import React from "react";
import Link from "next/link";
import { History, Calendar, ChevronRight, Sparkles, Award, Landmark } from "lucide-react";
import { useCMS } from "@/lib/store";

export default function SejarahPage() {
  const { timeline, archivePhotos, profile } = useCMS();
  const hero = profile?.historyHero || {
    badge: "Rekam Jejak Kejuruan Sejak 1952",
    title: "Perjalanan Sejarah SMK Negeri 3 Yogyakarta (STM 2 Jetis)",
    subtitle:
      "Menelusuri lebih dari tujuh dekade dedikasi tanpa henti dalam mencetak ratusan ribu teknisi handal, insinyur, akademisi, dan pemimpin industri yang mewarnai pembangunan infrastruktur dan manufaktur Indonesia.",
    image:
      "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg",
    imageTag: "Arsip Tradisi Skagata",
    imageCaption: "Semarak Perayaan 61 Tahun Festa Mangajapa",
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 lg:py-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8 reveal-down">
          <Link href="/" className="hover:text-skagata-700 dark:hover:text-emerald-400">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/profil" className="hover:text-skagata-700 dark:hover:text-emerald-400">
            Profil
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Sejarah STM 2 Jetis
          </span>
        </nav>

        {/* Title Header with Heritage Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-10 reveal-up interactive-card overflow-hidden">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg w-fit border border-emerald-200/50 dark:border-emerald-800/40">
                <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{hero.badge}</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                {hero.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {hero.subtitle}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  📍 Jl. R.W. Monginsidi No. 2, Jetis
                </span>
                <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  🏛️ Sekolah Teknik Tertua di Jogja
                </span>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 aspect-[4/3] bg-slate-900 group">
                <img
                  src={hero.image}
                  alt={hero.imageCaption || hero.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                    {hero.imageTag}
                  </span>
                  <p className="text-xs font-semibold">{hero.imageCaption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Vintage Archive Gallery Section */}
        {archivePhotos.length > 0 && (
          <div className="mb-14 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                  Galeri Foto Arsip & Heritage
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white mt-0.5">
                  Dokumentasi Autentik STM 2 Jetis
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                {archivePhotos.length} Arsip Terpilih
              </span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {archivePhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-md transition"
                >
                  <div className="relative h-40 rounded-xl overflow-hidden bg-slate-900 mb-2.5">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-2 left-2 bg-slate-900/85 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-sm border border-emerald-500/30">
                      {photo.year}
                    </span>
                    <span className="absolute bottom-2 left-2 bg-emerald-600/90 text-white text-[9.5px] font-bold px-2 py-0.5 rounded">
                      {photo.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Milestones Timeline */}
        <div className="space-y-4 mb-6">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            Garis Waktu Perjalanan
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
            Tonggak Perkembangan Sejak Era 1952
          </h2>
        </div>

        <div className="relative border-l-2 border-emerald-500/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {timeline.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`relative timeline-item interactive-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all ${
                idx % 2 === 0 ? "reveal-left" : "reveal-right"
              }`}
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-5 h-5 rounded-full bg-skagata-700 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center animate-pulse-glow">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-display font-extrabold text-lg sm:text-xl text-skagata-800 dark:text-emerald-400">
                    {item.year}
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100/70 dark:bg-emerald-950/60 text-skagata-800 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                  {item.badge}
                </span>
              </div>

              <h2 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed font-light">
                {item.description}
              </p>

              {item.image && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-64">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
