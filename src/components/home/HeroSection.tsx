"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Tv,
} from "lucide-react";
import TiltCard from "@/components/3d/TiltCard";
import { useCMS } from "@/lib/store";

export default function HeroSection() {
  const { activeVideoId } = useCMS();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [haloActive, setHaloActive] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [desktopReady, setDesktopReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const videoId = activeVideoId || "tJhzVg7Nq4g";

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Viewport detection: keep mobile lightweight (zero video preload), defer desktop video
  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        // Defer desktop background video looper until after LCP is fully complete
        const timer = setTimeout(() => {
          setDesktopReady(true);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        setDesktopReady(false);
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Viewport Observer: Pause background video when user scrolls down away from Hero
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Play / Pause video based on visibility and user state
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.defaultMuted = true;
    videoRef.current.muted = true;
    if (isInView && pageVisible && isPlaying && !isMobile) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView, pageVisible, isPlaying, isMobile]);

  const handleEmblemClick = () => {
    setHaloActive(true);
    setTimeout(() => setHaloActive(false), 1000);
  };

  return (
    <section
      id="beranda"
      ref={heroRef}
      className="relative min-h-[85svh] lg:min-h-[96vh] w-full max-w-full flex flex-col justify-between text-white overflow-hidden py-8 sm:py-16 transition-colors duration-300"
    >
      {/* 1. IMMERSIVE VIDEO BACKGROUND (Crisp 9KB poster on mobile, deferred 1080p looper on desktop) */}
      <div className="absolute inset-0 w-full h-full max-w-full overflow-hidden pointer-events-none z-0">
        {/* High-Definition Local Poster Image (Primary LCP Element) */}
        <img
          src="/media/school/video-profil.webp"
          alt="Latar Video Kampus SMKN 3 Yogyakarta"
          width="1920"
          height="1080"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75 scale-105"
        />

        {/* Local HTML5 Video Looper (Loaded ONLY on desktop after initial paint, never on mobile) */}
        {!isMobile && desktopReady && isPlaying && (
          <video
            ref={videoRef}
            src="/media/school/hero-bg.mp4"
            poster="/media/school/video-profil.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-75 contrast-105 scale-105 transition-opacity duration-1000 ${
              videoLoaded ? "opacity-75" : "opacity-0"
            }`}
            onLoadedData={() => setVideoLoaded(true)}
          />
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60" />
      </div>

      {/* 2. FOREGROUND CONTENT: EMBLEM, TITLE, SUBTITLE & ORANGE SKAGATA MENDENGAR BUTTON */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto text-center flex flex-col items-center justify-center space-y-4 sm:space-y-7 w-full min-w-0">
        {/* Big Circular Emblem (Persis Screenshot media_1789807983313.png) */}
        <div className="rounded-full overflow-visible animate-float-gentle">
          <div
            className="relative cursor-pointer group emblem-rise-slow"
            onClick={handleEmblemClick}
            title="Klik untuk interaksi lambang kebanggaan Skagata"
          >
            <div
              className={`absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-amber-400/60 via-emerald-400/50 to-teal-400/60 rounded-full blur-xl sm:blur-2xl transition duration-700 ${
                haloActive ? "opacity-100 scale-125" : "opacity-70 group-hover:opacity-100 animate-ambient-glow"
              }`}
            />
            {/* Authentic Circular Crest Container */}
            <div className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-skagata-950/95 border-2 sm:border-4 border-amber-400 shadow-[0_15px_45px_rgba(0,0,0,0.8)] flex items-center justify-center p-2 sm:p-3.5 backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
              <img
                src="/media/school/logo.webp"
                alt="Logo Resmi SMK Negeri 3 Yogyakarta"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>

        {/* Text Group */}
        <div className="space-y-2 max-w-3xl w-full px-2">
          <h1 className="font-display font-black text-2xl sm:text-5xl md:text-6xl tracking-tight sm:tracking-wide text-white uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] hero-animate-title break-words">
            SMK N 3 YOGYAKARTA
          </h1>
          <p className="text-xs sm:text-lg md:text-xl text-slate-100 font-semibold tracking-normal sm:tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl mx-auto leading-relaxed hero-animate-desc">
            Sekolah Berbasis Ketarunaan, Kewirausahaan, Teknologi, dan Budaya
          </p>
        </div>

        {/* Primary Orange Button: SKAGATA MENDENGAR (Persis Screenshot media_1789807983313.png) */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl hero-animate-cta">
          <a
            href="https://kamimendengar.skagata.sch.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 text-xs sm:text-base border border-amber-400/60 btn-bounce"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 fill-slate-950/20" />
            <span>Skagata Mendengar</span>
          </a>

          {/* Secondary Quick Actions */}
          <Link
            href="/kabar?category=SPMB"
            className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-emerald-400/40 backdrop-blur-md btn-bounce"
          >
            <FileSignature className="w-4 h-4" />
            <span>Info SPMB 2026</span>
          </Link>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-3 sm:py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl backdrop-blur-md border border-white/25 hover:scale-105 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm btn-bounce"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Putar Video Lengkap</span>
          </button>
        </div>
      </div>

      {/* 3. BOTTOM STATS & CONTROLS SECTION */}
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full pt-6 sm:pt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 w-full">
          <div className="bg-slate-900/75 hover:bg-slate-900/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/15 backdrop-blur-md transition shadow-md flex flex-col justify-between reveal-zoom delay-1">
            <div className="font-display font-black text-lg sm:text-2xl text-emerald-300">
              8 Keahlian
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1">Program Industri 4.0</p>
          </div>

          <div className="bg-slate-900/75 hover:bg-slate-900/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/15 backdrop-blur-md transition shadow-md flex flex-col justify-between reveal-zoom delay-2">
            <div className="font-display font-black text-lg sm:text-2xl text-teal-300">
              2.000+
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1">Taruna-Taruni Aktif</p>
          </div>

          <div className="bg-slate-900/75 hover:bg-slate-900/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/15 backdrop-blur-md transition shadow-md flex flex-col justify-between reveal-zoom delay-3">
            <div className="font-display font-black text-lg sm:text-2xl text-amber-300">
              MODENA & Jepang
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1">Mitra Industri Dunia</p>
          </div>

          <div className="bg-slate-900/75 hover:bg-slate-900/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/15 backdrop-blur-md transition shadow-md flex flex-col justify-between reveal-zoom delay-4">
            <div className="font-display font-black text-lg sm:text-2xl text-emerald-300">
              1952
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1">Tradisi Teknik Tertua</p>
          </div>
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
              onClick={() => isMobile ? setIsModalOpen(true) : setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition flex items-center gap-1 text-[11px]"
              title={isMobile ? "Putar Video Lengkap" : isPlaying ? "Jeda Background Video" : "Putar Background Video"}
            >
              {isMobile || !isPlaying ? <Play className="w-3 h-3 fill-white" /> : <Pause className="w-3 h-3" />}
              <span>{isMobile ? "Putar Video" : isPlaying ? "Jeda Video" : "Putar Video"}</span>
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
