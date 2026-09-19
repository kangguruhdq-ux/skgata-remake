"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowDown,
  Sparkles,
  X,
  Maximize2,
  Shield,
  FileSignature,
} from "lucide-react";
import TiltCard from "@/components/3d/TiltCard";
import { useCMS } from "@/lib/store";

export default function HeroSection() {
  const { activeVideoId } = useCMS();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [haloActive, setHaloActive] = useState(false);

  const videoId = activeVideoId || "tJhzVg7Nq4g";

  const handleEmblemClick = () => {
    setHaloActive(true);
    setTimeout(() => setHaloActive(false), 1000);
  };

  return (
    <section
      id="beranda"
      className="relative min-h-[90vh] lg:min-h-[96vh] flex flex-col justify-between text-white overflow-hidden py-12 sm:py-16 transition-colors duration-300"
    >
      {/* 1. IMMERSIVE VIDEO BACKGROUND (Sesuai Tampilan Asli smkn3jogja.sch.id) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Fallback & Poster Image */}
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Latar Video Kampus SMKN 3 Yogyakarta"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75 scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg";
          }}
        />

        {/* Video Looper via YouTube Iframe */}
        {isPlaying && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1`}
            title="Video Suasana Kampus SMKN 3 Yogyakarta"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vh] min-w-full min-h-full object-cover pointer-events-none opacity-60 filter brightness-90 contrast-110 scale-125 transition-opacity duration-1000"
          />
        )}

        {/* Cinematic Vignette Overlay (Sesuai Screenshot User media_1789807983313.png) */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60" />
      </div>

      {/* 2. FOREGROUND CONTENT: EMBLEM, TITLE, SUBTITLE & ORANGE SKAGATA MENDENGAR BUTTON */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto text-center flex flex-col items-center justify-center space-y-6 sm:space-y-7">
        {/* Big Circular Emblem (Persis Screenshot media_1789807983313.png) */}
        <TiltCard className="rounded-full !overflow-visible">
          <div
            className="relative cursor-pointer group emblem-rise-slow"
            onClick={handleEmblemClick}
            title="Klik untuk interaksi lambang kebanggaan Skagata"
          >
            <div
              className={`absolute -inset-4 bg-gradient-to-r from-amber-400/60 via-emerald-400/50 to-teal-400/60 rounded-full blur-2xl transition duration-700 ${
                haloActive ? "opacity-100 scale-125" : "opacity-70 group-hover:opacity-100"
              }`}
            />
            {/* Authentic Circular Crest Container */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-skagata-950/95 border-4 border-amber-400 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center p-3.5 backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-1024x1024.png"
                alt="Logo Resmi SMK Negeri 3 Yogyakarta"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </TiltCard>

        {/* Text Group */}
        <div className="space-y-2.5 max-w-3xl">
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-wide text-white uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] hero-animate-title">
            SMK N 3 YOGYAKARTA
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-slate-100 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl mx-auto leading-relaxed hero-animate-desc">
            Sekolah Berbasis Ketarunaan, Kewirausahaan, Teknologi, dan Budaya
          </p>
        </div>

        {/* Primary Orange Button: SKAGATA MENDENGAR (Persis Screenshot media_1789807983313.png) */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl hero-animate-cta">
          <a
            href="https://kamimendengar.skagata.sch.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#f59e0b] hover:bg-[#d97706] text-white font-black rounded-xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base border border-amber-300/40 btn-bounce"
          >
            <FileText className="w-5 h-5 fill-white/20" />
            <span>Skagata Mendengar</span>
          </a>

          {/* Secondary Quick Actions */}
          <Link
            href="/kabar?category=SPMB"
            className="w-full sm:w-auto px-5 py-3.5 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-emerald-400/40 backdrop-blur-md btn-bounce"
          >
            <FileSignature className="w-4 h-4" />
            <span>Info SPMB 2026</span>
          </Link>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl backdrop-blur-md border border-white/25 hover:scale-105 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm btn-bounce"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Putar Video Lengkap</span>
          </button>
        </div>
      </div>

      {/* 3. BOTTOM STATS & CONTROLS SECTION */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <TiltCard className="rounded-2xl">
            <div className="bg-slate-900/60 hover:bg-slate-900/80 p-4 rounded-2xl border border-white/15 backdrop-blur-md transition shadow-lg flex flex-col justify-between">
              <div className="font-display font-black text-xl sm:text-2xl text-emerald-300">
                8 Keahlian
              </div>
              <p className="text-[11px] text-slate-300 mt-1">Program Industri 4.0</p>
            </div>
          </TiltCard>

          <TiltCard className="rounded-2xl">
            <div className="bg-slate-900/60 hover:bg-slate-900/80 p-4 rounded-2xl border border-white/15 backdrop-blur-md transition shadow-lg flex flex-col justify-between">
              <div className="font-display font-black text-xl sm:text-2xl text-teal-300">
                2.000+
              </div>
              <p className="text-[11px] text-slate-300 mt-1">Taruna-Taruni Aktif</p>
            </div>
          </TiltCard>

          <TiltCard className="rounded-2xl">
            <div className="bg-slate-900/60 hover:bg-slate-900/80 p-4 rounded-2xl border border-white/15 backdrop-blur-md transition shadow-lg flex flex-col justify-between">
              <div className="font-display font-black text-xl sm:text-2xl text-amber-300">
                MODENA & Jepang
              </div>
              <p className="text-[11px] text-slate-300 mt-1">Mitra Industri Dunia</p>
            </div>
          </TiltCard>

          <TiltCard className="rounded-2xl">
            <div className="bg-slate-900/60 hover:bg-slate-900/80 p-4 rounded-2xl border border-white/15 backdrop-blur-md transition shadow-lg flex flex-col justify-between">
              <div className="font-display font-black text-xl sm:text-2xl text-emerald-300">
                1952
              </div>
              <p className="text-[11px] text-slate-300 mt-1">Tradisi Teknik Tertua</p>
            </div>
          </TiltCard>
        </div>

        {/* Video Control Bar at Bottom */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[11px] text-slate-300">
              Video Sinematik Kampus SMKN 3 Yogyakarta
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition flex items-center gap-1 text-[11px]"
              title={isPlaying ? "Jeda Background Video" : "Putar Background Video"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-white" />}
              <span>{isPlaying ? "Jeda Video" : "Putar Video"}</span>
            </button>
            <a
              href="#jurusan"
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition flex items-center gap-1 text-[11px]"
            >
              <span>Jelajahi Bawah</span>
              <ArrowDown className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. CINEMA MODAL VIDEO PLAYER (DENGAN SUARA & FULL HD) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            {/* Header Modal */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-display font-bold text-sm sm:text-base">
                  Profil Resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis)
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="Tutup Pemutar Video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Profil Resmi SMK Negeri 3 Yogyakarta"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer Modal */}
            <div className="p-3 bg-slate-950/80 text-xs text-slate-400 flex items-center justify-between">
              <span>Pusat Keunggulan Ketarunaan & Teknologi Industri D.I. Yogyakarta</span>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Buka di YouTube</span>
                <Maximize2 className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
