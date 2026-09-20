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

export default function VideoTheater() {
  const { videos, activeVideoId } = useCMS();
  const defaultVideoList = [
    {
      id: "tJhzVg7Nq4g",
      title: "Profil Utama SMKN 3 Yogyakarta",
      subtitle: "Official Profile (Featured)",
      fullTitle: "Profil Resmi SMK Negeri 3 Yogyakarta – Pusat Keunggulan DIY",
      description: "Gambaran menyeluruh keunggulan bengkel teknik, kurikulum industri, dan kehidupan taruna-taruni STM 2 Jetis Yogyakarta.",
      icon: "fa-solid fa-play",
      color: "emerald",
      poster: "/media/school/video-profil.webp",
    },
    {
      id: "7OoOmmRb5Ek",
      title: "Ketarunaan Skagata (Bagian 1)",
      subtitle: "Pembinaan Disiplin Taruna",
      fullTitle: "Pendidikan Karakter Berbasis Ketarunaan (Bagian 1)",
      description: "Dokumentasi pelaksanaan pembinaan fisik, mental, dan apel taruna di lapangan sekolah.",
      icon: "fa-solid fa-shield-halved",
      color: "slate",
      poster: "/media/school/video-taruna-1.webp",
    },
    {
      id: "URLFZN5JZUg",
      title: "Ketarunaan Skagata (Bagian 2)",
      subtitle: "Kedisiplinan & Baris Berbaris",
      fullTitle: "Pendidikan Karakter Berbasis Ketarunaan (Bagian 2)",
      description: "Lanjutan drill kedisiplinan dan pembentukan etos kerja tangguh siswa siap kerja.",
      icon: "fa-solid fa-person-military-rifle",
      color: "slate",
      poster: "/media/school/video-taruna-2.webp",
    },
    {
      id: "o3Kzq2jUre0",
      title: "Sambutan Sri Sultan HB X",
      subtitle: "Gubernur D.I. Yogyakarta",
      fullTitle: "Sambutan Khusus Sri Sultan Hamengkubuwono X",
      description: "Pesan dan restu Gubernur DIY atas peran strategis SMKN 3 dalam mencerdaskan generasi teknik bangsa.",
      icon: "fa-solid fa-crown",
      color: "amber",
      poster: "/media/school/sultan.webp",
    },
    {
      id: "72o_zv3jei4",
      title: "Pesan Ditjen Vokasi Kemendikbud",
      subtitle: "Wikan Sakarinto, Ph.D",
      fullTitle: "Apresiasi & Arahan Ditjen Pendidikan Vokasi",
      description: "Pesan penting Wikan Sakarinto, Ph.D mengenai link-and-match dan karakter lulusan masa depan.",
      icon: "fa-solid fa-user-tie",
      color: "teal",
      poster: "/media/school/wikan.webp",
    },
    {
      id: "-_1paxlaUfE",
      title: "Pesan Hanung Bramantyo",
      subtitle: "Sutradara & Tokoh Perfilman",
      fullTitle: "Motivasi dari Sutradara Hanung Bramantyo",
      description: "Mengapa anak SMK keren: keunggulan praktek kerja nyata dan kemandirian profesional di lapangan.",
      icon: "fa-solid fa-film",
      color: "rose",
      poster: "/media/school/hanung.webp",
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
            <i className="fa-brands fa-youtube text-red-500 mr-1.5" />
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
            <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-white/10 px-1 sm:px-2 text-xs">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="font-mono text-slate-400 text-[10.5px] sm:text-[11px] truncate">
                  Now Playing: {activeVid.title}
                </span>
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-[10.5px] sm:text-[11px] flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/30 px-2 sm:px-2.5 py-1 rounded-lg transition shrink-0"
                title="Tonton langsung di YouTube"
              >
                <i className="fa-brands fa-youtube text-red-500" />
                <span className="hidden sm:inline">Buka di YouTube</span>
                <span className="sm:hidden">YouTube</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
              </a>
            </div>

            {/* Video Frame Container (Always strict 16:9 ratio across all screens) */}
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-inner bg-black group"
              style={{ aspectRatio: "16 / 9", width: "100%" }}
            >
              {isInView ? (
                <iframe
                  key={activeVid.id}
                  className="w-full h-full border-0"
                  style={{ width: "100%", height: "100%", border: 0 }}
                  src={`https://www.youtube-nocookie.com/embed/${activeVid.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                  title={activeVid.fullTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Putar ${activeVid.title}`}
                  onClick={() => setIsInView(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setIsInView(true);
                  }}
                  className="w-full h-full cursor-pointer group relative overflow-hidden text-left select-none"
                  style={{ width: "100%", height: "100%" }}
                >
                  <img
                    src={activeVid.poster || "/media/school/video-profil.webp"}
                    alt={activeVid.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-between p-3 sm:p-5 pointer-events-none">
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 sm:py-1 rounded-full border border-white/10">
                        <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                        <span>Putar Video</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-center my-auto">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)] group-hover:scale-110 active:scale-95 transition-transform">
                        <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-white text-xs sm:text-sm font-bold line-clamp-1">
                        {activeVid.title}
                      </p>
                      <p className="text-slate-300 text-[10.5px] sm:text-[11px] line-clamp-1">
                        {activeVid.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 mt-1">
              <h3 className="font-display font-bold text-base sm:text-xl text-white">
                {activeVid.fullTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {activeVid.description}
              </p>
            </div>
          </div>

          {/* Right: Playlist of All 6 Actual Videos */}
          <div className="lg:col-span-4 reveal-right">
            <div className="flex items-center justify-between pb-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              <span>Daftar {videoList.length} Video Resmi</span>
              <span className="text-emerald-400 text-[11px]">Pilih Video</span>
            </div>

            {/* Mobile: Horizontal swipeable strip | Desktop: Vertical list */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2.5 pb-2 lg:pb-0 scroll-smooth snap-x snap-mandatory no-scrollbar">
              {videoList.map((vid) => {
                const isSelected = vid.id === activeVid.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => setActiveVideoKey(vid.id)}
                    className={`text-left p-2.5 sm:p-3 rounded-2xl flex items-center gap-3 transition flex-shrink-0 w-[240px] sm:w-[280px] lg:w-full snap-start ${
                      isSelected
                        ? "bg-emerald-950/70 border-2 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    {/* Small Poster Thumbnail */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative bg-slate-800 border border-white/10">
                      <img
                        src={vid.poster || "/media/school/video-profil.webp"}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <i className={`${vid.icon} text-white text-xs`} />
                      </div>
                    </div>

                    <div className="overflow-hidden flex-1 min-w-0">
                      <p className="font-bold text-xs truncate">{vid.title}</p>
                      <span
                        className={`text-[10.5px] truncate block ${
                          isSelected
                            ? "text-emerald-300 font-medium"
                            : "text-slate-400"
                        }`}
                      >
                        {vid.subtitle}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
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
