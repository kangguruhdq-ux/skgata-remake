"use client";

import React from "react";
import Link from "next/link";
import { Wrench, ChevronRight, CheckCircle } from "lucide-react";
import { useCMS } from "@/lib/store";

export default function FasilitasPage() {
  const { facilities } = useCMS();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 lg:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8 reveal-down">
          <Link href="/" className="hover:text-skagata-700 dark:hover:text-emerald-400">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Profil</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Fasilitas Bengkel & Sarana
          </span>
        </nav>

        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-10 text-center max-w-3xl mx-auto reveal-up interactive-card">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg border border-emerald-200/50 dark:border-emerald-800/40">
            Infrastruktur Berstandar Industri
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white mt-2">
            Sarana & Prasarana Bengkel Kejuruan
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 font-light">
            Menghadirkan lingkungan praktik nyata berstandar industri modern (DUDIKA) demi menunjang penguasaan kompetensi taruna-taruni SMKN 3 Yogyakarta.
          </p>
        </div>

        {/* Grid Fasilitas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={fac.id || idx}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition interactive-card flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <span className="absolute top-3 left-3 bg-skagata-900/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-emerald-500/30">
                    {fac.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-skagata-700 dark:group-hover:text-emerald-400 transition">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-light">
                    {fac.desc}
                  </p>

                  {fac.equipment && fac.equipment.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
                      {fac.equipment.map((eq, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-mono"
                        >
                          ✓ {eq}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Standar Sertifikasi DUDIKA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
