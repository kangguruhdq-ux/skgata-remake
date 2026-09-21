"use client";

import React, { useState } from "react";
import { Edit3, Check, X, Layers, Users, Award, UserCheck, ShieldCheck } from "lucide-react";
import { useCMS } from "@/lib/store";
import { MajorData } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

const DEFAULT_TEACHER_PHOTO = "/media/school/staff-331f777f37.webp";

export default function AdminJurusanPage() {
  const { majors, updateMajors, teachers } = useCMS();
  const [editingMajor, setEditingMajor] = useState<MajorData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    totalStudents: 288,
    coverImage: "",
    headOfMajor: "",
    headOfMajorPhoto: DEFAULT_TEACHER_PHOTO,
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
      headOfMajor: major.headOfMajor || "",
      headOfMajorPhoto: major.headOfMajorPhoto || DEFAULT_TEACHER_PHOTO,
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
      headOfMajor: "",
      headOfMajorPhoto: DEFAULT_TEACHER_PHOTO,
      gallery: [],
      competencies: [],
      careerProspects: [],
      industryPartners: [],
      facilities: [],
      studentWorks: [],
    });
    setForm({
      name: "",
      tagline: "",
      description: "",
      totalStudents: 0,
      coverImage: "",
      headOfMajor: "",
      headOfMajorPhoto: DEFAULT_TEACHER_PHOTO,
    });
  };

  const handleQuickSelectTeacher = (teacherId: string) => {
    if (!teacherId) return;
    const selected = teachers.find((t) => t.id === teacherId);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        headOfMajor: selected.name,
        headOfMajorPhoto: selected.photo || DEFAULT_TEACHER_PHOTO,
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMajor || !form.name.trim()) return;

    const changes = {
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      totalStudents: Number(form.totalStudents) || 0,
      coverImage: form.coverImage,
      headOfMajor: form.headOfMajor.trim(),
      headOfMajorPhoto: form.headOfMajorPhoto,
    };

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
    if (confirm("Hapus program keahlian ini dari seluruh halaman web?")) {
      updateMajors(majors.filter((major) => major.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-slate-900">Manajemen 8 Program Keahlian</h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola nama jurusan, deskripsi, foto bengkel, jumlah taruna, serta nama & foto Guru / Ketua Konsentrasi.
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm w-fit"
        >
          <span className="text-base leading-none">+</span>
          <span>Tambah Jurusan</span>
        </button>
      </div>

      {/* Edit Modal */}
      {editingMajor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="font-display font-bold text-base text-slate-900">
                  {isCreating ? "Tambah Program Keahlian Baru" : `Edit Jurusan: ${editingMajor.name} (${editingMajor.code})`}
                </h2>
                <p className="text-[11px] text-slate-400">
                  Perubahan akan langsung sinkron ke halaman beranda dan halaman detail kejuruan.
                </p>
              </div>
              <button
                onClick={() => { setEditingMajor(null); setIsCreating(false); }}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Konsentrasi Keahlian</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Contoh: Teknik Pemesinan (TP)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
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
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tagline Singkat Keunggulan</label>
                <input
                  type="text"
                  required
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="Contoh: Pusat Keunggulan Manufaktur & CNC Machining Berstandar Jerman"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              {/* SECTION: GURU / KETUA KONSENTRASI KEAHLIAN */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-xs uppercase tracking-wider">
                    Ketua Konsentrasi Keahlian / Guru Pengampu
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Nama dan foto ini ditampilkan di kartu profil ketua jurusan pada halaman detail jurusan publik.
                </p>

                {/* Quick picker from existing teachers */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Pilih Cepat dari Direktori Guru ({teachers.length} Guru Terdaftar)
                  </label>
                  <select
                    onChange={(e) => handleQuickSelectTeacher(e.target.value)}
                    defaultValue=""
                    className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                  >
                    <option value="" disabled>-- Pilih Guru untuk Isi Otomatis Nama & Foto --</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.role} - {t.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Nama Guru / Ketua Konsentrasi
                    </label>
                    <input
                      type="text"
                      required
                      value={form.headOfMajor}
                      onChange={(e) => setForm({ ...form, headOfMajor: e.target.value })}
                      placeholder="Contoh: Drs. Bambang Sutrisno, M.T."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <ImageUploadInput
                      label="Foto Guru / Ketua Konsentrasi"
                      value={form.headOfMajorPhoto}
                      onChange={(newUrl) => setForm({ ...form, headOfMajorPhoto: newUrl })}
                      helperText="Unggah pasfoto guru dari penyimpanan atau paste URL."
                    />
                  </div>
                </div>
              </div>

              {/* Cover Bengkel Photo */}
              <div className="pt-1">
                <ImageUploadInput
                  label="Foto Utama / Cover Bengkel Jurusan"
                  value={form.coverImage}
                  onChange={(newUrl) => setForm({ ...form, coverImage: newUrl })}
                  helperText="Unggah foto suasana bengkel kejuruan dari penyimpanan laptop/HP."
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi Lengkap Program Keahlian</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
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
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                <img
                  src={major.coverImage}
                  alt={major.name}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded shadow ${major.colorBadge}`}>
                  {major.code}
                </span>
              </div>

              <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                {major.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{major.tagline}</p>
              
              {/* Teacher info badge */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-emerald-400/50 shrink-0">
                  <img
                    src={major.headOfMajorPhoto || DEFAULT_TEACHER_PHOTO}
                    alt={major.headOfMajor || "Guru"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block leading-none">
                    Ketua / Guru
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800 truncate block mt-0.5" title={major.headOfMajor}>
                    {major.headOfMajor || "Belum diatur"}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-emerald-600 font-semibold mt-2">
                {major.totalStudents} Taruna Aktif
              </p>
            </div>

            <div className="mt-4 space-y-1.5">
              <button
                onClick={() => handleEditClick(major)}
                className="w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200/80"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Jurusan & Guru</span>
              </button>
              <button
                onClick={() => handleDelete(major.id)}
                className="w-full py-1.5 text-rose-600 hover:bg-rose-50 rounded-xl text-[11px] font-medium transition flex items-center justify-center gap-1"
              >
                <span>×</span>
                <span>Hapus Jurusan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
