"use client";

import React from "react";
import Link from "next/link";
import { Users, ChevronRight, UserCheck, Shield, Award, Briefcase, GraduationCap } from "lucide-react";
import { useCMS } from "@/lib/store";
import { SCHOOL_INFO } from "@/lib/data-initial";

export default function StrukturOrganisasiPage() {
  const { profile, majors, teachers } = useCMS();
  const headmasterName = teachers.find((t) => /kepala sekolah/i.test(t.role))?.name || SCHOOL_INFO.headmaster;

  const leadership = [
    {
      role: "Kepala Sekolah",
      name: headmasterName,
      nip: "19680512 199403 1 008",
      color: "border-emerald-500 bg-emerald-50 text-emerald-900",
    },
    {
      role: "Komite Sekolah",
      name: "Drs. H. Sukardi",
      nip: "Tokoh Masyarakat & DUDIKA",
      color: "border-amber-500 bg-amber-50 text-amber-900",
    },
  ];

  const vicePrincipals = [
    {
      role: "Wakil Kepala Sekolah Bidang Kurikulum",
      name: "Drs. Agus Triyono, M.T.",
      task: "Pengembangan Kurikulum Industri, Pembelajaran & Ujian",
    },
    {
      role: "Wakil Kepala Sekolah Bidang Kesiswaan & Ketarunaan",
      name: "Budi Santosa, S.Pd., M.Eng.",
      task: "Pembinaan Karakter Taruna, Kedisiplinan & Ekstrakurikuler",
    },
    {
      role: "Wakil Kepala Sekolah Bidang Humas & Hubin",
      name: "Rina Wijayanti, S.Pd., M.Hum.",
      task: "Kemitraan DUDIKA, Prakerin/PKL, Penyaluran Karir & Skagata TV",
    },
    {
      role: "Wakil Kepala Sekolah Bidang Sarana & Prasarana",
      name: "Heri Purwanto, S.T.",
      task: "Pengelolaan Bengkel CNC, Laboratorium, Gedung & Fasilitas",
    },
  ];

  const departmentList = (majors && majors.length > 0 ? majors : [
    { code: "BP", name: "Broadcasting & Perfilman", slug: "broadcasting-dan-perfilman" },
    { code: "TJKT", name: "Teknik Jaringan Komputer & Telko", slug: "teknik-jaringan-komputer-dan-telekomunikasi" },
    { code: "DPIB", name: "Desain Pemodelan & Info Bangunan", slug: "desain-pemodelan-dan-informasi-bangunan" },
    { code: "TKP", name: "Teknik Konstruksi & Perumahan", slug: "teknik-konstruksi-dan-perumahan" },
    { code: "TE", name: "Teknik Elektronika", slug: "teknik-elektronika" },
    { code: "TITL", name: "Teknik Ketenagalistrikan", slug: "teknik-ketenagalistrikan" },
    { code: "TKRO", name: "Teknik Kendaraan Ringan Otomotif", slug: "teknik-kendaraan-ringan-otomotif" },
    { code: "TP", name: "Teknik Pemesinan", slug: "teknik-pemesinan" },
  ]);

  return (
    <div className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 reveal-down">
          <Link href="/" className="hover:text-skagata-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Profil</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800">Struktur Organisasi</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10 text-center max-w-3xl mx-auto reveal-up interactive-card">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
            Tata Kelola Sekolah
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-2">
            Bagan Struktur Organisasi SKAGATA
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 font-light">
            Hierarki kepemimpinan dan manajerial SMK Negeri 3 Yogyakarta dalam mewujudkan layanan prima pendidikan vokasi.
          </p>
        </div>

        {/* Tree View Bagan */}
        <div className="space-y-8">
          {/* Level 1: Kepala Sekolah & Komite */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
            {leadership.map((lead, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 border-2 ${lead.color} shadow-sm transition interactive-card text-center flex flex-col justify-between reveal-up delay-${idx + 1}`}
              >
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">{lead.role}</span>
                <h3 className="font-display font-black text-xl mt-1">{lead.name}</h3>
                <p className="text-xs opacity-70 mt-0.5">{lead.nip}</p>
              </div>
            ))}
          </div>

          {/* Connector line */}
          <div className="w-0.5 h-8 bg-slate-300 mx-auto" />

          {/* Level 2: 4 Wakil Kepala Sekolah */}
          <div>
            <div className="text-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Pimpinan Pembantu Pelaksana (Wakil Kepala Sekolah)
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vicePrincipals.map((vp, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mb-3">
                      {idx + 1}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      {vp.role}
                    </span>
                    <h4 className="font-display font-bold text-sm text-slate-900 mt-1">
                      {vp.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100">
                    {vp.task}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Connector line */}
          <div className="w-0.5 h-8 bg-slate-300 mx-auto" />

          {/* Level 3: 8 Kepala Konsentrasi Keahlian */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                Ketua Program & Konsentrasi Keahlian
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 mt-2">
                8 Konsentrasi Keahlian Vokasi
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {departmentList.map((dept) => (
                <Link
                  key={dept.code}
                  href={`/jurusan/${dept.slug || ""}`}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition flex items-center gap-2.5"
                >
                  <span className="w-8 h-8 rounded-lg bg-skagata-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {dept.code}
                  </span>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-xs text-slate-900 truncate">
                      {dept.name}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      {(dept as any).headOfMajor ? `Ka: ${(dept as any).headOfMajor}` : "Konsentrasi Kejuruan"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
