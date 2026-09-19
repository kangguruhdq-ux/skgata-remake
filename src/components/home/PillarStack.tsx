"use client";

import React, { useState } from "react";
import { RotateCw, Shield, Lightbulb, Cpu, Landmark, Sparkles, ChevronRight } from "lucide-react";
import { PILLARS_DATA } from "@/lib/data-initial";

export default function PillarStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  const cycleStack = () => {
    if (isSwapping) return;
    setIsSwapping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % PILLARS_DATA.length);
      setIsSwapping(false);
    }, 300);
  };

  const getCardClass = (index: number) => {
    const rel = (index - currentIndex + PILLARS_DATA.length) % PILLARS_DATA.length;
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
      title: "Ketarunaan (Disiplin & Integritas)",
      desc: "Pendidikan semi-militer humanis yang membina ketahanan fisik, kepemimpinan (leadership), loyalitas, ketepatan waktu, dan integritas moral yang sangat diidamkan industri internasional.",
      footer: "Membentuk Karakter Mental Baja",
      iconClass: "fa-solid fa-person-military-pointing",
      footerIconClass: "fa-solid fa-shield-halved",
      bgClass: "bg-gradient-to-br from-emerald-900 to-skagata-900 border-emerald-500/30 text-white",
      badgeColor: "text-emerald-300 bg-white/10",
      iconBoxColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
      footerColor: "border-emerald-700/50 text-emerald-300",
    },
    {
      id: 1,
      pillarNum: "02",
      title: "Kewirausahaan (TEFA & BLUD)",
      desc: "Teaching Factory (TEFA) dan Badan Layanan Umum Daerah (BLUD) Skagata Solutions melatih siswa menciptakan produk bernilai jual, service teknik riil, serta manajemen bisnis independen.",
      footer: "BLUD Skagata Solutions Mandiri",
      iconClass: "fa-solid fa-lightbulb",
      footerIconClass: "fa-solid fa-handshake",
      bgClass: "bg-gradient-to-br from-amber-700 to-amber-900 border-amber-400/30 text-white",
      badgeColor: "text-amber-300 bg-white/10",
      iconBoxColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
      footerColor: "border-amber-600/50 text-amber-300",
    },
    {
      id: 2,
      pillarNum: "03",
      title: "Teknologi Terkini (Industri 4.0)",
      desc: "Fasilitas CNC Center, Lab Mikrotik & Fiber Optik, Lab IoT Robotika, BIM Architecture Revit, Studio TV Digital, hingga Kelas Industri MODENA Technical School.",
      footer: "Kurikulum Industri Global",
      iconClass: "fa-solid fa-microchip",
      footerIconClass: "fa-solid fa-server",
      bgClass: "bg-gradient-to-br from-cyan-900 to-blue-950 border-cyan-400/30 text-white",
      badgeColor: "text-cyan-300 bg-white/10",
      iconBoxColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
      footerColor: "border-cyan-700/50 text-cyan-300",
    },
    {
      id: 3,
      pillarNum: "04",
      title: "Budaya Luhur (Keistimewaan DIY)",
      desc: "Menjunjung tinggi adab Jawa, tata krama sopan santun, peringatan upacara adat Gagrag Ngayogyakarta, dan Festival Seni Tahunan Mangajapa.",
      footer: "Kearifan Lokal Ngayogyakarta",
      iconClass: "fa-solid fa-monument",
      footerIconClass: "fa-solid fa-heart",
      bgClass: "bg-gradient-to-br from-purple-950 to-slate-900 border-purple-400/30 text-white",
      badgeColor: "text-purple-300 bg-white/10",
      iconBoxColor: "bg-purple-500/20 text-purple-300 border-purple-400/30",
      footerColor: "border-purple-700/50 text-purple-300",
    },
  ];

  return (
    <section id="pilar" className="py-12 sm:py-16 -mt-4 sm:-mt-8 relative z-20 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Explainer & Controls */}
          <div className="lg:col-span-5 space-y-4 reveal-up">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-lg">
              <i className="fa-solid fa-layer-group" />
              <span>Swap Stack Interaktif</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 leading-tight">
              4 Pilar Fondasi Pendidikan Skagata
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              SMKN 3 Yogyakarta mendidik insan vokasi melalui harmonisasi kedisiplinan militer halus (taruna), jiwa enterpreneurship, teknologi mutakhir, dan adab budaya luhur.
            </p>

            {/* Interactive Switcher Button for Stack Card */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={cycleStack}
                className="px-5 py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md btn-bounce"
                title="Swap kartu pilar berikutnya"
              >
                <i className="fa-solid fa-arrows-rotate" />
                <span>Swap Kartu Berikutnya</span>
              </button>
              <span className="text-xs text-slate-500 font-medium" id="stackIndicator">
                Pilar {currentIndex + 1} dari {stackCards.length}
              </span>
            </div>
          </div>

          {/* Right: 3D Stack Cards Container */}
          <div className="lg:col-span-7 relative card-stack-container reveal-up w-full max-w-full overflow-hidden">
            {stackCards.map((pilar, idx) => (
              <div
                key={pilar.id}
                onClick={cycleStack}
                className={`stack-card ${getCardClass(idx)} ${pilar.bgClass} p-7 sm:p-8 flex flex-col justify-between border cursor-pointer`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center text-2xl border p-3 ${pilar.iconBoxColor}`}>
                    <i className={pilar.iconClass} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${pilar.badgeColor}`}>
                    Pilar {pilar.pillarNum}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                    {pilar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
                    {pilar.desc}
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between text-xs font-semibold ${pilar.footerColor}`}>
                  <span>{pilar.footer}</span>
                  <i className={`${pilar.footerIconClass} text-sm`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
