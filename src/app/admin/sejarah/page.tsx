"use client";

import React, { useState } from "react";
import {
  History,
  Plus,
  Trash2,
  Edit2,
  Check,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useCMS } from "@/lib/store";
import { TimelineItem, ArchivePhoto } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

export default function AdminSejarahPage() {
  const { timeline, archivePhotos, profile, updateTimeline, updateArchivePhotos, updateProfile } = useCMS();
  const [activeTab, setActiveTab] = useState<"header" | "timeline" | "archive">("header");
  const [savedMessage, setSavedMessage] = useState("");

  // Hero Header Editing State
  const [headerForm, setHeaderForm] = useState({
    badge: profile.historyHero?.badge || "Rekam Jejak Kejuruan Sejak 1952",
    title: profile.historyHero?.title || "Perjalanan Sejarah SMK Negeri 3 Yogyakarta (STM 2 Jetis)",
    subtitle:
      profile.historyHero?.subtitle ||
      "Menelusuri lebih dari tujuh dekade dedikasi tanpa henti dalam mencetak ratusan ribu teknisi handal, insinyur, akademisi, dan pemimpin industri yang mewarnai pembangunan infrastruktur dan manufaktur Indonesia.",
    image:
      profile.historyHero?.image ||
      "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg",
    imageTag: profile.historyHero?.imageTag || "Arsip Tradisi Skagata",
    imageCaption: profile.historyHero?.imageCaption || "Semarak Perayaan 61 Tahun Festa Mangajapa",
  });

  // Timeline Editing State
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [isAddingTimeline, setIsAddingTimeline] = useState(false);
  const [timelineForm, setTimelineForm] = useState<TimelineItem>({
    id: "",
    year: "",
    title: "",
    badge: "Tonggak Sejarah",
    description: "",
    image: "",
  });

  // Archive Photos Editing State
  const [editingPhoto, setEditingPhoto] = useState<ArchivePhoto | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [photoForm, setPhotoForm] = useState<ArchivePhoto>({
    id: "",
    title: "",
    caption: "",
    year: "Era 1970",
    image: "",
    tag: "Arsip Tradisi",
  });

  const notifySaved = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleSaveHeader = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      historyHero: headerForm,
    });
    notifySaved("Foto utama & Header Halaman Sejarah berhasil disimpan!");
  };

  // Timeline Handlers
  const handleStartAddTimeline = () => {
    setEditingItem(null);
    setTimelineForm({
      id: "hist-" + Date.now(),
      year: "2026",
      title: "",
      badge: "Inovasi Baru",
      description: "",
      image: "",
    });
    setIsAddingTimeline(true);
  };

  const handleStartEditTimeline = (item: TimelineItem) => {
    setEditingItem(item);
    setTimelineForm(item);
    setIsAddingTimeline(true);
  };

  const handleSaveTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const updated = timeline.map((t) => (t.id === editingItem.id ? timelineForm : t));
      updateTimeline(updated);
      notifySaved("Tonggak sejarah berhasil diperbarui!");
    } else {
      updateTimeline([...timeline, timelineForm]);
      notifySaved("Tonggak sejarah baru berhasil ditambahkan!");
    }
    setIsAddingTimeline(false);
    setEditingItem(null);
  };

  const handleDeleteTimeline = (id: string) => {
    if (confirm("Hapus tonggak sejarah ini dari rekam jejak sekolah?")) {
      updateTimeline(timeline.filter((t) => t.id !== id));
      notifySaved("Item tonggak sejarah berhasil dihapus.");
    }
  };

  // Archive Photos Handlers
  const handleStartAddPhoto = () => {
    setEditingPhoto(null);
    setPhotoForm({
      id: "arc-" + Date.now(),
      title: "",
      caption: "",
      year: "Era 1980",
      image: "",
      tag: "Tradisi Ketarunaan",
    });
    setIsAddingPhoto(true);
  };

  const handleStartEditPhoto = (photo: ArchivePhoto) => {
    setEditingPhoto(photo);
    setPhotoForm(photo);
    setIsAddingPhoto(true);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhoto) {
      const updated = archivePhotos.map((p) => (p.id === editingPhoto.id ? photoForm : p));
      updateArchivePhotos(updated);
      notifySaved("Foto arsip bersejarah berhasil diperbarui!");
    } else {
      updateArchivePhotos([...archivePhotos, photoForm]);
      notifySaved("Foto arsip baru berhasil ditambahkan ke galeri!");
    }
    setIsAddingPhoto(false);
    setEditingPhoto(null);
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm("Hapus foto arsip ini dari galeri sejarah?")) {
      updateArchivePhotos(archivePhotos.filter((p) => p.id !== id));
      notifySaved("Foto arsip berhasil dihapus.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit mb-2">
            <History className="w-3.5 h-3.5 text-emerald-600" />
            <span>Manajemen Kilas Balik & Heritage</span>
          </div>
          <h1 className="font-display font-black text-2xl text-slate-900">
            Kelola Sejarah & Galeri Foto Arsip
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ubah narasi kronologi sejak 1952, foto arsip bangunan kuno, serta dokumentasi rekam jejak STM 2 Jetis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/profil/sejarah"
            target="_blank"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
          >
            <span>Lihat Halaman Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab("header");
            setIsAddingTimeline(false);
            setIsAddingPhoto(false);
          }}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "header"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Foto & Header Utama</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("timeline");
            setIsAddingTimeline(false);
          }}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "timeline"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Tonggak Garis Waktu ({timeline.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("archive");
            setIsAddingPhoto(false);
          }}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "archive"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Galeri Foto Arsip Lama ({archivePhotos.length})</span>
        </button>
      </div>

      {/* TAB 0: FOTO & HEADER UTAMA SEJARAH */}
      {activeTab === "header" && (
        <div className="space-y-6">
          {/* Live Preview Card */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl overflow-hidden relative">
            <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pratinjau Langsung Header Halaman Sejarah Publik</span>
            </div>
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800/60">
                  <History className="w-3.5 h-3.5" />
                  <span>{headerForm.badge}</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white leading-tight">
                  {headerForm.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {headerForm.subtitle}
                </p>
              </div>
              <div className="md:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-700 aspect-[4/3] bg-slate-950 group">
                  <img
                    src={headerForm.image}
                    alt={headerForm.imageCaption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                      {headerForm.imageTag}
                    </span>
                    <p className="text-xs font-semibold">{headerForm.imageCaption}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Edit Header */}
          <form onSubmit={handleSaveHeader} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-display font-black text-base text-slate-900 border-b border-slate-100 pb-3">
              Formulir Ubah Foto Utama & Konten Header Sejarah
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Header Sejarah
                </label>
                <input
                  type="text"
                  value={headerForm.title}
                  onChange={(e) => setHeaderForm({ ...headerForm, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Badge / Label Kategori Atas
                </label>
                <input
                  type="text"
                  value={headerForm.badge}
                  onChange={(e) => setHeaderForm({ ...headerForm, badge: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subjudul / Narasi Ringkas Sejarah
              </label>
              <textarea
                rows={3}
                value={headerForm.subtitle}
                onChange={(e) => setHeaderForm({ ...headerForm, subtitle: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Foto Utama Upload Input */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Foto Utama Header Sejarah (Upload dari Komputer atau Tempel URL)
              </label>
              <ImageUploadInput
                value={headerForm.image}
                onChange={(val) => setHeaderForm({ ...headerForm, image: val })}
                label="Foto Utama Sejarah STM 2 Jetis"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Label Tag Foto (Kecil Hijau)
                </label>
                <input
                  type="text"
                  value={headerForm.imageTag}
                  onChange={(e) => setHeaderForm({ ...headerForm, imageTag: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keterangan / Kepsen Foto
                </label>
                <input
                  type="text"
                  value={headerForm.imageCaption}
                  onChange={(e) => setHeaderForm({ ...headerForm, imageCaption: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Header & Foto Utama Sejarah</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 1: TIMELINE */}
      {activeTab === "timeline" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-base text-slate-900">
              Daftar Periode & Tonggak Sejarah
            </h2>
            {!isAddingTimeline && (
              <button
                onClick={handleStartAddTimeline}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Tonggak Sejarah</span>
              </button>
            )}
          </div>

          {/* Form Tambah/Edit Timeline */}
          {isAddingTimeline && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-md space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="font-display font-bold text-sm text-slate-900">
                  {editingItem ? "Edit Tonggak Sejarah" : "Tambah Tonggak Sejarah Baru"}
                </h3>
                <button
                  onClick={() => setIsAddingTimeline(false)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  Batal
                </button>
              </div>

              <form onSubmit={handleSaveTimeline} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Tahun / Rentang Periode
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 1952 atau 2010 - 2018"
                      value={timelineForm.year}
                      onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Badge Kategori
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Tonggak Sejarah, Inovasi Karakter"
                      value={timelineForm.badge}
                      onChange={(e) => setTimelineForm({ ...timelineForm, badge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="font-semibold text-slate-700 block mb-1">
                      Judul Peristiwa
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Judul era perkembangan..."
                      value={timelineForm.title}
                      onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Narasi / Deskripsi Sejarah Lengkap
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Jelaskan detail peristiwa bersejarah pada masa tersebut..."
                    value={timelineForm.description}
                    onChange={(e) =>
                      setTimelineForm({ ...timelineForm, description: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <ImageUploadInput
                  label="Foto Ilustrasi Era Ini (Opsional)"
                  value={timelineForm.image || ""}
                  onChange={(url) => setTimelineForm({ ...timelineForm, image: url })}
                  placeholder="https://... atau upload foto dari komputer"
                  helperText="Foto akan tampil sebagai kartu sorotan era terkait."
                />

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingTimeline(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                  >
                    Simpan Tonggak Sejarah
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List Timeline Cards */}
          <div className="space-y-3">
            {timeline.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-display font-black flex items-center justify-center flex-shrink-0 text-sm">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-xs bg-slate-900 text-emerald-400 px-2 py-0.5 rounded">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm text-slate-900 mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                  <button
                    onClick={() => handleStartEditTimeline(item)}
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-emerald-700 border border-slate-200 transition"
                    title="Edit Item Ini"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTimeline(item.id)}
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 border border-slate-200 transition"
                    title="Hapus Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ARCHIVE PHOTOS */}
      {activeTab === "archive" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-base text-slate-900">
              Koleksi Foto Arsip & Gedung Heritage
            </h2>
            {!isAddingPhoto && (
              <button
                onClick={handleStartAddPhoto}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Foto Arsip Baru</span>
              </button>
            )}
          </div>

          {/* Form Tambah/Edit Foto Arsip */}
          {isAddingPhoto && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-md space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="font-display font-bold text-sm text-slate-900">
                  {editingPhoto ? "Edit Foto Arsip" : "Upload Foto Arsip Bersejarah"}
                </h3>
                <button
                  onClick={() => setIsAddingPhoto(false)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  Batal
                </button>
              </div>

              <form onSubmit={handleSavePhoto} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Judul Foto / Dokumen
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Gedung Heritage Pintu Masuk STM 2"
                      value={photoForm.title}
                      onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Era / Tahun Dokumentasi
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Era 1960 atau 1975"
                      value={photoForm.year}
                      onChange={(e) => setPhotoForm({ ...photoForm, year: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Tag / Kategori
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Arsitektur Heritage, Praktik Bengkel"
                      value={photoForm.tag}
                      onChange={(e) => setPhotoForm({ ...photoForm, tag: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Keterangan / Caption Foto
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Deskripsi singkat momen bersejarah dalam foto..."
                      value={photoForm.caption}
                      onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <ImageUploadInput
                  label="File Foto Arsip (Bisa Upload dari Komputer / URL)"
                  value={photoForm.image}
                  onChange={(url) => setPhotoForm({ ...photoForm, image: url })}
                  required
                  placeholder="https://... atau unggah foto dari komputer"
                  helperText="Gunakan resolusi terbaik. Mendukung upload foto arsip kuno langsung dari harddisk."
                />

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingPhoto(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                  >
                    Simpan Foto Arsip
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid Foto Arsip */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {archivePhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-slate-900">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-slate-950/80 text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                    {photo.year}
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {photo.tag}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleStartEditPhoto(photo)}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-emerald-700 border border-slate-200 transition text-xs flex items-center gap-1 font-semibold"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-slate-200 transition text-xs flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
