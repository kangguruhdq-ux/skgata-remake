"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  User,
  Calendar,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  List,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { MAJORS_DATA } from "@/lib/data-initial";
import { useCMS } from "@/lib/store";
import TiltCard from "@/components/3d/TiltCard";

export default function ProgramKeahlianPage() {
  const { majors } = useCMS();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const majorList = majors && majors.length > 0 ? majors : MAJORS_DATA;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8 reveal-down">
          <Link href="/" className="hover:text-skagata-700 dark:hover:text-emerald-400 transition">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800 dark:text-white">
            Program Keahlian
          </span>
        </nav>

        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm mb-10 text-center max-w-4xl mx-auto reveal-up">
          <span className="font-serif text-skagata-700 dark:text-emerald-400 text-2xl sm:text-3xl block mb-2 font-medium">
            ꦥꦿꦺꦴꦒꦿꦩ꧀ꦏꦺꦪꦃꦭꦶꦪꦤ꧀
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight">
            Program Keahlian
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed font-light">
            SMK Negeri 3 Yogyakarta menyelenggarakan 8 program keahlian vokasi unggulan dengan kurikulum link-and-match industri dunia (Jepang, Daikin, MODENA, Astra), berkarakter ketarunaan dan sertifikasi BNSP.
          </p>

          {/* View Mode Toggle */}
          <div className="mt-6 inline-flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-700 text-skagata-800 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Format Arsip Web Asli</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 text-skagata-800 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid 3D Modern</span>
            </button>
          </div>
        </div>

        {/* 1. AUTHENTIC POST-FEED LIST VIEW (Matching the official web dump) */}
        {viewMode === "list" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {majorList.map((major, idx) => (
              <article
                key={major.id}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start animate-fade-in-up"
              >
                {/* Thumbnail Image */}
                <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 relative group">
                  <img
                    src={major.coverImage}
                    alt={major.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow uppercase tracking-wider ${major.colorBadge}`}>
                    {major.code}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    {/* Category Label */}
                    <div className="mb-2">
                      <span className="inline-block bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider border border-emerald-300 dark:border-emerald-700/50">
                        Program Keahlian
                      </span>
                    </div>

                    {/* Major Title */}
                    <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight hover:text-skagata-700 dark:hover:text-emerald-400 transition-colors">
                      <Link href={`/jurusan/${major.slug}`}>
                        {major.name}
                      </Link>
                    </h2>

                    {/* Author & Published Date (Matching authentic post metadata) */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-400 mt-2 mb-3">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-emerald-500" />
                        <span>By Skagata</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>16 Mei 2014</span>
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {major.description}
                    </p>
                  </div>

                  {/* Button: [Selengkapnya <Nama Jurusan>] */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={`/jurusan/${major.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-skagata-800 hover:bg-skagata-900 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm group"
                    >
                      <span>Selengkapnya {major.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 2. GRID 3D MODERN VIEW */}
        {viewMode === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorList.map((major, idx) => (
              <div
                key={major.id}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="animate-fade-in-up"
              >
                <TiltCard
                  className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition flex flex-col justify-between group h-full"
                >
                <div>
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img
                      src={major.coverImage}
                      alt={major.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                    <span className={`absolute top-3 right-3 text-white text-xs font-bold px-2.5 py-0.5 rounded-lg shadow ${major.colorBadge}`}>
                      {major.code}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-emerald-300 font-serif block opacity-90">
                        {major.aksara}
                      </span>
                      <p className="text-xs font-semibold truncate text-slate-200">{major.tagline}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      Program Keahlian
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-skagata-700 dark:group-hover:text-emerald-400 transition">
                      <Link href={`/jurusan/${major.slug}`}>{major.name}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {major.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/jurusan/${major.slug}`}
                    className="w-full py-2.5 px-3 bg-emerald-50 dark:bg-slate-800 hover:bg-skagata-700 hover:text-white dark:hover:bg-emerald-600 text-skagata-800 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-between"
                  >
                    <span>Selengkapnya {major.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
