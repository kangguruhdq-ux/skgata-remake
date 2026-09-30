"use client";

import React, { useState, useEffect } from "react";
import {
  Network,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  User,
  Shield,
  Layers,
  ArrowUpDown,
  RefreshCw,
  Eye,
  EyeOff,
  Briefcase,
  X,
  Sparkles,
} from "lucide-react";

interface OrgNode {
  id: string;
  name: string;
  nip: string | null;
  position: string;
  department: string | null;
  level: number;
  order: number;
  photo: string | null;
  task: string | null;
  parentId: string | null;
  isActive: boolean;
  period: string | null;
}

const LEVEL_NAMES: Record<number, { label: string; badge: string; color: string }> = {
  1: { label: "Level 1: Pucuk Pimpinan & Komite", badge: "Puncak", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  2: { label: "Level 2: Wakil Kepala Sekolah & KTU", badge: "Manajemen", color: "bg-blue-100 text-blue-800 border-blue-300" },
  3: { label: "Level 3: Ketua Program Keahlian (Kaprogli)", badge: "Vokasi", color: "bg-purple-100 text-purple-800 border-purple-300" },
  4: { label: "Level 4: Unit Pelaksana & Koordinator", badge: "Unit", color: "bg-amber-100 text-amber-800 border-amber-300" },
};

export default function AdminOrganisasiPage() {
  const [nodes, setNodes] = useState<OrgNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState<number | 0>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<OrgNode | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    position: "",
    department: "",
    level: 1,
    order: 0,
    photo: "",
    task: "",
    isActive: true,
    period: "2025/2026",
  });

  const fetchNodes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/organization");
      const json = await res.json();
      if (json.status === "success") {
        setNodes(json.data || []);
      }
    } catch (err) {
      console.error("Failed to load organization nodes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  const openCreateModal = () => {
    setEditingNode(null);
    setFormData({
      name: "",
      nip: "",
      position: "",
      department: "",
      level: 2,
      order: nodes.length + 1,
      photo: "",
      task: "",
      isActive: true,
      period: "2025/2026",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (node: OrgNode) => {
    setEditingNode(node);
    setFormData({
      name: node.name,
      nip: node.nip || "",
      position: node.position,
      department: node.department || "",
      level: node.level,
      order: node.order,
      photo: node.photo || "",
      task: node.task || "",
      isActive: node.isActive,
      period: node.period || "2025/2026",
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = "/api/admin/organization";
      const method = editingNode ? "PUT" : "POST";
      const payload = editingNode ? { id: editingNode.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.status === "success") {
        setToastMessage(
          editingNode
            ? "Data posisi organisasi berhasil diperbarui."
            : "Posisi baru berhasil ditambahkan ke bagan organisasi."
        );
        setTimeout(() => setToastMessage(null), 3500);
        setIsModalOpen(false);
        fetchNodes();
      } else {
        alert(resData.message || "Gagal menyimpan perubahan.");
      }
    } catch {
      alert("Terjadi gangguan jaringan saat menyimpan data.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus jabatan/posisi "${name}" dari struktur organisasi?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/organization?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        setToastMessage(`Posisi "${name}" berhasil dihapus.`);
        setTimeout(() => setToastMessage(null), 3500);
        fetchNodes();
      } else {
        alert(data.message || "Gagal menghapus data.");
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const handleToggleStatus = async (node: OrgNode) => {
    try {
      const res = await fetch("/api/admin/organization", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: node.id,
          isActive: !node.isActive,
        }),
      });
      if (res.ok) {
        setNodes((prev) =>
          prev.map((n) => (n.id === node.id ? { ...n, isActive: !n.isActive } : n))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const filteredNodes = nodes.filter((node) => {
    const matchLevel = filterLevel === 0 || node.level === filterLevel;
    const matchSearch =
      !searchQuery ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (node.department && node.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchLevel && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Network className="w-4 h-4" />
              <span>Tata Kelola & Organisasi Sekolah</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Bagan Struktur Organisasi SKAGATA
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-light">
              Kelola hierarki pejabat sekolah secara hierarkis (Kepala Sekolah, Komite, 4 Wakasek, KTU,
              8 Kepala Program Keahlian, dan Koordinator Unit Khusus) yang terhubung langsung ke laman profil publik.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchNodes}
              disabled={loading}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition flex items-center gap-2 border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
              <span>Segarkan</span>
            </button>
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-950/40 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Posisi Pejabat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Posisi Bagan</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-slate-900">{nodes.length}</span>
            <span className="text-xs text-slate-400">Pejabat</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Tersimpan di DB</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Pimpinan & Wakasek</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-emerald-600">
              {nodes.filter((n) => n.level <= 2).length}
            </span>
            <span className="text-xs text-slate-400">Posisi</span>
          </div>
          <span className="text-[11px] text-emerald-600/80 mt-1 block">Level 1 & 2 Manajerial</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Ketua Jurusan (Kaprogli)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-purple-600">
              {nodes.filter((n) => n.level === 3).length}
            </span>
            <span className="text-xs text-slate-400">Konsentrasi</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Level 3 Vokasi</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Unit Pelaksana Khusus</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-amber-600">
              {nodes.filter((n) => n.level === 4).length}
            </span>
            <span className="text-xs text-slate-400">Unit</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">BKK, Perpustakaan, Taruna</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama pejabat, jabatan, atau divisi..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Tingkat Level:</span>
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(Number(e.target.value))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value={0}>Semua Hierarki Level</option>
            <option value={1}>Level 1: Pucuk Pimpinan & Komite</option>
            <option value={2}>Level 2: Wakasek & KTU</option>
            <option value={3}>Level 3: Kaprogli Kejuruan</option>
            <option value={4}>Level 4: Unit Pelaksana Khusus</option>
          </select>
        </div>
      </div>

      {/* Grouped Organization Hierarchy List */}
      {loading ? (
        <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-2" />
          <span>Memuat data struktur organisasi...</span>
        </div>
      ) : filteredNodes.length === 0 ? (
        <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center text-slate-400">
          <Network className="w-10 h-10 mx-auto text-slate-300 mb-2" />
          <span>Tidak ada posisi organisasi yang cocok dengan pencarian.</span>
        </div>
      ) : (
        <div className="space-y-6">
          {[1, 2, 3, 4]
            .filter((lvl) => filterLevel === 0 || filterLevel === lvl)
            .map((lvl) => {
              const levelNodes = filteredNodes.filter((n) => n.level === lvl);
              if (levelNodes.length === 0) return null;

              const lvlMeta = LEVEL_NAMES[lvl];

              return (
                <div key={lvl} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${lvlMeta.color}`}>
                        {lvlMeta.badge}
                      </span>
                      <h2 className="font-display font-bold text-base text-slate-900">
                        {lvlMeta.label}
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {levelNodes.length} Posisi
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {levelNodes.map((node) => (
                      <div
                        key={node.id}
                        className={`p-4 rounded-2xl border transition relative flex flex-col justify-between ${
                          node.isActive
                            ? "bg-slate-50/60 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20"
                            : "bg-slate-100/60 border-slate-200 opacity-60"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {node.photo ? (
                                <img
                                  src={node.photo}
                                  alt={node.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                                  {node.name.slice(0, 2).toUpperCase()}
                                </div>
                              )}

                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                                  {node.department || "SKAGATA"}
                                </span>
                                <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                                  {node.position}
                                </h3>
                              </div>
                            </div>

                            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500">
                              Urut #{node.order}
                            </span>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-800">{node.name}</p>
                            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                              {node.nip ? `NIP: ${node.nip}` : "NIP: -"}
                            </p>
                            {node.task && (
                              <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 bg-white/70 p-2 rounded-lg border border-slate-100">
                                {node.task}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                          <button
                            onClick={() => handleToggleStatus(node)}
                            className={`flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-lg transition ${
                              node.isActive
                                ? "text-emerald-700 bg-emerald-100/60 hover:bg-emerald-100"
                                : "text-slate-500 bg-slate-200/60 hover:bg-slate-200"
                            }`}
                          >
                            {node.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{node.isActive ? "Aktif di Web" : "Disembunyikan"}</span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(node)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-white transition"
                              title="Edit Data Posisi"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(node.id, node.name)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition"
                              title="Hapus Posisi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {editingNode ? "Edit Posisi Struktur Organisasi" : "Tambah Posisi Pejabat Baru"}
                </h3>
                <p className="text-xs text-slate-500">
                  Perubahan akan langsung tercermin pada bagan hierarki profil publik.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Nama Pejabat & Gelar *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Drs. Agus Triyono, M.T."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    NIP / Identitas Pegawai
                  </label>
                  <input
                    type="text"
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    placeholder="Contoh: 19680512 199403 1 008"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Jabatan Struktural *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Contoh: Wakil Kepala Sekolah Bidang Kurikulum"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Bagian / Divisi / Konsentrasi
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Contoh: Kurikulum & Akademik"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Tingkat Hierarki (Level) *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value={1}>Level 1: Pucuk Pimpinan & Komite</option>
                    <option value={2}>Level 2: Wakasek & KTU</option>
                    <option value={3}>Level 3: Kaprogli Kejuruan</option>
                    <option value={4}>Level 4: Unit Pelaksana Khusus</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Nomor Urut Tampil
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Periode Jabatan
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2025/2026"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  URL Foto Pejabat (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="/media/school/kepala-sekolah.webp atau unggah di Media Management"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Uraian Tugas Pokok & Fungsi (Tupoksi)
                </label>
                <textarea
                  rows={3}
                  value={formData.task}
                  onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  placeholder="Ringkasan mandat, tanggung jawab utama, dan fokus kerja bidang ini..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="isActiveToggle" className="font-semibold text-slate-700 cursor-pointer">
                  Tampilkan posisi ini di bagan publik website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow"
                >
                  {submitting ? "Menyimpan..." : editingNode ? "Simpan Perubahan" : "Tambahkan Posisi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
