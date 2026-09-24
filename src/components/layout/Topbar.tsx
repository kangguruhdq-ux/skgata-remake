"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, GraduationCap, Megaphone } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useCMS } from "@/lib/store";
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, MailIcon } from "@/components/ui/SocialIcons";

export default function Topbar() {
  const { schoolInfo, socialLinks } = useCMS();

  return (
    <div className="bg-skagata-900 text-slate-200 text-xs py-2 px-4 border-b border-skagata-800/80 hidden md:block">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Contact Info */}
        <div className="flex items-center gap-3 xl:gap-4 text-[11.5px] shrink-0">
          <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden xl:inline">{schoolInfo.address}</span>
            <span className="xl:hidden">Jetis, Yogyakarta</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {schoolInfo.phone}
          </span>
          <span className="text-slate-600 hidden 2xl:inline">|</span>
          <a
            href={`mailto:${schoolInfo.email}`}
            className="hidden 2xl:flex items-center gap-1.5 hover:text-white transition"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {schoolInfo.email}
          </a>
        </div>

        {/* Right: Authentic Utility Nav Links & Social */}
        <div className="flex items-center gap-3 xl:gap-4 text-[11.5px]">
          <Link
            href="/kabar?category=Berita"
            className="hover:text-emerald-300 transition font-medium"
          >
            Berita
          </Link>
          <span className="text-slate-700">|</span>
          <Link
            href="/kabar?category=Artikel"
            className="hover:text-emerald-300 transition font-medium"
          >
            Artikel
          </Link>
          <span className="text-slate-700">|</span>
          <Link
            href="/kabar?category=Pengumuman"
            className="hover:text-emerald-300 transition font-medium"
          >
            Pengumuman
          </Link>
          <span className="text-slate-700">|</span>
          <a
            href="http://kelasiber.skagata.sch.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-300 transition flex items-center gap-1 font-medium"
          >
            <GraduationCap className="w-3.5 h-3.5 text-skagata-goldlight" />
            <span>LMS Kelasiber</span>
          </a>
          <span className="text-slate-700">|</span>
          <a
            href="http://email.smkn3jogja.sch.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-300 transition font-medium"
          >
            Email Sekolah
          </a>
          <a
            href="https://kamimendengar.skagata.sch.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold border border-amber-500/30 hover:bg-amber-500/30 transition flex items-center gap-1 text-[10.5px] ml-1"
          >
            <Megaphone className="w-3 h-3 text-amber-400" />
            <span>Skagata Mendengar</span>
          </a>
          <div className="flex items-center gap-2.5 pl-2 border-l border-skagata-700">
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-md hover:bg-skagata-800/80 flex items-center justify-center text-slate-200 hover:text-white transition"
              title="Facebook Resmi SMKN 3 Yogyakarta"
              aria-label="Facebook SMKN 3 Yogyakarta"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-md hover:bg-skagata-800/80 flex items-center justify-center text-slate-200 hover:text-white transition"
              title="Twitter / X Resmi SMKN 3 Yogyakarta"
              aria-label="Twitter SMKN 3 Yogyakarta"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-md hover:bg-skagata-800/80 flex items-center justify-center text-slate-200 hover:text-white transition"
              title="Instagram Resmi @smkn3jogja"
              aria-label="Instagram SMKN 3 Yogyakarta"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-md hover:bg-skagata-800/80 flex items-center justify-center text-slate-200 hover:text-red-400 transition"
              title="YouTube Skagata TV"
              aria-label="YouTube Skagata TV"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={socialLinks.email}
              className="w-6 h-6 rounded-md hover:bg-skagata-800/80 flex items-center justify-center text-slate-200 hover:text-white transition"
              title="Kirim Email Resmi"
              aria-label="Email Resmi SMKN 3 Yogyakarta"
            >
              <MailIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="pl-2 border-l border-skagata-700">
            <ThemeToggle className="!p-1 !bg-skagata-800/80 !border-skagata-700 !text-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
