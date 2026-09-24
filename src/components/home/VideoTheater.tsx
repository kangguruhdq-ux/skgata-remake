"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  ExternalLink,
  Shield,
  Users,
  Crown,
  Briefcase,
  Film,
  Info,
  CheckCircle,
} from "lucide-react";
import { useCMS } from "@/lib/store";
import { YoutubeIcon } from "@/components/ui/SocialIcons";

export default function VideoTheater() {
  const { videos, activeVideoId } = useCMS();
  const defaultVideoList = [
    {
      id: "tJhzVg7Nq4g",
      title: "Profil Utama SMKN 3 Yogyakarta",
      subtitle: "Official Profile (Featured)",
      fullTitle: "Profil Resmi SMK Negeri 3 Yogyakarta – Pusat Keunggulan DIY",
      description: "Gambaran menyeluruh keunggulan bengkel teknik, kurikulum industri, dan kehidupan taruna-taruni STM 2 Jetis Yogyakarta.",
      icon: "play",
      color: "emerald",
      poster: "/media/school/video-profil-480.webp",
    },
    {
      id: "7OoOmmRb5Ek",
      title: "Ketarunaan Skagata (Bagian 1)",
      subtitle: "Pembinaan Disiplin Taruna",
      fullTitle: "Pendidikan Karakter Berbasis Ketarunaan (Bagian 1)",
      description: "Dokumentasi pelaksanaan pembinaan fisik, mental, dan apel taruna di lapangan sekolah.",
      icon: "shield",
      color: "slate",
      poster: "/media/school/video-taruna-1-480.webp",
    },
    {
      id: "URLFZN5JZUg",
      title: "Ketarunaan Skagata (Bagian 2)",
      subtitle: "Kedisiplinan & Baris Berbaris",
      fullTitle: "Pendidikan Karakter Berbasis Ketarunaan (Bagian 2)",
      description: "Lanjutan drill kedisiplinan dan pembentukan etos kerja tangguh siswa siap kerja.",
      icon: "flag",
      color: "slate",
      poster: "/media/school/video-taruna-2-480.webp",
    },
    {
      id: "o3Kzq2jUre0",
      title: "Sambutan Sri Sultan HB X",
      subtitle: "Gubernur D.I. Yogyakarta",
      fullTitle: "Sambutan Khusus Sri Sultan Hamengkubuwono X",
      description: "Pesan dan restu Gubernur DIY atas peran strategis SMKN 3 dalam mencerdaskan generasi teknik bangsa.",
      icon: "crown",
      color: "amber",
      poster: "/media/school/sultan-480.webp",
    },
    {
      id: "72o_zv3jei4",
      title: "Pesan Ditjen Vokasi Kemendikbud",
      subtitle: "Wikan Sakarinto, Ph.D",
      fullTitle: "Apresiasi & Arahan Ditjen Pendidikan Vokasi",
      description: "Pesan penting Wikan Sakarinto, Ph.D mengenai link-and-match dan karakter lulusan masa depan.",
      icon: "user",
      color: "teal",
      poster: "/media/school/wikan-480.webp",
    },
    {
      id: "-_1paxlaUfE",
      title: "Pesan Hanung Bramantyo",
      subtitle: "Sutradara & Tokoh Perfilman",
      fullTitle: "Motivasi dari Sutradara Hanung Bramantyo",
      description: "Mengapa anak SMK keren: keunggulan praktek kerja nyata dan kemandirian profesional di lapangan.",
      icon: "film",
      color: "rose",
      poster: "/media/school/hanung-480.webp",
    },
  ];

  const videoList = videos.length
    ? videos.map((video, index) => {
        const fallback = defaultVideoList[index % defaultVideoList.length] || defaultVideoList[0];
        return {
          ...fallback,
          id: video.id,
          title: video.title,
          subtitle: video.subtitle,
          fullTitle: video.title,
          description: video.description,
          poster: (video as any).poster || fallback.poster,
        };
      })
    : defaultVideoList;
  const [activeVideoKey, setActiveVideoKey] = useState(activeVideoId);
  const activeVid = videoList.find((video) => video.id === activeVideoKey) || videoList[0];
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const watchUrl = `https://www.youtube.com/watch?v=${activeVid.id}`;

  useEffect(() => {
    setActiveVideoKey(activeVideoId);
  }, [activeVideoId]);

  return (
    <section
      id="video-theater"
      ref={sectionRef}
      className="py-14 lg:py-24 bg-slate-900 text-white relative overflow-hidden w-full max-w-full"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 reveal-up">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/25 inline-flex items-center gap-1.5">
            <YoutubeIcon className="w-3.5 h-3.5 text-red-500 mr-1 inline" />
            <span>Skagata TV & Video Galeri Asli</span>
          </span>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-3 tracking-tight">
            Pusat Tayangan Video Resmi SMKN 3 Yogyakarta
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Pilih dari 6 video autentik di playlist samping. Klik tombol play untuk menonton langsung di website atau buka di YouTube.
          </p>
        </div>

        {/* Main Video Theater Player & Selector Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Active Screen Cinema */}
          <div className="lg:col-span-8 bg-slate-950/90 rounded-3xl p-3 sm:p-4 border border-white/10 shadow-2xl backdrop-blur-md reveal-zoom">
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10 px-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="font-mono text-slate-400 text-xs font-semibold tracking-wide ml-1">
                  Skagata TV Cinema
                </span>
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-lg transition shrink-0 hover:bg-emerald-900/60"
                title="Buka tayangan langsung di YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5 text-red-500" />
                <span>Buka di YouTube</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
            </div>

            {/* Video Frame Container (Always strict 16:9 landscape ratio across all screens) */}
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black group"
              style={{ aspectRatio: "16 / 9", width: "100%" }}
            >
              {isInView ? (
                <iframe
                  key={activeVid.id}
                  className="w-full h-full border-0"
                  style={{ width: "100%", height: "100%", border: 0 }}
                  src={`https://www.youtube.com/embed/${activeVid.id}?autoplay=1&playsinline=1&rel=0`}
                  title={activeVid.fullTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Putar ${activeVid.fullTitle}`}
                  onClick={() => setIsInView(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setIsInView(true);
                  }}
                  className="w-full h-full cursor-pointer group relative overflow-hidden text-left select-none bg-slate-950"
                  style={{ width: "100%", height: "100%" }}
                >
                  <img
                    src={activeVid.poster || "/media/school/video-profil.webp"}
                    alt={activeVid.title}
                    width="800"
                    height="450"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Clean Center Play Button Overlay */}
                  <div className="absolute inset-0 bg-slate-950/35 group-hover:bg-slate-950/20 transition-colors flex flex-col items-center justify-center gap-3 p-4 pointer-events-none">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.7)] group-hover:scale-110 active:scale-95 transition-transform">
                      <Play className="w-6 h-6 sm:w-9 sm:h-9 fill-white ml-1" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-bold px-3 py-1 rounded-full border border-white/20 shadow-lg">
                      <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                      <span>Putar Tayangan</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Active Video Info Details - FULL TEXT, NEVER CUT OFF */}
            <div className="p-3 sm:p-4 mt-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {activeVid.subtitle}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Video {videoList.findIndex((v) => v.id === activeVid.id) + 1} dari {videoList.length}
                </span>
              </div>

              <h3 className="font-display font-black text-base sm:text-2xl text-white leading-snug break-words">
                {activeVid.fullTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal break-words">
                {activeVid.description}
              </p>
            </div>
          </div>

          {/* Right: Playlist of All 6 Actual Videos */}
          <div className="lg:col-span-4 reveal-right">
            <div className="flex items-center justify-between pb-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              <span>Daftar {videoList.length} Video Resmi</span>
              <span className="text-emerald-400 text-[11px] font-semibold">Pilih untuk Memutar</span>
            </div>

            {/* Clean responsive list - on mobile each item is clear and never clipped */}
            <div className="flex flex-col gap-2 w-full">
              {videoList.map((vid, idx) => {
                const isSelected = vid.id === activeVid.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setActiveVideoKey(vid.id);
                      setIsInView(true);
                      if (typeof window !== "undefined" && window.innerWidth < 1024) {
                        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={`text-left p-2.5 sm:p-3 rounded-2xl flex items-center gap-3 transition w-full ${
                      isSelected
                        ? "bg-emerald-950/80 border-2 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                        : "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    {/* Small Poster Thumbnail */}
                    <div className="w-20 sm:w-24 h-12 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 relative bg-slate-800 border border-white/10">
                      <img
                        src={vid.poster || "/media/school/video-profil.webp"}
                        alt={vid.title}
                        width="96"
                        height="56"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={`absolute inset-0 flex items-center justify-center ${isSelected ? "bg-emerald-950/60" : "bg-black/35"}`}>
                        <Play className={`w-4 h-4 ${isSelected ? "fill-emerald-400 text-emerald-400" : "fill-white text-white"}`} />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-emerald-400 font-bold">#{idx + 1}</span>
                        <p className="font-bold text-xs sm:text-sm text-white leading-tight break-words">
                          {vid.title}
                        </p>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5 font-medium">
                        {vid.subtitle}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0 mr-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
