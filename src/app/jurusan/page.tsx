"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Award, ChevronRight } from "lucide-react";
import { MAJORS_DATA } from "@/lib/data-initial";
import { useCMS } from "@/lib/store";
import TiltCard from "@/components/3d/TiltCard";

export default function JurusanIndexPage() {
  const { majors } = useCMS();
  const majorList = majors && majors.length > 0 ? majors : MAJORS_DATA;

  return (
    <div className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 reveal-down">
          <Link href="/" className="hover:text-skagata-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800">8 Program Keahlian</span>
        </nav>

        {/* Title Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm mb-12 text-center max-w-4xl mx-auto reveal-up interactive-card">
          <span className="font-serif text-skagata-700 text-3xl block mb-2 font-medium">
            ꦥꦿꦺꦴꦒꦿꦩ꧀ꦏꦺꦪꦃꦭꦶꦪꦤ꧀
          </span>
          <h1 className="font-display font-black text-2xl sm:text-5xl text-slate-900 tracking-tight">
            8 Program Keahlian Unggulan Industri 4.0
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed font-light">
            Kurikulum berbasis industri, bersertifikat kompetensi nasional LSP P1 BNSP & sertifikasi internasional, didukung teaching factory dan jejaring karir global (Jepang & Modena).
          </p>
        </div>

        {/* Grid 8 Jurusan */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {majorList.map((major, idx) => (
            <TiltCard
              key={major.id}
              className={`bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition interactive-card flex flex-col justify-between group reveal-up delay-${(idx % 4) + 1}`}
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
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-skagata-700 transition">
                    <Link href={`/jurusan/${major.slug}`}>{major.name}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {major.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Kompetensi Kunci:
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">
                        {major.competencies && major.competencies.length > 0
                          ? major.competencies[0]
                          : "Standar Industri & BNSP"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/jurusan/${major.slug}`}
                  className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-skagata-700 text-skagata-800 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-between"
                >
                  <span>Lihat Detail Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
