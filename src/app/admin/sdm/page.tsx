"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, Edit3, Check, X, Users, UserCheck, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useCMS } from "@/lib/store";
import { TeacherStaffData } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

const DEFAULT_PHOTO = "/media/school/staff-331f777f37.webp";
const ITEMS_PER_PAGE = 25;

export default function AdminSDMPage() {
  const { teachers, updateTeachers } = useCMS();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    nip: "",
    role: "Guru Produktif",
    department: "Teknik Pemesinan",
    photo: DEFAULT_PHOTO,
  });

  const departments = useMemo(() => {
    const set = new Set<string>();
    teachers.forEach((t) => {
      if (t.department) set.add(t.department);
    });
    return ["Semua", ...Array.from(set).sort()];
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.nip.toLowerCase().includes(q) ||
        t.role.toLowerCase().includes(q);

      const matchesDept = selectedDept === "Semua" || t.department === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [teachers, searchQuery, selectedDept]);

  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE));
  const displayedTeachers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTeachers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTeachers, currentPage]);

  const resetForm = () => {
    setForm({
      name: "",
      nip: "",
      role: "Guru Produktif",
      department: "Teknik Pemesinan",
      photo: DEFAULT_PHOTO,
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
      photo: t.photo || DEFAULT_PHOTO,
    });
    setEditingId(t.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      updateTeachers([newTeacher, ...teachers]);
    }
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl text-slate-900">
              Direktori Guru & Tenaga Kependidikan
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              {teachers.length} Data Resmi
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kelola data kepala sekolah, wakil kepala sekolah, kepala program keahlian, guru produktif, normatif-adaptif, dan staf tendik.
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
              {editingId ? "Edit Data Pendidik" : "Tambah Pendidik Baru"}
            </h2>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Drs. Bambang Sutrisno, M.T."
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">NIP (Nomor Induk Pegawai)</label>
                <input
                  type="text"
                  required
                  value={form.nip}
                  onChange={(e) => setForm({ ...form, nip: e.target.value })}
                  placeholder="19xxxxxxxxxxxxxx atau -"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Jabatan / Peran</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Guru Produktif / Wakasek / Staf Tata Usaha"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Unit / Jurusan / Bagian</label>
                <input
                  type="text"
                  required
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  placeholder="Contoh: Broadcasting & Perfilman, Normatif Adaptif, Tata Usaha"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-1">
              <ImageUploadInput
                label="Foto Profil Guru / Tenaga Kependidikan"
                value={form.photo}
                onChange={(newUrl) => setForm({ ...form, photo: newUrl })}
                helperText="Pilih foto lokal sekolah atau unggah pasfoto resmi guru/staf."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari berdasarkan nama guru, NIP, atau jabatan..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none w-full sm:w-56 truncate"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Total Found & Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Menampilkan <strong>{displayedTeachers.length}</strong> dari <strong>{filteredTeachers.length}</strong> data pendidik
          {selectedDept !== "Semua" ? ` di "${selectedDept}"` : ""}
          {searchQuery ? ` untuk pencarian "${searchQuery}"` : ""}
        </span>
        <span>Halaman {currentPage} dari {totalPages}</span>
      </div>

      {/* Teachers List */}
      {displayedTeachers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-display font-bold text-slate-700 text-sm">Tidak ditemukan data pendidik</h3>
          <p className="text-xs text-slate-400 mt-1">Coba ganti kata kunci pencarian atau reset filter departemen.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {displayedTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                  <img
                    src={teacher.photo || DEFAULT_PHOTO}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block truncate max-w-[200px]">
                    {teacher.department}
                  </span>
                  <h3 className="font-display font-bold text-sm text-slate-900 mt-1 truncate">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">{teacher.role} • NIP: {teacher.nip}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleEdit(teacher)}
                  className="p-2 text-slate-500 hover:text-emerald-600 rounded-xl hover:bg-emerald-50 transition"
                  title="Edit Data Pendidik"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition"
                  title="Hapus Data Pendidik"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2 pb-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1 text-xs">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;
                return (
                  <React.Fragment key={p}>
                    {showEllipsis && <span className="px-1 text-slate-400">...</span>}
                    <button
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-xl font-bold transition ${
                        currentPage === p
                          ? "bg-skagata-700 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
