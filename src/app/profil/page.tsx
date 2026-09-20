"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  Users,
  Award,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useCMS } from "@/lib/store";

export default function ProfilPage() {
  const { profile } = useCMS();
  const identity = profile.identity;
  const [copied, setCopied] = useState(false);

  const handleCopyProfile = () => {
    const text = `
PROFIL DAN DATA POKOK SEKOLAH
Nama Sekolah: ${identity.namaSekolah}
NPSN: ${identity.npsn}
Bentuk Sekolah: ${identity.bentukSekolah}
Status Sekolah: ${identity.statusSekolah}
Alamat: ${identity.alamat}
Status Kepemilikan: ${identity.statusKepemilikan}
Nomor Telpon: ${identity.nomorTelpon}
Nomor Fax: ${identity.nomorFax}
Email: ${identity.email}
Website: ${identity.website}
Sertifikasi ISO: ${identity.sertifikasiIso}
Akses Internet: ${identity.aksesInternet}
Akreditasi: ${identity.akreditasi}
Jumlah Rombel: ${identity.jumlahRombel}
Jumlah Guru: ${identity.jumlahGuru}
Jumlah Tendik: ${identity.jumlahTendik}
Kompetensi Keahlian:
${identity.kompetensiKeahlian.map((k) => `- ${k}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const tableData = [
    { label: "Nama Sekolah", value: identity.namaSekolah, icon: Building2, highlight: true },
    { label: "NPSN", value: identity.npsn, icon: ShieldCheck, isBadge: true },
    { label: "Bentuk Sekolah", value: identity.bentukSekolah, icon: GraduationCap },
    { label: "Status Sekolah", value: identity.statusSekolah, icon: CheckCircle2, isBadge: true },
    { label: "Alamat", value: identity.alamat, icon: MapPin },
    { label: "Status Kepemilikan", value: identity.statusKepemilikan, icon: Award },
    { label: "Nomor Telpon", value: identity.nomorTelpon, icon: Phone, isPhone: true },
    { label: "Nomor Fax", value: identity.nomorFax, icon: Printer },
    { label: "Email", value: identity.email, icon: Mail, isEmail: true },
    { label: "Website", value: identity.website, icon: Globe, isLink: true },
    { label: "Sertifikasi ISO", value: identity.sertifikasiIso, icon: ShieldCheck, isBadge: true },
    { label: "Akses Internet", value: identity.aksesInternet, icon: Sparkles, isBadge: true },
    { label: "Akreditasi", value: `Akreditasi ${identity.akreditasi} (Unggul BAN-S/M)`, icon: Award, isBadge: true },
    { label: "Jumlah Rombel", value: identity.jumlahRombel, icon: Layers },
    { label: "Jumlah Guru", value: identity.jumlahGuru, icon: Users },
    { label: "Jumlah Tendik", value: identity.jumlahTendik, icon: Users },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-10 lg:py-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 reveal-down">
          <Link href="/" className="hover:text-skagata-700 dark:hover:text-emerald-400 transition">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Profil</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Identitas & Data Pokok Sekolah
          </span>
        </nav>

        {/* Header Hero Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 reveal-up overflow-hidden relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-skagata-900 border border-emerald-500/40 p-2 flex items-center justify-center flex-shrink-0 shadow-lg">
                <img
                  src="/media/school/logo.webp"
                  alt="Logo SMKN 3 Yogyakarta"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-skagata-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    NPSN {identity.npsn}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                    Akreditasi {identity.akreditasi}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                    ISO {identity.sertifikasiIso}
                  </span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
                  {identity.namaSekolah}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Sekolah Menengah Kejuruan Negeri Pusat Keunggulan (STM 2 Jetis Yogyakarta)
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-2.5 flex-shrink-0">
              <button
                onClick={handleCopyProfile}
                className="px-4 py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Data Tersalin!" : "Salin Data Profil"}</span>
              </button>
              <a
                href="https://referensi.data.kemdikbud.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <span>Verifikasi Dapodik</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Stat Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Rombongan Belajar</span>
            <span className="font-display font-black text-xl text-slate-900 dark:text-white mt-1 block">
              {identity.jumlahRombel}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Tingkat X, XI, XII</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Pendidik (Guru)</span>
            <span className="font-display font-black text-xl text-slate-900 dark:text-white mt-1 block">
              {identity.jumlahGuru}
            </span>
            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">Sertifikasi & Asesor</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Tenaga Kependidikan</span>
            <span className="font-display font-black text-xl text-slate-900 dark:text-white mt-1 block">
              {identity.jumlahTendik}
            </span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">Staf & Teknisi Lab</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Konsentrasi Keahlian</span>
            <span className="font-display font-black text-xl text-slate-900 dark:text-white mt-1 block">
              8 Jurusan
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Standar Industri 4.0</span>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-10">
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h2 className="font-display font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  Tabel Data Pokok Pendidikan
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Data resmi terdaftar pada Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <tbody>
                {tableData.map((row, idx) => {
                  const Icon = row.icon;
                  return (
                    <tr
                      key={row.label}
                      className={`border-b border-slate-100 dark:border-slate-800/80 transition ${
                        idx % 2 === 0
                          ? "bg-white dark:bg-slate-900"
                          : "bg-slate-50/40 dark:bg-slate-950/30"
                      } hover:bg-emerald-50/60 dark:hover:bg-slate-800/60`}
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-600 dark:text-slate-400 w-1/3 sm:w-1/4">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{row.label}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-900 dark:text-slate-100 font-medium">
                        {row.isBadge ? (
                          <span className="inline-block bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs">
                            {row.value}
                          </span>
                        ) : row.isPhone ? (
                          <a
                            href={`tel:${row.value}`}
                            className="text-skagata-700 dark:text-emerald-400 font-semibold hover:underline"
                          >
                            {row.value}
                          </a>
                        ) : row.isEmail ? (
                          <a
                            href={`mailto:${row.value}`}
                            className="text-skagata-700 dark:text-emerald-400 font-semibold hover:underline"
                          >
                            {row.value}
                          </a>
                        ) : row.isLink ? (
                          <a
                            href={row.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-skagata-700 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                          >
                            <span>{row.value}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className={row.highlight ? "font-bold text-slate-900 dark:text-white" : ""}>
                            {row.value}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {/* Row Khusus Kompetensi Keahlian */}
                <tr className="bg-white dark:bg-slate-900 hover:bg-emerald-50/60 dark:hover:bg-slate-800/60 transition">
                  <td className="py-4 px-4 sm:px-6 font-semibold text-slate-600 dark:text-slate-400 align-top">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>Kompetensi Keahlian</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <div className="grid sm:grid-cols-2 gap-2">
                      {identity.kompetensiKeahlian.map((jurusan, i) => (
                        <div
                          key={jurusan}
                          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {jurusan}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sub-Pages Quick Navigation */}
        <div className="space-y-4">
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">
            Eksplorasi Halaman Profil Sekolah
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            <Link
              href="/profil/sambutan"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition group"
            >
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Pimpinan & Visi
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                Sambutan Kepala Sekolah &rarr;
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pesan dan arah kebijakan pendidikan Skagata
              </p>
            </Link>

            <Link
              href="/profil/sejarah"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition group"
            >
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Sejarah 1952
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                Rekam Jejak STM 2 Jetis &rarr;
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tujuh dekade mencetak teknisi unggul Indonesia
              </p>
            </Link>

            <Link
              href="/profil/visi-misi"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition group"
            >
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Landasan Mutu
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                Visi, Misi & 4 Pilar &rarr;
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Ketarunaan, Kewirausahaan, Teknologi & Budaya
              </p>
            </Link>

            <Link
              href="/profil/fasilitas"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition group"
            >
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Sarana Prasarana
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                Fasilitas Bengkel & Lab &rarr;
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Bengkel CNC, Studio TV, Lab IoT, dan Spooring 3D
              </p>
            </Link>

            <Link
              href="/profil/sdm"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition group"
            >
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Direktori Staf
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                Guru & Tenaga Kependidikan &rarr;
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Daftar lengkap pendidik profesional Skagata
              </p>
            </Link>

            <Link
              href="/jurusan"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition group"
            >
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Akademik Vokasi
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                8 Program Keahlian &rarr;
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Kurikulum industri dan prospek karir tamatan
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
