"use client";

import React, { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useCMS } from "@/lib/store";

export default function TokohQuotes() {
  const { tokohQuotes } = useCMS();
  const [activeIndex, setActiveIndex] = useState(0);

  const quotesList = tokohQuotes && tokohQuotes.length > 0 ? tokohQuotes : [];

  const prevTokoh = () => {
    if (quotesList.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? quotesList.length - 1 : prev - 1));
  };

  const nextTokoh = () => {
    if (quotesList.length === 0) return;
    setActiveIndex((prev) => (prev === quotesList.length - 1 ? 0 : prev + 1));
  };

  if (quotesList.length === 0) return null;

  const safeIndex = activeIndex % quotesList.length;
  const active = quotesList[safeIndex];

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden w-full max-w-full bg-slate-50 dark:bg-skagata-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-skagata-800 transition-colors duration-300">
      {/* Background Decorative Pattern & Gradient Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 dark:bg-amber-600/15 blur-3xl pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-up delay-1">
          <span className="font-serif text-skagata-700 dark:text-skagata-goldlight text-lg tracking-widest block mb-1 font-semibold">
            ꦥꦼꦱꦤ꧀ꦠꦺꦴꦏꦺꦴꦃ
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Pesan & Sambutan Tokoh
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Pandangan dan apresiasi para tokoh bangsa terhadap kontribusi SMKN 3 Yogyakarta bagi pendidikan vokasi nasional.
          </p>
        </div>

        {/* Featured Quote Card & Carousel */}
        <div className="max-w-4xl mx-auto reveal-up delay-2">
          <div className="relative bg-white dark:bg-gradient-to-br dark:from-skagata-900/95 dark:to-slate-900/95 rounded-3xl border border-slate-200 dark:border-skagata-700/80 p-6 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all duration-300">
            {/* Top Quote Icon & Badge & Navigation */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-skagata-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-skagata-800/90 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 inline-block mb-1">
                    {active.badge}
                  </span>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Kutipan Resmi
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTokoh}
                  aria-label="Tokoh sebelumnya"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-skagata-800/80 dark:hover:bg-emerald-600 border border-slate-200 dark:border-skagata-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition flex items-center justify-center shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTokoh}
                  aria-label="Tokoh berikutnya"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-skagata-800/80 dark:hover:bg-emerald-600 border border-slate-200 dark:border-skagata-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition flex items-center justify-center shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quote Body */}
            <blockquote className="text-base sm:text-xl md:text-2xl text-slate-800 dark:text-slate-100 font-light leading-relaxed italic mb-8">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            {/* Tokoh Identity Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-skagata-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-2xl bg-slate-100 dark:bg-skagata-900 overflow-hidden flex items-center justify-center">
                    <img
                      src={active.image}
                      alt={active.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-black text-base sm:text-lg text-slate-900 dark:text-white">
                    {active.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-bold">
                    {active.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {active.organization}
                  </p>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                {quotesList.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === safeIndex
                        ? "w-8 bg-emerald-600 dark:bg-emerald-400"
                        : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500"
                    }`}
                    title={t.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Cards Below for Desktop Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto reveal-up delay-3">
          {quotesList.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                idx === safeIndex
                  ? "bg-white dark:bg-skagata-800/90 border-emerald-500 shadow-md shadow-emerald-500/10 dark:shadow-emerald-950/50"
                  : "bg-white/70 dark:bg-skagata-900/40 border-slate-200 dark:border-skagata-800/80 hover:bg-white dark:hover:bg-skagata-800/50 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    idx === safeIndex
                      ? "bg-emerald-600 dark:bg-emerald-400 animate-pulse"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                />
                <div className="truncate">
                  <h4
                    className={`text-xs font-bold truncate ${
                      idx === safeIndex
                        ? "text-slate-900 dark:text-white font-black"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {t.name}
                  </h4>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {t.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
