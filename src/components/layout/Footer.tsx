"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ChevronRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useCMS } from "@/lib/store";
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, MailIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  const { schoolInfo, socialLinks } = useCMS();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-14 pb-8 border-t border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Accessible Section Heading for Screen Readers & Heading Sequence */}
        <h2 className="sr-only">Informasi Tambahan & Tautan Footer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 reveal-up">
          {/* Identity & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-skagata-800 flex items-center justify-center p-1 text-white shadow-md">
                <img
                  src="/media/school/logo.webp"
                  alt="Logo SMKN 3 Yogyakarta"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-extrabold text-white text-base block">
                  SMK NEGERI 3 YOGYAKARTA
                </span>
                <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">
                  STM 2 Jetis • Pusat Keunggulan
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Sekolah Menengah Kejuruan Pusat Keunggulan (SMK-PK) di D.I. Yogyakarta dengan 8 Program Keahlian, Pembinaan Karakter Berbasis Ketarunaan, serta Jaringan Kerja Sama Industri Nasional & Global.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{schoolInfo.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Telepon: {schoolInfo.phone} | Fax: {schoolInfo.fax}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Email: {schoolInfo.email}</span>
              </p>
            </div>

            {/* 5 Official Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                Kanal Komunikasi Resmi:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="Facebook Resmi SMKN 3 Yogyakarta"
                  aria-label="Facebook SMKN 3 Yogyakarta"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="Twitter / X Resmi SMKN 3 Yogyakarta"
                  aria-label="Twitter SMKN 3 Yogyakarta"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="Instagram Resmi @smkn3jogja"
                  aria-label="Instagram SMKN 3 Yogyakarta"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500 hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="YouTube Skagata TV"
                  aria-label="YouTube Skagata TV"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.email}
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="Email Resmi"
                  aria-label="Email Resmi SMKN 3 Yogyakarta"
                >
                  <MailIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Institutional Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Tautan Institusi
            </h3>
            <ul className="text-xs space-y-2">
              <li>
                <a
                  href="https://bursakerjasmk.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5 font-medium text-emerald-300"
                  aria-label="Portal Nasional Bursa Kerja SMK (Kemendikbud)"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Bursa Kerja SMK Nasional (Kemdikbud)</span>
                </a>
              </li>
              <li>
                <a
                  href="http://kelasiber.skagata.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>LMS Kelasiber Skagata</span>
                </a>
              </li>
              <li>
                <a
                  href="http://email.smkn3jogja.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Email Sekolah sch.id</span>
                </a>
              </li>
              <li>
                <a
                  href="https://kamimendengar.skagata.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Skagata Mendengar (WBS)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://forms.gle/4ieEgX1dudo8ULyV9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Legalisasi Ijazah Online</span>
                </a>
              </li>
              <li>
                <a
                  href="https://bnsp.go.id/detaillsp?id=1008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>LSP P1 SMKN 3 Yogyakarta (BNSP)</span>
                </a>
              </li>
              <li>
                <a
                  href="http://tefa.skagata.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Teaching Factory (TEFA) & BLUD</span>
                </a>
              </li>
              <li>
                <a
                  href="http://smm.smkn3jogja.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>SIMPAN JAMU (Penjaminan Mutu)</span>
                </a>
              </li>
              <li>
                <Link
                  href="/profil/sejarah"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Sejarah Perjalanan STM 2 Jetis</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional & National Stakeholders */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Mitra & Instansi
            </h3>
            <ul className="text-xs space-y-2">
              <li>
                <a
                  href="https://belajar.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  Akun Pembelajaran Belajar.id
                </a>
              </li>
              <li>
                <a
                  href="https://belajar.kemdikbud.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  Rumah Belajar Kemdikbud
                </a>
              </li>
              <li>
                <a
                  href="https://balaidikmenjogja.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  Balai Dikmen Kota Yogyakarta
                </a>
              </li>
              <li>
                <a
                  href="https://dikpora.jogjaprov.go.id/web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  Disdikpora D.I. Yogyakarta
                </a>
              </li>
              <li>
                <a
                  href="https://smk.kemdikbud.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  Ditjen PSMK Kemendikbud
                </a>
              </li>
              <li>
                <a
                  href="https://vokasi.kemdikbud.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  Ditjen Vokasi Kemendikbud
                </a>
              </li>
              <li>
                <a
                  href="https://jdih.kemdikbud.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  JDIH Kemdikbudristek
                </a>
              </li>
              <li>
                <a
                  href="https://www.uny.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  Universitas Negeri Yogyakarta
                </a>
              </li>
              <li>
                <a
                  href="https://www.ugm.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition block"
                >
                  Universitas Gadjah Mada
                </a>
              </li>
            </ul>
          </div>

          {/* Campus Map Location */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
                Lokasi Kampus
              </h3>
              <a
                href={schoolInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Buka Maps</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-800 shadow-lg relative group bg-slate-900">
              <iframe
                src={schoolInfo.embedMaps || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31624.921533353023!2d110.366028!3d-7.777609!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x34bffdcc5d618a71!2sSMK%20Negeri%203%20Jogja!5e0!3m2!1sen!2sid!4v1627018081002!5m2!1sen!2sid"}
                className="w-full h-full border-0"
                loading="lazy"
                title="Peta Lokasi SMKN 3 Yogyakarta"
                allowFullScreen
              />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-slate-300 flex items-center justify-between pointer-events-none">
                <span>Jetis, ± 1 Km utara Tugu Jogja</span>
                <span className="text-emerald-400 font-semibold">Rute &rarr;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 font-medium gap-3">
          <p>&copy; 2026 SMK Negeri 3 Yogyakarta (SKAGATA). Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              SMK Pusat Keunggulan DIY
            </span>
            <span>•</span>
            <span className="text-slate-300 font-medium">Powered by Tim ICT & Humas Skagata</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
