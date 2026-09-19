"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, Check, RotateCcw, Video, Phone, Mail, MapPin, Sparkles, Bot, ArrowRight } from "lucide-react";
import { useCMS } from "@/lib/store";
import { VideoData } from "@/lib/data-initial";

export default function AdminPengaturanPage() {
  const {
    schoolInfo,
    socialLinks,
    activeVideoId,
    videos,
    updateSchoolInfo,
    updateSocialLinks,
    setActiveVideoId,
    updateVideos,
    resetToDefaults,
  } = useCMS();

  const [form, setForm] = useState({
    name: schoolInfo.name,
    motto: schoolInfo.motto,
    phone: schoolInfo.phone,
    fax: schoolInfo.fax,
    email: schoolInfo.email,
    address: schoolInfo.address,
    headmaster: schoolInfo.headmaster,
  });

  const [socials, setSocials] = useState({
    facebook: socialLinks.facebook,
    twitter: socialLinks.twitter,
    instagram: socialLinks.instagram,
    youtube: socialLinks.youtube,
    email: socialLinks.email,
  });

  const [savedMessage, setSavedMessage] = useState(false);
  const [videoForm, setVideoForm] = useState<VideoData>({ id: "", title: "", subtitle: "", speaker: "", description: "", icon: "Play", color: "text-emerald-400 bg-emerald-500/20" });
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  const resetVideoForm = () => {
    setVideoForm({ id: "", title: "", subtitle: "", speaker: "", description: "", icon: "Play", color: "text-emerald-400 bg-emerald-500/20" });
    setEditingVideoId(null);
  };

  const saveVideo = (event: React.FormEvent) => {
    event.preventDefault();
    const id = editingVideoId || videoForm.id.trim() || `video-${Date.now()}`;
    const payload = { ...videoForm, id };
    updateVideos(editingVideoId ? videos.map((video) => video.id === editingVideoId ? payload : video) : [...videos, payload]);
    if (!activeVideoId) setActiveVideoId(id);
    resetVideoForm();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo(form);
    updateSocialLinks(socials);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset seluruh data konten ke data otentik awal SMKN 3 Yogyakarta?")) {
      resetToDefaults();
      alert("Konten berhasil di-reset ke data asli sekolah.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-slate-900">
            Pengaturan Situs & Hero Controller
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Konfigurasi identitas sekolah, nomor kontak resmi, video YouTube cinema aktif, dan status SPMB.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset ke Data Asli Sekolah</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>Pengaturan berhasil disimpan dan langsung aktif di seluruh halaman situs!</span>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Form Identitas */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-display font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
            Informasi Identitas & Kontak Resmi
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Resmi Sekolah</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Kepala Sekolah</label>
                <input
                  type="text"
                  required
                  value={form.headmaster}
                  onChange={(e) => setForm({ ...form, headmaster: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Motto Sekolah</label>
              <input
                type="text"
                required
                value={form.motto}
                onChange={(e) => setForm({ ...form, motto: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nomor Fax</label>
                <input
                  type="text"
                  value={form.fax}
                  onChange={(e) => setForm({ ...form, fax: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Alamat Email Resmi</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Alamat Kampus</label>
              <textarea
                rows={2}
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
              />
            </div>

            {/* 5 Official Social Media Links Management */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-slate-900">
                  5 Kanal Media Sosial Resmi Sekolah
                </h3>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-semibold">
                  Tampil di Topbar & Footer
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <i className="fa-brands fa-facebook text-blue-600" />
                    <span>Facebook URL</span>
                  </label>
                  <input
                    type="url"
                    value={socials.facebook}
                    onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <i className="fa-brands fa-twitter text-sky-500" />
                    <span>Twitter / X URL</span>
                  </label>
                  <input
                    type="url"
                    value={socials.twitter}
                    onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <i className="fa-brands fa-instagram text-pink-600" />
                    <span>Instagram URL</span>
                  </label>
                  <input
                    type="url"
                    value={socials.instagram}
                    onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <i className="fa-brands fa-youtube text-red-600" />
                    <span>YouTube Channel URL</span>
                  </label>
                  <input
                    type="url"
                    value={socials.youtube}
                    onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <i className="fa-regular fa-envelope text-emerald-600" />
                    <span>Email Resmi (mailto / webmail)</span>
                  </label>
                  <input
                    type="text"
                    value={socials.email}
                    onChange={(e) => setSocials({ ...socials, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          </form>
        </div>

        {/* Video Cinema Controller & AI Card */}
        <div className="lg:col-span-4 space-y-4">
          {/* AI Chatbot Card */}
          <div className="bg-gradient-to-br from-slate-900 via-skagata-950 to-emerald-950 text-white p-6 rounded-3xl border border-emerald-500/30 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <Bot className="w-5 h-5 text-emerald-400" />
              <h3 className="font-display font-bold text-base text-white">
                AI Assistant (Skagata Bot)
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Konfigurasi API Key Google AI Studio (Gemini), model AI, kepribadian bot, dan kuis rekomendasi jurusan.
            </p>
            <Link
              href="/admin/ai-chatbot"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-between shadow"
            >
              <span>Kelola AI & Kuis Jurusan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-skagata-700">
              <Video className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display font-bold text-base text-slate-900">
                Pemutar Skagata Cinema
              </h3>
            </div>

            <p className="text-xs text-slate-500">
              Pilih video default yang langsung dimainkan saat pengunjung membuka halaman beranda:
            </p>

            <div className="space-y-2 text-xs">
              {videos.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => setActiveVideoId(vid.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between ${
                    activeVideoId === vid.id
                      ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate">{vid.title}</span>
                  {activeVideoId === vid.id && (
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      Aktif
                    </span>
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={saveVideo} className="border-t border-slate-100 pt-3 space-y-2.5 text-xs">
              <p className="font-bold text-slate-800">{editingVideoId ? "Edit video" : "Tambah video"}</p>
              <input required value={videoForm.id} disabled={!!editingVideoId} onChange={(e) => setVideoForm({ ...videoForm, id: e.target.value })} placeholder="ID YouTube (contoh: tJhzVg7Nq4g)" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono" />
              <input required value={videoForm.title} onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} placeholder="Judul video" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl" />
              <input value={videoForm.subtitle} onChange={(e) => setVideoForm({ ...videoForm, subtitle: e.target.value })} placeholder="Subjudul" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl" />
              <textarea required rows={2} value={videoForm.description} onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} placeholder="Deskripsi video" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl" />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">{editingVideoId ? "Simpan Video" : "Tambah Video"}</button>
                {editingVideoId && <button type="button" onClick={resetVideoForm} className="px-3 py-2 bg-slate-100 rounded-xl font-bold">Batal</button>}
              </div>
            </form>

            <div className="space-y-1.5">
              {videos.map((video) => <div key={`${video.id}-actions`} className="flex items-center gap-1.5 text-[10px]"><span className="truncate flex-1 text-slate-500">{video.id}</span><button type="button" onClick={() => { setEditingVideoId(video.id); setVideoForm(video); }} className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600">Edit</button><button type="button" onClick={() => { if (videos.length > 1 && confirm("Hapus video ini?")) { updateVideos(videos.filter((item) => item.id !== video.id)); if (activeVideoId === video.id) setActiveVideoId(videos.find((item) => item.id !== video.id)?.id || ""); } }} className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600">Hapus</button></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
