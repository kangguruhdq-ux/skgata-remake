"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Image as ImageIcon,
  UploadCloud,
  Search,
  Trash2,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Eye,
  Filter,
  RefreshCw,
  FolderOpen,
  HardDrive,
  Layers,
  X,
  Edit3,
} from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  category: string;
  alt?: string | null;
  usageContext?: string | null;
  createdAt: string;
}

const CATEGORIES = [
  { id: "ALL", label: "Semua Kategori" },
  { id: "general", label: "Umum & Brand" },
  { id: "news", label: "Berita & Acara" },
  { id: "major", label: "Konsentrasi Keahlian" },
  { id: "teacher", label: "Guru & SDM" },
  { id: "facility", label: "Bengkel & Fasilitas" },
  { id: "archive", label: "Arsip & Sejarah" },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState("general");
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadUsage, setUploadUsage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preview modal state
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  // Edit modal state
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/media";
      const params = new URLSearchParams();
      if (selectedCategory !== "ALL") params.set("category", selectedCategory);
      if (searchQuery) params.set("search", searchQuery);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "success") {
        setMediaList(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load media items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [selectedCategory]);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Silakan pilih file gambar terlebih dahulu.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("category", uploadCategory);
      formData.append("alt", uploadAlt);
      formData.append("usageContext", uploadUsage);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.status === "success") {
        setToastMessage(`Gambar "${uploadFile.name}" berhasil diunggah.`);
        setTimeout(() => setToastMessage(null), 3500);
        setIsUploadOpen(false);
        setUploadFile(null);
        setUploadAlt("");
        setUploadUsage("");
        fetchMedia();
      } else {
        alert(data.message || "Gagal mengunggah gambar.");
      }
    } catch {
      alert("Terjadi gangguan jaringan saat mengunggah file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setToastMessage(`URL ${item.filename} berhasil disalin ke clipboard!`);
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage(null);
    }, 2500);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm(`Hapus media "${item.originalName || item.filename}" secara permanen?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/media?id=${item.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.status === "success") {
        setToastMessage("Gambar berhasil dihapus.");
        setTimeout(() => setToastMessage(null), 3500);
        fetchMedia();
      } else {
        alert(data.message || "Gagal menghapus gambar.");
      }
    } catch {
      alert("Terjadi gangguan jaringan saat menghapus gambar.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch("/api/admin/media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingItem.id,
          category: editingItem.category,
          alt: editingItem.alt,
          usageContext: editingItem.usageContext,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setToastMessage("Metadata gambar berhasil diperbarui.");
        setTimeout(() => setToastMessage(null), 3500);
        setEditingItem(null);
        fetchMedia();
      } else {
        alert(data.message || "Gagal memperbarui metadata.");
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  // Calculations
  const totalBytes = mediaList.reduce((acc, item) => acc + (item.size || 0), 0);
  const totalKB = Math.round(totalBytes / 1024);
  const totalMB = (totalKB / 1024).toFixed(1);

  const filteredMedia = mediaList.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.filename.toLowerCase().includes(q) ||
      item.originalName.toLowerCase().includes(q) ||
      (item.alt && item.alt.toLowerCase().includes(q)) ||
      (item.usageContext && item.usageContext.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
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
              <FolderOpen className="w-4 h-4" />
              <span>Penyimpanan Aset Multimedia</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Media & Galeri Storage
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-light">
              Kelola seluruh aset visual foto resmi sekolah (berita, 8 jurusan, fasilitas bengkel,
              guru/SDM, dan arsip bersejarah STM 2 Jetis) dengan kompresi WebP modern.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchMedia}
              disabled={loading}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition flex items-center gap-2 border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
              <span>Segarkan</span>
            </button>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-950/40 flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Unggah Media Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total File Media</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-slate-900">{mediaList.length}</span>
            <span className="text-xs text-slate-400">File</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Tersedia di Server</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Kapasitas Penyimpanan</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-emerald-600">{totalMB}</span>
            <span className="text-xs text-slate-400">MB Terpakai</span>
          </div>
          <span className="text-[11px] text-emerald-600/80 mt-1 block">{totalKB} KB Total Data</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Format Gambar</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-purple-600">WebP / JPG</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Dukungan Responsif Modern</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Status Penyimpanan</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-teal-600">Optimal</span>
          </div>
          <span className="text-[11px] text-teal-600/80 mt-1 block">Siap Produksi CDN</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama file, teks alternatif (alt), atau kegunaan..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition text-xs ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-2" />
          <span>Memuat galeri media...</span>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center text-slate-400">
          <ImageIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
          <span>Belum ada gambar yang ditemukan dalam kategori ini.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredMedia.map((item) => {
            const kbSize = Math.round(item.size / 1024);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={item.url}
                      alt={item.alt || item.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-mono">
                      {item.category.toUpperCase()}
                    </span>
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white hover:bg-emerald-600 transition"
                      title="Lihat Penuh"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-1.5">
                    <h4 className="font-semibold text-xs text-slate-900 truncate" title={item.originalName || item.filename}>
                      {item.originalName || item.filename}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate" title={item.alt || ""}>
                      {item.alt ? `Alt: ${item.alt}` : "Tidak ada alt text"}
                    </p>
                    {item.usageContext && (
                      <p className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded truncate inline-block">
                        {item.usageContext}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                      <span>{kbSize} KB</span>
                      <span>{item.mimeType.split("/")[1]?.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleCopyUrl(item)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-semibold transition ${
                      isCopied
                        ? "bg-emerald-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "Tersalin!" : "Salin URL"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-white transition"
                      title="Edit Metadata"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition"
                      title="Hapus Media"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Unggah Media Gambar Baru
                </h3>
                <p className="text-xs text-slate-500">
                  Format didukung: WebP, PNG, JPG, GIF, SVG (Maks. 5MB)
                </p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              {/* Drop/Select zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition bg-slate-50 hover:bg-emerald-50/20"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <UploadCloud className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                {uploadFile ? (
                  <div>
                    <span className="font-bold text-slate-800 block">{uploadFile.name}</span>
                    <span className="text-[11px] text-slate-500">
                      {Math.round(uploadFile.size / 1024)} KB &bull; Klik untuk mengganti file
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-slate-700 block">
                      Klik atau seret file gambar ke sini
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Disarankan menggunakan format WebP untuk performa optimal
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Kategori Penempatan *
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="general">Umum & Brand Sekolah</option>
                  <option value="news">Berita & Liputan Acara</option>
                  <option value="major">Konsentrasi Keahlian (8 Jurusan)</option>
                  <option value="teacher">Direktori Guru & SDM</option>
                  <option value="facility">Fasilitas Bengkel & Sarana</option>
                  <option value="archive">Sejarah & Arsip Foto Jadul</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Teks Alternatif (Alt Text SEO) *
                </label>
                <input
                  type="text"
                  required
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  placeholder="Contoh: Siswa Jurusan TJKT praktik merakit fiber optik"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Konteks Penggunaan (Opsional)
                </label>
                <input
                  type="text"
                  value={uploadUsage}
                  onChange={(e) => setUploadUsage(e.target.value)}
                  placeholder="Contoh: Banner halaman utama, Cover berita LKS"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow"
                >
                  {isUploading ? "Mengunggah..." : "Unggah Sekarang"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-900">
                Edit Metadata Media
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama File:
                </label>
                <p className="font-mono text-slate-500 break-all">{editingItem.filename}</p>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Kategori:
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="general">Umum & Brand</option>
                  <option value="news">Berita</option>
                  <option value="major">Jurusan</option>
                  <option value="teacher">Guru & SDM</option>
                  <option value="facility">Fasilitas</option>
                  <option value="archive">Arsip</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Teks Alt:
                </label>
                <input
                  type="text"
                  value={editingItem.alt || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, alt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Konteks Penggunaan:
                </label>
                <input
                  type="text"
                  value={editingItem.usageContext || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, usageContext: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-800 truncate max-w-md">
                {previewItem.originalName || previewItem.filename}
              </span>
              <button
                onClick={() => setPreviewItem(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 max-h-[60vh] flex items-center justify-center">
              <img
                src={previewItem.url}
                alt={previewItem.alt || previewItem.filename}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="font-mono text-slate-500">{previewItem.url}</span>
              <button
                onClick={() => handleCopyUrl(previewItem)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
              >
                Salin URL Gambar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
