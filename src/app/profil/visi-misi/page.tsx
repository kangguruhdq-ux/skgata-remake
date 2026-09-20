"use client";

import React from "react";
import Link from "next/link";
import { Compass, Target, Shield, Heart, ChevronRight, CheckCircle, Award } from "lucide-react";
import { useCMS } from "@/lib/store";

export default function VisiMisiPage() {
  const { profile } = useCMS();

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
            Visi & Misi
          </span>
        </nav>

        {/* Title Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-10 text-center max-w-3xl mx-auto reveal-up interactive-card">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-200/50 dark:border-emerald-800/40">
            Haluan Mutu Pendidikan
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white mt-2">
            Visi, Misi & Falsafah SKAGATA
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 font-light">
            Pedoman arah pengembangan sumber daya manusia vokasi SMKN 3 Yogyakarta menuju keunggulan teknis, karakter taruna, dan budaya luhur.
          </p>
        </div>

        {/* Visi Card */}
        <div className="bg-gradient-to-br from-skagata-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden interactive-card border border-emerald-500/20">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-emerald-300 border border-white/20">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest text-emerald-300">
                  Visi Resmi Sekolah
                </span>
              </div>

              <blockquote className="font-display font-extrabold text-lg sm:text-2xl leading-relaxed text-emerald-50">
                "{profile.vision}"
              </blockquote>

              <p className="text-xs text-slate-300 font-light">
                Ditegakkan melalui perpaduan disiplin ketarunaan semi-militer humanis dan keluhuran budaya adab Jawa Gagrag Ngayogyakarta.
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-md border border-white/20 aspect-[4/3] bg-slate-950/80 group flex items-center justify-center p-6">
                <img
                  src="/media/school/logo.webp"
                  alt="Lambang Kehormatan SMK Negeri 3 Yogyakarta"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Misi Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-10 interactive-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-skagata-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block">
                Misi Sekolah
              </span>
              <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                Komitmen Strategis SMKN 3 Yogyakarta
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {profile.missions.map((misi, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800">
                  {index + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                  {misi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Nilai Karakter Ketarunaan Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Pondasi Mental & Moral Taruna
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white mt-1">
              7 Nilai Luhur Pendidikan Berkarakter Ketarunaan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl mx-auto">
              Membentuk teknisi tangguh yang tidak hanya ahli rekayasa teknologi, tetapi juga berintegritas dan berbudi pekerti mulia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.ketarunaanValues.map((val) => (
              <div
                key={val.number}
                className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-xs shadow-sm">
                    {val.number}
                  </span>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {val.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
