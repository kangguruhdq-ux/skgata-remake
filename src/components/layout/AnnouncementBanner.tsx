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
    emerald: "bg-gradient-to-r from-emerald-900 via-skagata-900 to-emerald-950 text-emerald-100 border-b border-emerald-700/40",
    amber: "bg-gradient-to-r from-amber-950 via-amber-900 to-yellow-950 text-amber-100 border-b border-amber-700/40",
    indigo: "bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-indigo-100 border-b border-indigo-700/40",
  };

  const badgeStyles = {
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    amber: "bg-amber-500/25 text-amber-300 border-amber-400/50",
    indigo: "bg-indigo-500/25 text-indigo-300 border-indigo-400/50",
  };

  const currentTheme = announcement.theme || "emerald";

  return (
    <div className={`py-2 px-3 sm:px-4 text-xs relative z-30 transition-all w-full max-w-full overflow-hidden ${themeStyles[currentTheme]}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex-shrink-0 ${badgeStyles[currentTheme]}`}>
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>{announcement.badge}</span>
          </span>
          <p className="truncate text-[11.5px] font-medium text-slate-200">
            {announcement.text}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {announcement.linkUrl && (
            <Link
              href={announcement.linkUrl}
              className="inline-flex items-center gap-1 font-bold text-[11px] text-white hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/60 transition"
            >
              <span>{announcement.linkText || "Selengkapnya"}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="w-5 h-5 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
            title="Tutup banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
