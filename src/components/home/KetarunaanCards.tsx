"use client";

import React from "react";
import Link from "next/link";
import { useCMS } from "@/lib/store";

export default function KetarunaanCards() {
  const { portalItems } = useCMS();

  // Custom SVG Icons matching exact official website design (media_1789809408746.png)
  const renderIcon = (type: string) => {
    switch (type) {
      case "sejarah":
        return (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className="w-14 h-14 sm:w-16 sm:h-16 text-[#40B4E5] transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
          >
            {/* Triangle Gable / Roof */}
            <path d="M32 7L13 22H51L32 7Z" fill="currentColor" />
            {/* Clock in Roof */}
            <circle cx="32" cy="15.5" r="4.2" fill="white" />
            <path
              d="M32 13V15.5H34.5"
              stroke="#40B4E5"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Roof Horizontal Base */}
            <rect x="11" y="21" width="42" height="3" rx="1.5" fill="currentColor" />
            {/* Left Wing Column */}
            <rect x="14" y="26" width="7.5" height="22" rx="2" fill="currentColor" />
            {/* Right Wing Column */}
            <rect x="42.5" y="26" width="7.5" height="22" rx="2" fill="currentColor" />
            {/* Center Building with Arched Doorway */}
            <path
              d="M24.5 26H39.5V48H35V33.5C35 31.8431 33.6569 30.5 32 30.5C30.3431 30.5 29 31.8431 29 33.5V48H24.5V26Z"
              fill="currentColor"
            />
          </svg>
        );

      case "visi-misi":
        return (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className="w-14 h-14 sm:w-16 sm:h-16 text-[#64748B] dark:text-slate-300 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
          >
            {/* Number 1 */}
            <path
              d="M16 13L19 11V23M16 23H22"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="27" y="15" width="25" height="5.5" rx="2.75" fill="currentColor" />

            {/* Number 2 */}
            <path
              d="M15 31C15 28.5 17 27 19.5 27C21.8 27 23.5 28.5 23.5 30.5C23.5 32.5 21 34.5 15.5 38.5H24"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="27" y="31" width="25" height="5.5" rx="2.75" fill="currentColor" />

            {/* Number 3 */}
            <path
              d="M15 45H23.5C23.5 47 22 48.2 20 48.2C18.5 48.2 17 47.8 16 47.2M20 48.2C22.2 48.2 24 49.5 24 51.5C24 53.5 22 55 19.5 55C17 55 15 53.2 15 51.5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="27" y="47" width="25" height="5.5" rx="2.75" fill="currentColor" />
          </svg>
        );

      case "prestasi":
        return (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className="w-14 h-14 sm:w-16 sm:h-16 text-[#F97316] transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
          >
            {/* Top Ribbon Straps */}
            <path
              d="M21 9L26 23H38L43 9L35.5 17L32 15L28.5 17L21 9Z"
              fill="currentColor"
            />
            {/* Circular Medal Disc */}
            <circle cx="32" cy="37" r="15" fill="currentColor" />
            <circle cx="32" cy="37" r="12.5" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
            {/* Center 5-pointed Star */}
            <path
              d="M32 28L34.9 34L41.5 34.9L36.8 39.5L37.9 46L32 42.9L26.1 46L27.2 39.5L22.5 34.9L29.1 34L32 28Z"
              fill="white"
            />
          </svg>
        );

      case "kerjasama":
        return (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className="w-14 h-14 sm:w-16 sm:h-16 text-[#4ADE80] dark:text-[#22C55E] transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
          >
            {/* Center User */}
            <circle cx="32" cy="21" r="7.5" fill="currentColor" />
            <path
              d="M19 46C19 38.8203 24.8203 33 32 33C39.1797 33 45 38.8203 45 46V47H19V46Z"
              fill="currentColor"
            />

            {/* Left User */}
            <circle cx="16" cy="27" r="5.5" fill="currentColor" />
            <path
              d="M6 47C6 41 10.5 36.5 16 36.5C18 36.5 19.8 37.1 21.2 38.2C19.8 40.5 19 43.1 19 46V47H6Z"
              fill="currentColor"
            />

            {/* Right User */}
            <circle cx="48" cy="27" r="5.5" fill="currentColor" />
            <path
              d="M58 47C58 41 53.5 36.5 48 36.5C46 36.5 44.2 37.1 42.8 38.2C44.2 40.5 45 43.1 45 46V47H58Z"
              fill="currentColor"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  const delayClasses = ["delay-1", "delay-2", "delay-3", "delay-4"];

  return (
    <section
      id="portal-ketarunaan"
      className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/80 relative z-20"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Portal Icons Bar - Clean Minimalist Style exactly matching media_1789809408746.png */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {portalItems.map((item, idx) => (
            <Link
              key={item.id}
              href={item.link}
              className={`group flex flex-col items-center text-center p-4 rounded-2xl hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-all duration-300 reveal-up ${delayClasses[idx % 4]}`}
            >
              {/* SVG Vector Icon */}
              <div className="mb-4 flex items-center justify-center h-16 sm:h-20">
                {renderIcon(item.type)}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-800 dark:text-white group-hover:text-skagata-700 dark:group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal mt-1 leading-snug">
                {item.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
