import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Award,
  Users,
  CheckCircle,
  Briefcase,
  Building,
  Wrench,
  Sparkles,
  ArrowRight,
  FileSignature,
  Camera,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { MAJORS_DATA } from "@/lib/data-initial";
import TiltCard from "@/components/3d/TiltCard";
import MajorGalleryLightbox from "@/components/jurusan/MajorGalleryLightbox";

export function generateStaticParams() {
  return MAJORS_DATA.map((m) => ({
    slug: m.slug,
  }));
}

export default function MajorDetailPage({ params }: { params: { slug: string } }) {
  const major = MAJORS_DATA.find((m) => m.slug === params.slug);

  if (!major) {
    notFound();
  }

  return (
    <div className="bg-slate-50 py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 reveal-down">
          <Link href="/" className="hover:text-skagata-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/jurusan" className="hover:text-skagata-700">8 Program Keahlian</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800">{major.name}</span>
        </nav>

        {/* Hero Showcase with Authentic Workshop Photo */}
        <div className="bg-gradient-to-br from-slate-900 via-skagata-950 to-emerald-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden mb-12 border border-emerald-500/20 interactive-card reveal-up">
          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:items-center">
            {/* Left Col: Info & Accreditations */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${major.colorBadge} shadow-sm`}>
                  Program {major.code}
                </span>
                <span className="bg-white/10 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-white/15 backdrop-blur-sm">
                  {major.accreditation}
                </span>
                <span className="font-serif text-emerald-300 text-lg sm:text-xl pl-2">
                  {major.aksara}
                </span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl leading-tight text-white tracking-tight">
                {major.name}
              </h1>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                {major.tagline} — {major.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{major.totalStudents} Taruna Aktif</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>LSP P1 BNSP & DUDIKA</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <Camera className="w-4 h-4 text-teal-400" />
                  <span>{major.gallery.length} Galeri Bengkel</span>
                </span>
              </div>
            </div>

            {/* Right Col: Authentic 3D Tilt Card Photo */}
            <div className="lg:col-span-5">
              <TiltCard className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 relative group bg-slate-900">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={major.coverImage}
                    alt={`Bengkel ${major.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20" />

                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-skagata-900/90 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Bengkel Resmi STM 2 Jetis</span>
                  </div>

                  {/* Caption bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                      Suasana Praktik Kejuruan
                    </span>
                    <h3 className="font-display font-bold text-sm text-slate-100 truncate">
                      {major.name}
                    </h3>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Competencies, Gallery, Facilities, Works */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Kompetensi Keahlian */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm interactive-card reveal-left delay-1">
              <div className="flex items-center gap-2 text-skagata-700 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                  Kompetensi Utama yang Dipelajari
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {major.competencies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-relaxed hover:bg-emerald-50/40 transition"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. DEDICATED AUTHENTIC WORKSHOP GALLERY LIGHTBOX */}
            <MajorGalleryLightbox
              gallery={major.gallery}
              majorName={major.name}
              majorCode={major.code}
            />

            {/* 3. Sarana & Fasilitas Bengkel */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm interactive-card reveal-left delay-2">
              <div className="flex items-center gap-2 text-skagata-700 mb-4">
                <Wrench className="w-5 h-5 text-emerald-600" />
                <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                  Fasilitas Bengkel & Laboratorium Kejuruan
                </h2>
              </div>
              <ul className="space-y-3">
                {major.facilities.map((fac, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{fac}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Karya Unggulan Taruna dengan Gambar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm interactive-card reveal-left delay-3">
              <div className="flex items-center gap-2 text-skagata-700 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                  Karya, Inovasi & Prestasi Taruna
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {major.studentWorks.map((work, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden border border-emerald-200/80 bg-emerald-50/40 flex flex-col justify-between hover:shadow-md transition"
                  >
                    {work.image && (
                      <div className="h-36 w-full overflow-hidden bg-slate-900">
                        <img
                          src={work.image}
                          alt={work.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-display font-bold text-sm text-slate-900 block">
                          {work.title}
                        </span>
                        <p className="text-xs text-slate-600 mt-1 font-light leading-relaxed">
                          {work.description}
                        </p>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold mt-3 uppercase tracking-wider block">
                        Karya Praktik Riil
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Head of Major, Career & DUDIKA Partners */}
          <div className="lg:col-span-4 space-y-6 reveal-right delay-2">
            {/* Profil Ketua Konsentrasi */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden mx-auto shadow-md border-2 border-emerald-500/30 mb-3 bg-slate-100">
                <img
                  src={
                    major.headOfMajorPhoto ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                  }
                  alt={major.headOfMajor}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Ketua Konsentrasi Keahlian
              </span>
              <h3 className="font-display font-bold text-base text-slate-900 mt-1">
                {major.headOfMajor}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-light">
                Program Keahlian {major.name}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Asesor BNSP</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Instruktur Vokasi</span>
                </div>
              </div>
            </div>

            {/* Prospek Karir */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-skagata-700 mb-4">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-base text-slate-900">
                  Prospek Karir & Profesi
                </h3>
              </div>
              <ul className="space-y-2.5">
                {major.careerProspects.map((cp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{cp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mitra Industri DUDIKA */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-skagata-700 mb-4">
                <Building className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-base text-slate-900">
                  Mitra Industri (DUDIKA)
                </h3>
              </div>
              <div className="space-y-2">
                {major.industryPartners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center justify-between"
                  >
                    <span>{partner}</span>
                    <span className="text-[10px] text-emerald-600 uppercase font-bold">Mitra MoU</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SPMB Call to Action */}
            <div className="bg-gradient-to-br from-emerald-800 to-skagata-900 text-white rounded-3xl p-6 shadow-md text-center space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-300">
                Tertarik Bergabung?
              </span>
              <h4 className="font-display font-black text-lg text-white">
                Daftar SPMB 2026 di {major.name}
              </h4>
              <p className="text-xs text-slate-200">
                Pilih konsentrasi {major.code} pada jalur seleksi zonasi, prestasi, atau afirmasi D.I. Yogyakarta.
              </p>
              <Link
                href="/kabar?category=SPMB"
                className="w-full py-2.5 bg-white hover:bg-emerald-50 text-skagata-900 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
              >
                <FileSignature className="w-4 h-4 text-emerald-700" />
                <span>Info Syarat & Berkas Pendaftaran</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
