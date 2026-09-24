"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: "icon" | "row" | "pill";
}

export default function ThemeToggle({
  className = "",
  showLabel = false,
  variant = "icon",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={
          variant === "row"
            ? "w-full h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
            : `w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse ${className}`
        }
      />
    );
  }

  const isDark = theme === "dark";

  // Dedicated Rich Row Presentation (for Mobile Drawer)
  if (variant === "row") {
    return (
      <div
        onClick={toggleTheme}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleTheme();
          }
        }}
        className={`w-full p-3 rounded-2xl border transition-colors duration-200 flex items-center justify-between cursor-pointer select-none active:scale-[0.985] ${
          isDark
            ? "bg-slate-800/90 border-slate-700/80 text-white hover:bg-slate-800 shadow-sm"
            : "bg-slate-100/90 border-slate-200 text-slate-800 hover:bg-slate-100 shadow-sm"
        } ${className}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${
              isDark
                ? "bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                : "bg-emerald-500/15 text-emerald-600 border border-emerald-500/25"
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="w-5 h-5 transition-transform duration-500 -rotate-12 hover:rotate-0" />
            )}
          </div>
          <div className="text-left">
            <div className="font-display font-bold text-xs">
              {isDark ? "Mode Gelap (Dark Mode)" : "Mode Terang (Light Mode)"}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Sentuh untuk beralih ke {isDark ? "mode terang" : "mode malam gelap"}
            </div>
          </div>
        </div>

        {/* Animated Pill Switch Track */}
        <div
          className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 relative flex items-center ${
            isDark ? "bg-emerald-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
          }`}
        >
          <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center text-slate-800">
            {isDark ? (
              <Moon className="w-3 h-3 text-emerald-700" />
            ) : (
              <Sun className="w-3 h-3 text-amber-500" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Compact Icon Presentation (for Navbar & Topbars)
  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`inline-flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 active:scale-95 ${
        isDark
          ? "bg-slate-800/90 text-amber-300 border-slate-700 hover:bg-slate-700 shadow-sm"
          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 shadow-sm"
      } ${className}`}
      title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Dark Mode)"}
      aria-label="Toggle Mode Gelap/Terang"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-slate-600 transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? "Mode Terang" : "Mode Gelap"}
        </span>
      )}
    </button>
  );
}
