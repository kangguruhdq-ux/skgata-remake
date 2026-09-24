"use client";

import React, { useState } from "react";
import {
  Shield,
  Lightbulb,
  Cpu,
  Landmark,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCw,
  HandMetal,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function PillarStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  const cycleNext = () => {
    if (isSwapping) return;
    setIsSwapping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % stackCards.length);
      setIsSwapping(false);
    }, 260);
  };

  const cyclePrev = () => {
    if (isSwapping) return;
    setIsSwapping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + stackCards.length) % stackCards.length);
      setIsSwapping(false);
    }, 260);
  };

  const jumpTo = (index: number) => {
    if (isSwapping || index === currentIndex) return;
    setIsSwapping(true);

    setTimeout(() => {
      setCurrentIndex(index);
      setIsSwapping(false);
    }, 260);
  };

  const getCardClass = (index: number) => {
    const rel = (index - currentIndex + stackCards.length) % stackCards.length;
    if (isSwapping && rel === 0) return "swapping-out";
    if (rel === 0) return "pos-0";
    if (rel === 1) return "pos-1";
    if (rel === 2) return "pos-2";
    return "pos-hidden";
  };

  const stackCards = [
    {
      id: 0,
      pillarNum: "01",
      name: "Ketarunaan",
      subtitle: "Disiplin, Kepemimpinan & Karakter Baja",
      title: "Ketarunaan (Disiplin & Integritas)",
      desc: "Pendidikan semi-militer humanis yang membina ketahanan fisik, kepemimpinan (leadership), loyalitas, ketepatan waktu, dan integritas moral yang sangat diidamkan industri nasional & internasional.",
      tags: ["Semi-Militer Humanis", "Karakter Baja", "Leadership"],
      footer: "Membentuk Karakter Mental Baja",
      icon: Shield,
      bgClass:
        "bg-gradient-to-br from-[#064e3b] via-[#022c22] to-[#041d17] border border-emerald-500/40 text-white",
      glowColor: "rgba(16, 185, 129, 0.35)",
      badgeColor: "text-emerald-300 bg-emerald-500/20 border border-emerald-400/40",
      iconBoxColor: "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      footerColor: "border-emerald-700/60 text-emerald-300",
      accentGlow: "from-emerald-500/20 via-transparent to-transparent",
    },
    {
      id: 1,
      pillarNum: "02",
      name: "Kewirausahaan",
      subtitle: "TEFA & BLUD Skagata Solutions Mandiri",
      title: "Kewirausahaan (TEFA & BLUD)",
      desc: "Teaching Factory (TEFA) dan Badan Layanan Umum Daerah (BLUD) Skagata Solutions melatih siswa menciptakan produk teknik bernilai jual, jasa servis riil, serta manajemen bisnis independen.",
      tags: ["BLUD Skagata Mandiri", "Teaching Factory", "Inovasi Produk Riil"],
      footer: "BLUD Skagata Solutions Mandiri",
      icon: Lightbulb,
      bgClass:
        "bg-gradient-to-br from-[#78350f] via-[#451a03] to-[#1c1917] border border-amber-400/40 text-white",
      glowColor: "rgba(245, 158, 11, 0.35)",
      badgeColor: "text-amber-300 bg-amber-500/20 border border-amber-400/40",
      iconBoxColor: "bg-amber-500/25 text-amber-300 border border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
      footerColor: "border-amber-600/60 text-amber-300",
      accentGlow: "from-amber-500/20 via-transparent to-transparent",
    },
    {
      id: 2,
      pillarNum: "03",
      name: "Teknologi 4.0",
      subtitle: "Fasilitas Industri Modern & Kelas Global",
      title: "Teknologi Terkini (Industri 4.0)",
      desc: "Fasilitas CNC Center, Lab Mikrotik & Fiber Optik, Lab IoT Robotika, BIM Architecture Revit, Studio TV Digital, hingga Kelas Industri MODENA Technical School berstandar internasional.",
      tags: ["MODENA Class", "CNC Machining", "MikroTik Academy"],
      footer: "Kurikulum Industri Global",
      icon: Cpu,
      bgClass:
        "bg-gradient-to-br from-[#0e7490] via-[#083344] to-[#021820] border border-cyan-400/40 text-white",
      glowColor: "rgba(6, 182, 212, 0.35)",
      badgeColor: "text-cyan-300 bg-cyan-500/20 border border-cyan-400/40",
      iconBoxColor: "bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
      footerColor: "border-cyan-700/60 text-cyan-300",
      accentGlow: "from-cyan-500/20 via-transparent to-transparent",
    },
    {
      id: 3,
      pillarNum: "04",
      name: "Budaya Luhur",
      subtitle: "Adab Keistimewaan D.I. Yogyakarta",
      title: "Budaya Luhur (Keistimewaan DIY)",
      desc: "Menjunjung tinggi adab Jawa, tata krama sopan santun, peringatan upacara adat Gagrag Ngayogyakarta berbusana adat Mataram, serta Festival Seni Tahunan Mangajapa.",
      tags: ["Adab Ngayogyakarta", "Upacara Gagrag Jawa", "Festival Mangajapa"],
      footer: "Kearifan Lokal Ngayogyakarta",
      icon: Landmark,
      bgClass:
        "bg-gradient-to-br from-[#581c87] via-[#2e1065] to-[#130722] border border-purple-400/40 text-white",
      glowColor: "rgba(168, 85, 247, 0.35)",
      badgeColor: "text-purple-300 bg-purple-500/20 border border-purple-400/40",
      iconBoxColor: "bg-purple-500/25 text-purple-300 border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]",
      footerColor: "border-purple-700/60 text-purple-300",
      accentGlow: "from-purple-500/20 via-transparent to-transparent",
    },
  ];

  return (
    <section id="pilar" className="py-12 sm:py-20 -mt-4 sm:-mt-8 relative z-20 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column: Explainer & Interactive Navigation Buttons */}
          <div className="lg:col-span-5 space-y-5 reveal-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100/90 dark:bg-emerald-950/70 px-3.5 py-1.5 rounded-xl border border-emerald-300/60 dark:border-emerald-700/50 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Swap Stack Deck 3D</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight tracking-tight">
              4 Pilar Fondasi Keunggulan Skagata
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              SMKN 3 Yogyakarta mendidik insan vokasi melalui harmonisasi kedisiplinan militer halus (taruna), jiwa enterpreneurship mandiri, teknologi industri mutakhir, dan budi pekerti budaya luhur.
            </p>

            {/* Pillar Selector Pills (Clickable direct jump) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {stackCards.map((card, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={card.id}
                    onClick={() => jumpTo(idx)}
                    className={`p-2.5 rounded-xl text-left transition-all duration-300 border flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-emerald-700 text-white border-emerald-600 shadow-md scale-[1.02]"
                        : "bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {card.pillarNum}
                    </span>
                    <span className="font-display font-bold text-xs truncate">
                      {card.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Swap & Step Controls */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-300/70 dark:border-slate-700">
                <button
                  onClick={cyclePrev}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-emerald-600 flex items-center justify-center shadow-sm transition active:scale-95"
                  title="Pilar sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={cycleNext}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-emerald-600 flex items-center justify-center shadow-sm transition active:scale-95"
                  title="Pilar berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={cycleNext}
                className="px-5 py-2.5 bg-gradient-to-r from-skagata-700 to-emerald-600 hover:from-skagata-800 hover:to-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 btn-bounce"
                title="Swap ke kartu berikutnya"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSwapping ? "animate-spin" : ""}`} />
                <span>Swap Kartu</span>
              </button>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Pilar {currentIndex + 1} dari {stackCards.length}
              </span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Card Stack Deck */}
          <div className="lg:col-span-7 relative card-stack-container reveal-zoom w-full max-w-full">
            {stackCards.map((pilar, idx) => {
              const IconComponent = pilar.icon;
              return (
                <div
                  key={pilar.id}
                  onClick={cycleNext}
                  className={`stack-card ${getCardClass(idx)} ${pilar.bgClass} p-6 sm:p-9 flex flex-col justify-between cursor-pointer relative overflow-hidden`}
                  title="Ketuk kartu untuk swap ke pilar berikutnya"
                >
                  {/* Subtle Background Watermark Icon for Depth */}
                  <div className="absolute -right-6 -bottom-6 opacity-[0.08] pointer-events-none transform rotate-12 scale-150">
                    <IconComponent className="w-64 h-64 text-white" />
                  </div>

                  {/* Ambient Gradient Glow Flare */}
                  <div
                    className={`absolute -top-24 -left-24 w-60 h-60 rounded-full bg-gradient-to-br ${pilar.accentGlow} blur-3xl pointer-events-none`}
                  />

                  {/* Card Header: Icon + Pillar Badge + Touch Hint */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center p-3 text-2xl ${pilar.iconBoxColor}`}>
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block ${pilar.badgeColor}`}>
                          PILAR {pilar.pillarNum}
                        </span>
                        <p className="text-[11px] text-white/70 font-medium mt-0.5">
                          {pilar.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-semibold backdrop-blur-sm border border-white/10 hover:bg-white/20 transition">
                      <RotateCw className="w-2.5 h-2.5" />
                      <span>Klik untuk swap</span>
                    </div>
                  </div>

                  {/* Card Main Body */}
                  <div className="my-4 relative z-10 space-y-3">
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug drop-shadow-sm">
                      {pilar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl font-normal">
                      {pilar.desc}
                    </p>

                    {/* Tag Highlights */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pilar.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-black/25 text-white/90 border border-white/15 backdrop-blur-sm"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Status & Next Hint */}
                  <div className={`pt-3.5 border-t flex items-center justify-between text-xs font-semibold relative z-10 ${pilar.footerColor}`}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span>{pilar.footer}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] opacity-90 group-hover:translate-x-1 transition-transform">
                      <span className="hidden sm:inline">Swap Pilar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
