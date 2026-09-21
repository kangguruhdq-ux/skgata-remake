"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  Building2,
  Globe2,
  Send,
} from "lucide-react";
import { JOBS_DATA } from "@/lib/data-initial";
import { useCMS } from "@/lib/store";

export default function KarirPage() {
  const { jobs } = useCMS();
  const [filterType, setFilterType] = useState("Semua");
  const [submitted, setSubmitted] = useState(false);

  const types = ["Semua", "Full-Time", "Program Karir Jepang", "Magang Industri"];

  const jobList = jobs && jobs.length > 0 ? jobs : JOBS_DATA;

  const filteredJobs = jobList.filter((job) => {
    return filterType === "Semua" || job.type === filterType;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-skagata-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800">Bursa Kerja Khusus (BKK)</span>
        </nav>

        {/* Hero Header with Authentic Job Fair Photo */}
        <div className="bg-gradient-to-br from-skagata-900 via-skagata-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Skagata Career Center & Rekrutmen Jepang</span>
              </span>

              <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl leading-tight">
                Bursa Kerja Khusus (BKK) SMKN 3 Yogyakarta
              </h1>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
                Menghubungkan langsung taruna tingkat akhir dan alumni STM 2 Jetis dengan dunia usaha dan industri (DUDIKA) terkemuka nasional serta program karir formal ke Tokyo & Osaka, Jepang.
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-[4/3] bg-slate-950 group">
                <img
                  src="https://smkn3jogja.sch.id/wp-content/uploads/2025/09/Job-fair-4-260x195.jpg"
                  alt="Career Day & Rekrutmen Kerja SMKN 3 Yogyakarta"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                    Dokumentasi Career Day
                  </span>
                  <p className="text-[11px] font-semibold truncate">Walk-in Interview Bersama 40+ Mitra Industri</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Types */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-xs px-4 py-2 rounded-xl font-bold transition ${
                  filterType === type
                    ? "bg-skagata-700 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <a
            href="https://smkn3yk.sch.id/telusuri/lowongan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-skagata-700 hover:underline flex items-center gap-1"
          >
            <span>Kunjungi Portal Bursa Kerja SMK</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Lowongan Grid & Registrasi */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Job List */}
          <div className="lg:col-span-8 space-y-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition interactive-card space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        job.type === "Program Karir Jepang"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {job.type}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 mt-2">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{job.company}</span>
                    </p>
                  </div>

                  <div className="text-right text-xs text-slate-400 space-y-1">
                    <div className="flex items-center gap-1 text-slate-600 justify-end">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Batas: {job.deadline}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {job.description}
                </p>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">
                    Kualifikasi Utama:
                  </span>
                  <div className="grid sm:grid-cols-2 gap-1.5">
                    {job.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Status: <span className="text-emerald-600 font-semibold">Aktif Pendaftaran</span>
                  </span>
                  <a
                    href={job.linkApply}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>Lamar Lowongan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Registration / Career Counseling Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-skagata-700">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-base text-slate-900">
                  Daftar Talenta Alumni
                </h3>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Taruna tingkat akhir atau alumni STM 2 Jetis? Daftarkan profil Anda di database BKK untuk mendapatkan notifikasi rekrutmen kerja cepat.
              </p>

              {submitted ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs border border-emerald-200">
                  Terima kasih! Data talenta Anda telah tercatat di BKK SMKN 3 Yogyakarta. Petugas BKK akan menghubungi Anda untuk proses seleksi.
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama taruna/alumni..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Program Keahlian</label>
                    <select
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                    >
                      <option value="">Pilih Jurusan...</option>
                      <option value="BP">Broadcasting & Perfilman (BP)</option>
                      <option value="TJKT">Teknik Jaringan Komputer & Telko (TJKT)</option>
                      <option value="DPIB">Desain Pemodelan & Info Bangunan (DPIB)</option>
                      <option value="TKP">Teknik Konstruksi & Perumahan (TKP)</option>
                      <option value="TE">Teknik Elektronika (TE)</option>
                      <option value="TITL">Teknik Ketenagalistrikan (TITL)</option>
                      <option value="TKRO">Teknik Kendaraan Ringan Otomotif (TKRO)</option>
                      <option value="TP">Teknik Pemesinan (TP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tahun Lulus / Kelas</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 2026 atau Kelas XII"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nomor WhatsApp Aktif</label>
                    <input
                      type="tel"
                      required
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Data Talenta BKK</span>
                  </button>
                </form>
              )}
            </div>

            {/* Hubungi BKK */}
            <div className="bg-slate-100 p-5 rounded-3xl border border-slate-200 text-xs space-y-2 text-slate-600">
              <span className="font-bold text-slate-900 block">Kontak Khusus BKK SKAGATA:</span>
              <p>Ruang BKK Kampus SMKN 3 Yogyakarta</p>
              <p>Telepon: (0274) 513503 Ext. BKK</p>
              <p>Email: bkk@smkn3jogja.sch.id</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
