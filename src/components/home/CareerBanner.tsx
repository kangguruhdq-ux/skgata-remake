"use client";

import React from "react";
import Link from "next/link";

export default function CareerBanner() {
  return (
    <section id="karir" className="py-14 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-skagata-900 via-skagata-800 to-teal-900 rounded-3xl p-7 sm:p-10 text-white relative overflow-hidden shadow-2xl reveal-up">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <i className="fa-solid fa-briefcase text-9xl text-white" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              Skagata Career Center
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl">
              Bursa Kerja Khusus (BKK) & Jejaring Karir Alumni
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Menghubungkan langsung lulusan SMKN 3 Yogyakarta dengan ratusan industri bonafide dalam dan luar negeri, program magang teknisi Jepang, sertifikasi BNSP, hingga rekrutmen kerja cepat.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/karir"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg btn-bounce"
              >
                <i className="fa-solid fa-magnifying-glass" />
                <span>Telusuri Lowongan Kerja</span>
              </Link>
              <a
                href="https://bursakerjasmk.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-xs transition flex items-center gap-2 btn-bounce"
              >
                <i className="fa-solid fa-building" />
                <span>Portal Bursa Kerja SMK</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
