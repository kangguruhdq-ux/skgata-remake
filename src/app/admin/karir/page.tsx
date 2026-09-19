"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit3, Check, X, Briefcase, Building2, MapPin } from "lucide-react";
import { useCMS } from "@/lib/store";
import { JobData } from "@/lib/data-initial";

export default function AdminKarirPage() {
  const { jobs, updateJobs } = useCMS();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-display font-black text-2xl text-slate-900">
            Manajemen Bursa Kerja Khusus (BKK)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola pengumuman lowongan kerja industri mitra, walk-in interview, dan rekrutmen Jepang.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Lowongan BKK</span>
          </button>
        )}
      </div>

      {/* Form Add / Edit */}
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

      {/* List */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
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
              <p className="text-xs text-slate-500">{job.company} • {job.location} • Batas: {job.deadline}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(job)}
                className="p-2 text-slate-500 hover:text-emerald-600 rounded-xl"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(job.id)}
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
