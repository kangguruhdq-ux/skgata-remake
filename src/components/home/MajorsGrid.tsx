"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Video,
  Network,
  Compass,
  Hammer,
  Cpu,
  Zap,
  Car,
  Cog,
  Award,
} from "lucide-react";
import TiltCard from "@/components/3d/TiltCard";
import { MAJORS_DATA } from "@/lib/data-initial";
import { useCMS } from "@/lib/store";

export default function MajorsGrid() {
  const { majors } = useCMS();
  const majorList = majors && majors.length > 0 ? majors : MAJORS_DATA;

  const majorIconMap: Record<string, React.ElementType> = {
    BP: Video,
    TJKT: Network,
    DPIB: Compass,
    TKP: Hammer,
    TE: Cpu,
    TITL: Zap,
    TKRO: Car,
    TP: Cog,
  };

  const bottomLabels: Record<string, string> = {
    BP: "Studio Skagata TV",
    TJKT: "MikroTik Academy",
    DPIB: "BIM & Autodesk Standar",
    TKP: "Praktek Lapangan Riil",
    TE: "IoT & Automation Lab",
    TITL: "Standar PLN & Industri",
    TKRO: "Bengkel Standar APM",
    TP: "CNC Machining Center",
  };

  return (
    <section id="jurusan" className="py-16 lg:py-24 bg-slate-100/80 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with authentic Aksara Jawa */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-up">
          <span className="font-serif text-skagata-700 dark:text-emerald-400 text-2xl block mb-1 select-none font-medium">
            ꦥꦿꦺꦴꦒꦿꦩ꧀ꦏꦺꦪꦃꦭꦶꦪꦤ꧀
          </span>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            8 Program & Konsentrasi Keahlian Unggulan
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            Seluruh jurusan telah bersertifikasi LSP P1 BNSP dan terkoneksi dengan kemitraan industri modern.
          </p>
        </div>

        {/* Grid 8 Jurusan */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
          {majorList.map((major, idx) => {
            const revealClass = `reveal-zoom delay-${(idx % 4) + 1}`;
            const MajorIcon = majorIconMap[major.code] || Award;

            return (
              <TiltCard
                key={major.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group w-full ${revealClass}`}
              >
                {/* Image Header with Badge */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={major.coverImage}
                    alt={major.name}
                    width="400"
                    height="176"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Badge */}
                  <span
                    className={`absolute top-3 right-3 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md ${major.colorBadge}`}
                  >
                    {major.code}
                  </span>

                  {/* Aksara & Subtitle overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] text-emerald-300 font-serif block opacity-95">
                      {major.aksara}
                    </span>
                    <p className="text-[11px] font-semibold text-slate-200 truncate">
                      {major.tagline}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition leading-snug">
                      {major.name}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {major.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                      <MajorIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        {bottomLabels[major.code] || "Pusat Keunggulan"}
                      </span>
                    </div>

                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {major.totalStudents} Taruna
                    </span>
                  </div>
                </div>

                {/* Link Action */}
                <div className="p-3 pt-0 bg-slate-50 dark:bg-slate-900/50">
                  <Link
                    href={`/jurusan/${major.slug}`}
                    aria-label={`Detail Program Keahlian ${major.name}`}
                    className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 group-hover:shadow-sm"
                  >
                    <span>Detail Program Keahlian</span>
                    <span className="sr-only">: {major.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Smart Career Matcher Banner */}
        <div className="mt-12 bg-gradient-to-r from-skagata-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 reveal-up">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Vocational Career Matcher</span>
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              Masih Ragu Memilih 1 dari 8 Jurusan Unggulan?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jawab 5 pertanyaan santai seputar minat, hobi, dan mimpi karirmu. Sistem cerdas kami akan merekomendasikan program keahlian Skagata yang paling cocok untukmu!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/kuis-jurusan"
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-950/50 transition flex items-center justify-center gap-2 text-xs sm:text-sm btn-bounce"
            >
              <Compass className="w-4 h-4" />
              <span>Mulai Kuis Jurusan (5 Menit)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/program-keahlian"
              className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <span>Arsip Program Keahlian</span>
            </Link>
          </div>
        </div>

        {/* Bottom Explorer Action */}
        <div className="mt-8 text-center">
          <Link
            href="/jurusan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 hover:text-emerald-700 font-bold rounded-2xl shadow-sm transition btn-bounce text-xs sm:text-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Pelajari Komparasi Lengkap 8 Program Keahlian</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
