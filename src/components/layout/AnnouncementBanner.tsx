"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Megaphone, ArrowRight, X, Sparkles } from "lucide-react";
import { useCMS } from "@/lib/store";

export default function AnnouncementBanner() {
  const { announcement } = useCMS();
  const [dismissed, setDismissed] = useState(false);

  if (!announcement || !announcement.enabled || dismissed) {
    return null;
  }

  const themeStyles = {
    emerald:
      "bg-gradient-to-r from-emerald-950 via-skagata-900 to-emerald-950 text-emerald-100 border-b border-emerald-500/30 shadow-[0_4px_20px_rgba(4,120,87,0.15)]",
    amber:
      "bg-gradient-to-r from-amber-950 via-amber-900 to-yellow-950 text-amber-100 border-b border-amber-500/30 shadow-[0_4px_20px_rgba(217,119,6,0.15)]",
    indigo:
      "bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-indigo-100 border-b border-indigo-500/30 shadow-[0_4px_20px_rgba(79,70,229,0.15)]",
  };

  const badgeStyles = {
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    amber: "bg-amber-500/25 text-amber-300 border-amber-400/50",
    indigo: "bg-indigo-500/25 text-indigo-300 border-indigo-400/50",
  };

  const currentTheme = announcement.theme || "emerald";

  return (
    <div
      className={`relative z-40 transition-all duration-300 w-full max-w-full overflow-hidden ${themeStyles[currentTheme]}`}
    >
      <div className="max-w-7xl mx-auto px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Main Content Area */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Status Badge with Live Beacon */}
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border flex-shrink-0 ${badgeStyles[currentTheme]}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="truncate max-w-[110px] sm:max-w-none">
              {announcement.badge || "INFO RESMI"}
            </span>
          </span>

          {/* Clickable Announcement Message */}
          {announcement.linkUrl ? (
            <Link
              href={announcement.linkUrl}
              className="flex items-center gap-1.5 min-w-0 flex-1 group"
              title={announcement.text}
            >
              <p className="truncate text-[11px] sm:text-[12.5px] font-medium text-slate-100 group-hover:text-white transition">
                {announcement.text}
              </p>
              <span className="hidden sm:inline-flex items-center gap-1 font-bold text-[11px] text-emerald-300 group-hover:text-emerald-200 ml-1 whitespace-nowrap underline underline-offset-4 decoration-emerald-400/60 flex-shrink-0">
                <span>{announcement.linkText || "Selengkapnya"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:hidden text-emerald-300 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </Link>
          ) : (
            <p className="truncate text-[11px] sm:text-[12.5px] font-medium text-slate-100 min-w-0 flex-1">
              {announcement.text}
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition flex-shrink-0"
          title="Tutup pengumuman"
          aria-label="Tutup pengumuman"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
