"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit3, Check, X, Users, UserCheck } from "lucide-react";
import { useCMS } from "@/lib/store";
import { TeacherStaffData } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

export default function AdminSDMPage() {
  const { teachers, updateTeachers } = useCMS();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    nip: "",
    role: "Guru Produktif",
    department: "Teknik Pemesinan",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  });

  const resetForm = () => {
    setForm({
      name: "",
      nip: "",
      role: "Guru Produktif",
      department: "Teknik Pemesinan",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (t: TeacherStaffData) => {
    setForm({
      name: t.name,
      nip: t.nip,
      role: t.role,
      department: t.department,
      photo: t.photo,
    });
    setEditingId(t.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data pendidik ini?")) {
      updateTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTeachers(
        teachers.map((t) => (t.id === editingId ? { ...t, ...form } : t))
      );
    } else {
      const newTeacher: TeacherStaffData = {
        id: `tch-${Date.now()}`,
        ...form,
      };
      updateTeachers([...teachers, newTeacher]);
    }
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-display font-black text-2xl text-slate-900">
            Direktori Guru & Tenaga Kependidikan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola data kepala sekolah, wakasek, kepala program, serta guru dan tendik.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data Pendidik</span>
          </button>
        )}
      </div>

      {/* Form Add / Edit */}
      {isAdding && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-400 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h2 className="font-display font-bold text-base text-slate-900">
              {editingId ? "Edit Pendidik" : "Tambah Pendidik Baru"}
            </h2>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama lengkap..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">NIP (Nomor Induk Pegawai)</label>
                <input
                  type="text"
                  required
                  value={form.nip}
                  onChange={(e) => setForm({ ...form, nip: e.target.value })}
                  placeholder="19xxxxxxxx..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Jabatan / Peran</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Guru Produktif / Wakasek / dll"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Unit / Bagian</label>
                <input
                  type="text"
                  required
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  placeholder="Nama Jurusan atau Bagian"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-1">
              <ImageUploadInput
                label="Foto Profil Guru / Tenaga Kependidikan"
                value={form.photo}
                onChange={(newUrl) => setForm({ ...form, photo: newUrl })}
                helperText="Unggah pasfoto resmi guru/staf dari penyimpanan laptop/HP."
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
                <span>Simpan</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teachers List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {teacher.department}
                </span>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1">
                  {teacher.name}
                </h3>
                <p className="text-xs text-slate-500">{teacher.role} • NIP: {teacher.nip}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(teacher)}
                className="p-2 text-slate-500 hover:text-emerald-600 rounded-xl"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(teacher.id)}
                className="p-2 text-slate-400 hover:text-red-600 rounded-xl"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
