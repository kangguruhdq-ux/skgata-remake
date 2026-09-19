"use client";

import React, { useState, useEffect } from "react";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Sparkles,
  Layers,
} from "lucide-react";
import { MajorGalleryItem } from "@/lib/data-initial";

interface MajorGalleryLightboxProps {
  gallery: MajorGalleryItem[];
  majorName: string;
  majorCode: string;
}

export default function MajorGalleryLightbox({
  gallery,
  majorName,
  majorCode,
}: MajorGalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % gallery.length : null
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + gallery.length) % gallery.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, gallery.length]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm interactive-card reveal-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100 mb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-700">
            <Camera className="w-5 h-5 text-emerald-600" />
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Galeri Bengkel & Fasilitas Praktik Kejuruan
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dokumentasi otentik sarana laboratorium, bengkel praktik, dan peralatan berstandar industri di {majorName}.
          </p>
        </div>

        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit">
          {gallery.length} Foto Fasilitas
        </span>
      </div>

      {/* Grid of Gallery Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {gallery.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[220px]"
          >
            {/* Image */}
            <img
              src={item.url}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              loading="lazy"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            {/* Zoom Icon Badge */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-slate-900/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Badge Indicator */}
            <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg shadow-sm backdrop-blur-sm">
              {majorCode} #{idx + 1}
            </div>

            {/* Content info */}
            <div className="relative z-10 p-4 text-white">
              <h3 className="font-display font-bold text-sm text-white group-hover:text-emerald-300 transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white flex items-center justify-center transition border border-white/20"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Image View */}
            <div className="relative h-[50vh] sm:h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={gallery[selectedIndex].url}
                alt={gallery[selectedIndex].title}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev / Next Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(
                        (selectedIndex - 1 + gallery.length) % gallery.length
                      );
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition border border-white/20"
                    aria-label="Foto Sebelumnya"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex((selectedIndex + 1) % gallery.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition border border-white/20"
                    aria-label="Foto Selanjutnya"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Navigation Indicators */}
            <div className="p-5 sm:p-6 bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {majorName} ({majorCode}) &bull; Foto {selectedIndex + 1} dari{" "}
                  {gallery.length}
                </span>
                <h4 className="font-display font-bold text-base sm:text-lg text-white">
                  {gallery[selectedIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
                  {gallery[selectedIndex].caption}
                </p>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 self-start sm:self-center">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`w-12 h-10 rounded-lg overflow-hidden border-2 transition ${
                      i === selectedIndex
                        ? "border-emerald-500 scale-105"
                        : "border-slate-700 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={g.url}
                      alt={g.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
