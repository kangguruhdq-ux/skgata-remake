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
                  src={
                    greeting.photo && !greeting.photo.includes("unsplash.com")
                      ? greeting.photo
                      : "https://smkn3jogja.sch.id/wp-content/uploads/2025/03/Widada_KS-scaled.jpg"
                  }
                  alt="Widada, S.Pd, M.Pd - Kepala SMKN 3 Yogyakarta"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-bold bg-skagata-900/90 py-1 px-2 rounded-lg backdrop-blur-sm border border-emerald-500/30">
                  {greeting.subtitle}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                  Widada, S.Pd, M.Pd
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Kepala Sekolah SMK Negeri 3 Yogyakarta
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Pusat Keunggulan STM 2 Jetis
                </p>
              </div>

              <div className="mt-4 w-full bg-emerald-50 dark:bg-emerald-950/50 p-3.5 rounded-2xl border border-emerald-200/70 dark:border-emerald-800/40 text-left text-xs text-skagata-900 dark:text-emerald-300 space-y-2 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-skagata-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Prinsip Kepemimpinan:</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  "Kerja keras, kerja cerdas, kerja tuntas, kerja berkualitas dan kerja ikhlas untuk mensukseskan masa depan peserta didik."
                </p>
              </div>
            </div>

            {/* Editorial Speech Body */}
            <div className="flex-1 space-y-5 text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base font-normal">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800/40">
                  Editorial Sambutan
                </span>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-2">
                  Sambutan Kepala Sekolah
                </h1>
              </div>

              <div className="relative pl-6 italic font-medium text-slate-800 dark:text-slate-100 border-l-3 border-emerald-500 text-sm sm:text-base bg-emerald-50/40 dark:bg-emerald-950/20 py-3 pr-4 rounded-r-xl">
                <Quote className="w-5 h-5 text-emerald-500 absolute -top-1 -left-2.5 fill-emerald-500" />
                <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                  Assalamualaikum Warrahmatullahi Wabarakatuh
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-0.5">
                  Salam sejahtera bagi kita semua
                </p>
              </div>

              <p className="leading-relaxed">
                Era revolusi Industri 4.0 menuju ke 5.0 dengan ditandainya kemajuan ilmu pengetahuan dan teknologi digital yang pesat serta perubahannya dalam hitungan detik akan berimbas pada aspek kehidupan masyarakat, karenanya harus ada upaya sungguh-sungguh untuk mengantisipasinya dan mengikutinya.
              </p>

              <p className="leading-relaxed">
                Dunia pendidikan mempunyai tanggung jawab yang besar untuk menyiapkan sumber daya manusia yang mumpuni, kompetitif dan unggul sehingga mampu hidup dengan perubahan yang ada tetap menjaga nilai-nilai kearifan budaya lokal.
              </p>

              <p className="leading-relaxed">
                Pendidikan investasi masa depan, sekolah sebagai sarana untuk mengembangkan minat, bakat dan potensi serta membekali karakter, pengetahuan dan keterampilan untuk menyongsong permasalahan kekinian. Mari kita Kerja keras, kerja cerdas, kerja tuntas, kerja berkualitas dan kerja ikhlas untuk mensukseskan masa depan peserta didik.
              </p>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    Wassalamualaikum Warrahmatullahi Wabarakatuh
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Yogyakarta, SMK Negeri 3 Yogyakarta
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Kepala Sekolah</span>
                  <span className="font-display font-black text-slate-900 dark:text-emerald-300 text-base sm:text-lg block">
                    Widada, S.Pd, M.Pd
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
