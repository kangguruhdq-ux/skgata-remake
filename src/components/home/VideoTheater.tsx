"use client";

import React, { useState } from "react";
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
import { VIDEOS_DATA, VideoData } from "@/lib/data-initial";

export default function VideoTheater() {
  const videoList = [
    {
      id: "tJhzVg7Nq4g",
      title: "Profil Utama SMKN 3 Yogyakarta",
      subtitle: "Official Profile (Featured)",
      fullTitle: "Profil Resmi SMK Negeri 3 Yogyakarta – Pusat Keunggulan DIY",
      description: "Gambaran menyeluruh keunggulan bengkel teknik, kurikulum industri, dan kehidupan taruna-taruni STM 2 Jetis Yogyakarta.",
      icon: "fa-solid fa-play",
      color: "emerald",
    },
    {
      id: "7OoOmmRb5Ek",
      title: "Ketarunaan Skagata (Bagian 1)",
      subtitle: "Pembinaan Disiplin Taruna",
      fullTitle: "Pendidikan Karakter Berbasis Ketarunaan (Bagian 1)",
      description: "Dokumentasi pelaksanaan pembinaan fisik, mental, dan apel taruna di lapangan sekolah.",
      icon: "fa-solid fa-shield-halved",
      color: "slate",
    },
    {
      id: "URLFZN5JZUg",
      title: "Ketarunaan Skagata (Bagian 2)",
      subtitle: "Kedisiplinan & Baris Berbaris",
      fullTitle: "Pendidikan Karakter Berbasis Ketarunaan (Bagian 2)",
      description: "Lanjutan drill kedisiplinan dan pembentukan etos kerja tangguh siswa siap kerja.",
      icon: "fa-solid fa-person-military-rifle",
      color: "slate",
    },
    {
      id: "o3Kzq2jUre0",
      title: "Sambutan Sri Sultan HB X",
      subtitle: "Gubernur D.I. Yogyakarta",
      fullTitle: "Sambutan Khusus Sri Sultan Hamengkubuwono X",
      description: "Pesan dan restu Gubernur DIY atas peran strategis SMKN 3 dalam mencerdaskan generasi teknik bangsa.",
      icon: "fa-solid fa-crown",
      color: "amber",
    },
    {
      id: "72o_zv3jei4",
      title: "Pesan Ditjen Vokasi Kemendikbud",
      subtitle: "Wikan Sakarinto, Ph.D",
      fullTitle: "Apresiasi & Arahan Ditjen Pendidikan Vokasi",
      description: "Pesan penting Wikan Sakarinto, Ph.D mengenai link-and-match dan karakter lulusan masa depan.",
      icon: "fa-solid fa-user-tie",
      color: "teal",
    },
    {
      id: "-_1paxlaUfE",
      title: "Pesan Hanung Bramantyo",
      subtitle: "Sutradara & Tokoh Perfilman",
      fullTitle: "Motivasi dari Sutradara Hanung Bramantyo",
      description: "Mengapa anak SMK keren: keunggulan praktek kerja nyata dan kemandirian profesional di lapangan.",
      icon: "fa-solid fa-film",
      color: "rose",
    },
  ];

  const [activeVid, setActiveVid] = useState(videoList[0]);
  const watchUrl = `https://www.youtube.com/watch?v=${activeVid.id}`;

  return (
    <section
      id="video-theater"
      className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 px-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-mono text-slate-400 pl-2 text-[11px] truncate max-w-[200px] sm:max-w-none">
                  Now Playing: {activeVid.title}
                </span>
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-[11px] flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-1 rounded-lg transition"
                title="Tonton langsung di YouTube jika browser Anda memblokir pemutar"
              >
                <i className="fa-brands fa-youtube text-red-500" />
                <span className="hidden sm:inline">Buka di YouTube</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
              </a>
            </div>

            {/* Video Frame Container */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner bg-black relative group">
              <iframe
                key={activeVid.id}
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVid.id}?rel=0&modestbranding=1`}
                title={activeVid.fullTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              {/* Fallback Information Bar below screen if embedded player is blocked by YouTube's Error 153 */}
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center justify-between text-[11px] text-slate-400 opacity-90 hover:opacity-100 transition">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-info text-emerald-400" />
                  <span>Jika player memunculkan Error 153 oleh YouTube:</span>
                </span>
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-white font-bold underline flex items-center gap-1"
                >
                  Tonton di YouTube Resmi &rarr;
                </a>
              </div>
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
          <div className="lg:col-span-4 space-y-2.5 reveal-right">
            <div className="flex items-center justify-between pb-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <span>Daftar 6 Video Resmi</span>
              <span className="text-emerald-400 text-[11px]">Pilih untuk Memutar</span>
            </div>

            {videoList.map((vid) => {
              const isSelected = vid.id === activeVid.id;
              return (
                <button
                  key={vid.id}
                  onClick={() => setActiveVid(vid)}
                  className={`w-full text-left p-3 rounded-2xl flex items-center gap-3 transition btn-bounce ${
                    isSelected
                      ? "bg-emerald-950/60 border-2 border-emerald-500 text-white"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-sm ${
                      isSelected
                        ? "bg-emerald-500/30 text-emerald-400"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    <i className={vid.icon} />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="font-bold text-xs truncate">{vid.title}</p>
                    <span
                      className={`text-[10px] ${
                        isSelected ? "text-emerald-300 font-semibold" : "text-slate-400"
                      }`}
                    >
                      {vid.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
