"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Briefcase,
  Building2,
  MapPin,
  Camera,
  Globe2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useCMS } from "@/lib/store";
import { JobData, CareerSettings, DEFAULT_CAREER_SETTINGS } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

export default function AdminKarirPage() {
  const { jobs, updateJobs, careerSettings, updateCareerSettings } = useCMS();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Hero Banner & Photo State
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [heroForm, setHeroForm] = useState<CareerSettings>(careerSettings || DEFAULT_CAREER_SETTINGS);
  const [heroToast, setHeroToast] = useState(false);

  useEffect(() => {
    if (careerSettings) {
      setHeroForm(careerSettings);
    }
  }, [careerSettings]);

  // Job Listing Form State
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "Yogyakarta",
    type: "Full-Time" as "Full-Time" | "Magang Industri" | "Program Karir Jepang",
    deadline: "2026-12-31",
    description: "",
    requirements: "Lulusan SMKN 3 Yogyakarta\nSehat jasmani dan rohani\nMemiliki sertifikat kompetensi LSP P1",
    linkApply: "https://smkn3yk.sch.id/telusuri/lowongan",
  });

  const resetForm = () => {
    setForm({
      title: "",
      company: "",
      location: "Yogyakarta",
      type: "Full-Time",
      deadline: "2026-12-31",
      description: "",
      requirements: "Lulusan SMKN 3 Yogyakarta\nSehat jasmani dan rohani\nMemiliki sertifikat kompetensi LSP P1",
      linkApply: "https://smkn3yk.sch.id/telusuri/lowongan",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (j: JobData) => {
    setForm({
      title: j.title,
      company: j.company,
      location: j.location,
      type: j.type,
      deadline: j.deadline,
      description: j.description,
      requirements: j.requirements.join("\n"),
      linkApply: j.linkApply,
    });
    setEditingId(j.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus informasi lowongan kerja ini?")) {
      updateJobs(jobs.filter((j) => j.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reqArray = form.requirements.split("\n").filter((r) => r.trim());

    if (editingId) {
      updateJobs(
        jobs.map((j) =>
          j.id === editingId
            ? {
                ...j,
                ...form,
                requirements: reqArray,
              }
            : j
        )
      );
    } else {
      const newJob: JobData = {
        id: `job-${Date.now()}`,
        title: form.title,
        company: form.company,
        location: form.location,
        type: form.type,
        deadline: form.deadline,
        description: form.description,
        requirements: reqArray,
        linkApply: form.linkApply,
      };
      updateJobs([newJob, ...jobs]);
    }
    resetForm();
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateCareerSettings(heroForm);
    setHeroToast(true);
    setIsEditingHero(false);
    setTimeout(() => setHeroToast(false), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Pusat Karir & Bursa Kerja</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Bursa Kerja Khusus (BKK) & Rekrutmen
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-light">
            Kelola banner header BKK, foto dokumentasi Career Day, lowongan kerja mitra industri, walk-in interview, dan rekrutmen Jepang.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/karir"
            target="_blank"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Halaman /karir</span>
          </Link>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Lowongan</span>
            </button>
          )}
        </div>
      </div>

      {heroToast && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Pengaturan banner hero dan foto Career Day BKK berhasil disimpan dan langsung tayang!</span>
        </div>
      )}

      {/* SECTION: HERO BANNER & FOTO DOKUMENTASI CAREER DAY */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
          <div>
            <h2 className="font-display font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Banner Header & Foto Dokumentasi Career Day</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Kelola teks judul banner, tagline badge, deskripsi, dan foto kegiatan Career Day yang tampil di halaman publik /karir.
            </p>
          </div>

          <button
            onClick={() => setIsEditingHero(!isEditingHero)}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-emerald-200 w-fit"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingHero ? "Tutup Editor Banner" : "Edit Foto & Konten Banner"}</span>
          </button>
        </div>

        {/* Live Preview of BKK Hero Banner */}
        <div className="p-5 sm:p-6">
          <div className="bg-gradient-to-br from-skagata-900 via-skagata-800 to-teal-900 rounded-2xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-8 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30 inline-flex items-center gap-1">
                  <Globe2 className="w-3 h-3" />
                  <span>{heroForm.badge}</span>
                </span>
                <h3 className="font-display font-bold text-lg sm:text-2xl leading-tight">
                  {heroForm.title}
                </h3>
                <p className="text-slate-200 text-xs leading-relaxed max-w-xl font-light">
                  {heroForm.description}
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="rounded-xl overflow-hidden shadow-lg border border-white/20 aspect-[4/3] bg-slate-950 relative group">
                  <img
                    src={heroForm.photoUrl}
                    alt={heroForm.photoTitle || "Foto Career Day"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-[9px] text-amber-300 font-bold uppercase tracking-wider block">
                      {heroForm.photoBadge}
                    </span>
                    <p className="text-[10px] font-semibold truncate">{heroForm.photoTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Edit Form */}
        {isEditingHero && (
          <form onSubmit={handleSaveHero} className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50/50 space-y-4 text-xs animate-in fade-in">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Badge Tagline Banner
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.badge}
                  onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                  placeholder="Contoh: Skagata Career Center & Rekrutmen Jepang"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Judul Utama Banner BKK
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  placeholder="Contoh: Bursa Kerja Khusus (BKK) SMKN 3 Yogyakarta"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Deskripsi Banner
              </label>
              <textarea
                rows={2}
                required
                value={heroForm.description}
                onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                placeholder="Deskripsi peran BKK dalam menyalurkan alumni ke industri..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Foto Dokumentasi Career Day */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
              <ImageUploadInput
                label="Foto Dokumentasi Career Day / Job Fair"
                value={heroForm.photoUrl}
                onChange={(url) => setHeroForm({ ...heroForm, photoUrl: url })}
                placeholder="https://... atau pilih / unggah file dari komputer/HP"
                helperText="Pilih foto langsung dari laptop/HP atau pilih dari preset dokumentasi sekolah."
                presets={[
                  {
                    label: "Job Fair Gong Ceremony (Asli)",
                    url: "https://smkn3jogja.sch.id/wp-content/uploads/2025/09/Job-fair-4-260x195.jpg",
                  },
                  { label: "Dokumentasi Karir 1", url: "/media/school/karir-1.webp" },
                  { label: "Dokumentasi Karir 2", url: "/media/school/karir-2.webp" },
                  { label: "Bengkel Otomotif TEFA", url: "/media/school/otomotif-cover.webp" },
                ]}
              />

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Label Badge Foto (Kuning)
                  </label>
                  <input
                    type="text"
                    required
                    value={heroForm.photoBadge}
                    onChange={(e) => setHeroForm({ ...heroForm, photoBadge: e.target.value })}
                    placeholder="Dokumentasi Career Day"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Keterangan Foto
                  </label>
                  <input
                    type="text"
                    required
                    value={heroForm.photoTitle}
                    onChange={(e) => setHeroForm({ ...heroForm, photoTitle: e.target.value })}
                    placeholder="Walk-in Interview Bersama 40+ Mitra Industri"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingHero(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Banner & Foto BKK</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Form Add / Edit Lowongan */}
      {isAdding && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-400 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h2 className="font-display font-bold text-base text-slate-900">
              {editingId ? "Edit Lowongan" : "Tambah Lowongan BKK Baru"}
            </h2>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Posisi Lowongan</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Teknisi CNC Milling..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Perusahaan Mitra</label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="PT..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tipe Lowongan</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Program Karir Jepang">Program Karir Jepang</option>
                  <option value="Magang Industri">Magang Industri</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Lokasi Penempatan</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Batas Pendaftaran</label>
                <input
                  type="date"
                  required
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Deskripsi Singkat Pekerjaan</label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Kualifikasi (1 baris per syarat)
              </label>
              <textarea
                rows={3}
                required
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Lowongan</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List Lowongan */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="font-display font-bold text-sm sm:text-base text-slate-900">
            Daftar Lowongan Kerja BKK Terpublikasi ({jobs.length})
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Diperbarui secara live ke publik
          </span>
        </div>

        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-50 hover:bg-emerald-50/30 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
            >
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    job.type === "Program Karir Jepang"
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {job.type}
                </span>
                <h3 className="font-display font-bold text-base text-slate-900 mt-1">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {job.company} • {job.location} • Batas: {job.deadline}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition flex items-center gap-1"
                  title="Edit Lowongan"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition"
                  title="Hapus Lowongan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
