"use client";

import React from "react";
import Link from "next/link";
import { Quote, ShieldCheck, ChevronRight } from "lucide-react";
import { useCMS } from "@/lib/store";

export default function SambutanPage() {
  const { profile } = useCMS();
  const greeting = profile.headmasterGreeting;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 lg:py-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8 reveal-down">
          <Link href="/" className="hover:text-skagata-700 dark:hover:text-emerald-400">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Profil</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Sambutan Kepala Sekolah
          </span>
        </nav>

        {/* Editorial Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden interactive-card">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Portrait & Badge */}
            <div className="w-full lg:w-72 flex-shrink-0 flex flex-col items-center text-center">
              <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 bg-slate-900 group">
                <img
                  src={greeting.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                  alt="Kepala SMKN 3 Yogyakarta"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-bold bg-skagata-900/90 py-1 px-2 rounded-lg backdrop-blur-sm border border-emerald-500/30">
                  {greeting.subtitle}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                  {greeting.subtitle}
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Kepala SMK Negeri 3 Yogyakarta
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  NIP. 19680512 199403 1 008
                </p>
              </div>

              <div className="mt-4 w-full bg-emerald-50 dark:bg-emerald-950/50 p-3.5 rounded-2xl border border-emerald-200/70 dark:border-emerald-800/40 text-left text-xs text-skagata-900 dark:text-emerald-300 space-y-2 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-skagata-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Prinsip Kepemimpinan:</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  "Mengharmonisasikan kecakapan teknologi industri 4.0, kedisiplinan berkarakter taruna, dan budi pekerti luhur keistimewaan D.I. Yogyakarta."
                </p>
              </div>
            </div>

            {/* Editorial Speech Body */}
            <div className="flex-1 space-y-5 text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base font-light">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800/40">
                  Editorial Sambutan
                </span>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-2">
                  {greeting.title}
                </h1>
              </div>

              <div className="relative pl-6 italic text-slate-600 dark:text-slate-300 border-l-2 border-emerald-500 text-sm">
                <Quote className="w-5 h-5 text-emerald-500 absolute -top-1 -left-2.5 fill-emerald-500" />
                "Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera, Rahayu, Berkah Dalem."
              </div>

              {greeting.content.map((par, i) => (
                <p key={i} className="leading-relaxed">
                  {par}
                </p>
              ))}

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    Wassalamu’alaikum Warahmatullahi Wabarakatuh.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Yogyakarta, Kampus STM 2 Jetis
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-skagata-700 dark:text-emerald-400 text-base sm:text-lg block">
                    {greeting.subtitle}
                  </span>
                  <span className="text-[10px] text-slate-400">Kepala SMKN 3 Yogyakarta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
