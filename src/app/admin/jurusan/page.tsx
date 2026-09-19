"use client";

import React, { useState } from "react";
import { Edit3, Check, X, Layers, Users, Award } from "lucide-react";
import { useCMS } from "@/lib/store";
import { MajorData } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

export default function AdminJurusanPage() {
  const { majors, updateMajors } = useCMS();
  const [editingMajor, setEditingMajor] = useState<MajorData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    totalStudents: 288,
    coverImage: "",
  });

  const handleEditClick = (major: MajorData) => {
    setIsCreating(false);
    setEditingMajor(major);
    setForm({
      name: major.name,
      tagline: major.tagline,
      description: major.description,
      totalStudents: major.totalStudents,
      coverImage: major.coverImage,
    });
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setEditingMajor({
      ...majors[0],
      id: "",
      code: "BARU",
      name: "",
      slug: "",
      tagline: "",
      description: "",
      totalStudents: 0,
      coverImage: "",
      gallery: [],
      competencies: [],
      careerProspects: [],
      industryPartners: [],
      facilities: [],
      studentWorks: [],
    });
    setForm({ name: "", tagline: "", description: "", totalStudents: 0, coverImage: "" });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMajor || !form.name.trim()) return;
    const changes = { name: form.name.trim(), tagline: form.tagline.trim(), description: form.description.trim(), totalStudents: Number(form.totalStudents) || 0, coverImage: form.coverImage };
    if (isCreating) {
      const slug = form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const code = slug.split("-").map((part) => part[0]).join("").slice(0, 5).toUpperCase() || `M${majors.length + 1}`;
      updateMajors([...majors, { ...editingMajor, ...changes, id: `major-${Date.now()}`, code, slug }]);
    } else {
      updateMajors(majors.map((m) => (m.id === editingMajor.id ? { ...m, ...changes } : m)));
    }
    setEditingMajor(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (majors.length <= 1) return;
    if (confirm("Hapus program keahlian ini dari seluruh halaman web?")) updateMajors(majors.filter((major) => major.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-slate-900">Manajemen Program Keahlian</h1>
          <p className="text-xs text-slate-500 mt-1">Kelola nama, deskripsi, foto, dan jumlah taruna setiap program keahlian.</p>
        </div>
        <button onClick={handleCreateClick} className="px-4 py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm w-fit"><span className="text-base leading-none">+</span>Tambah Jurusan</button>
      </div>

      {/* Edit Modal */}
      {editingMajor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-display font-bold text-base text-slate-900">
                {isCreating ? "Tambah Program Keahlian" : `Edit Jurusan: ${editingMajor.name} (${editingMajor.code})`}
              </h2>
                <button
                  onClick={() => { setEditingMajor(null); setIsCreating(false); }}
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
                  onClick={() => { setEditingMajor(null); setIsCreating(false); }}
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
            <button onClick={() => handleDelete(major.id)} className="mt-2 w-full py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-rose-100"><span>×</span>Hapus Jurusan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
