"use client";

import React, { useState } from "react";
import { Edit3, Check, X, Layers, Users, Award } from "lucide-react";
import { useCMS } from "@/lib/store";
import { MajorData } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

export default function AdminJurusanPage() {
  const { majors, updateMajors } = useCMS();
  const [editingMajor, setEditingMajor] = useState<MajorData | null>(null);

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    totalStudents: 288,
    coverImage: "",
  });

  const handleEditClick = (major: MajorData) => {
    setEditingMajor(major);
    setForm({
      name: major.name,
      tagline: major.tagline,
      description: major.description,
      totalStudents: major.totalStudents,
      coverImage: major.coverImage,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMajor) return;

    const updated = majors.map((m) =>
      m.id === editingMajor.id
        ? {
            ...m,
            name: form.name,
            tagline: form.tagline,
            description: form.description,
            totalStudents: Number(form.totalStudents),
            coverImage: form.coverImage,
          }
        : m
    );

    updateMajors(updated);
    setEditingMajor(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="font-display font-black text-2xl text-slate-900">
          Manajemen 8 Program Keahlian
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Sesuaikan profil kompetensi, deskripsi, foto fasilitas bengkel, dan data taruna masing-masing jurusan.
        </p>
      </div>

      {/* Edit Modal */}
      {editingMajor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-display font-bold text-base text-slate-900">
                Edit Jurusan: {editingMajor.name} ({editingMajor.code})
              </h2>
              <button
                onClick={() => setEditingMajor(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Konsentrasi</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tagline Singkat</label>
                <input
                  type="text"
                  required
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div className="pt-1">
                <ImageUploadInput
                  label="Foto Utama / Cover Bengkel Jurusan"
                  value={form.coverImage}
                  onChange={(newUrl) => setForm({ ...form, coverImage: newUrl })}
                  helperText="Unggah foto suasana bengkel kejuruan dari penyimpanan laptop/HP."
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Jumlah Taruna Aktif</label>
                <input
                  type="number"
                  required
                  value={form.totalStudents}
                  onChange={(e) => setForm({ ...form, totalStudents: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMajor(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid Jurusan */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {majors.map((major) => (
          <div
            key={major.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-100 mb-3">
                <img
                  src={major.coverImage}
                  alt={major.name}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded ${major.colorBadge}`}>
                  {major.code}
                </span>
              </div>

              <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                {major.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{major.tagline}</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-2">
                {major.totalStudents} Taruna Aktif
              </p>
            </div>

            <button
              onClick={() => handleEditClick(major)}
              className="mt-4 w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200/80"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Data Jurusan</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
