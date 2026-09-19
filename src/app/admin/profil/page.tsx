"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useCMS } from "@/lib/store";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import { SchoolIdentityData, PortalItem, TokohQuoteItem } from "@/lib/data-initial";

export default function AdminProfilPage() {
  const {
    profile,
    updateProfile,
    portalItems,
    updatePortalItems,
    tokohQuotes,
    updateTokohQuotes,
  } = useCMS();
  const [activeTab, setActiveTab] = useState<
    "identitas" | "sambutan" | "visi" | "ketarunaan" | "portal" | "tokoh"
  >("identitas");
  const [savedMessage, setSavedMessage] = useState("");

  // Portal & Tokoh Quotes State
  const [portalForm, setPortalForm] = useState<PortalItem[]>(portalItems);
  const [tokohForm, setTokohForm] = useState<TokohQuoteItem[]>(tokohQuotes);

  // Identitas & Data Pokok State
  const [identityForm, setIdentityForm] = useState<SchoolIdentityData>({
    namaSekolah: profile.identity?.namaSekolah || "SMK Negeri 3 Yogyakarta",
    npsn: profile.identity?.npsn || "20404181",
    bentukSekolah: profile.identity?.bentukSekolah || "SMK",
    statusSekolah: profile.identity?.statusSekolah || "Negeri",
    alamat:
      profile.identity?.alamat ||
      "Jl. RW. Monginsidi No. 2 RT 17 RW 4 Cokrodiningratan Jetis Yogyakarta 55233",
    statusKepemilikan: profile.identity?.statusKepemilikan || "Pemerintah Daerah",
    nomorTelpon: profile.identity?.nomorTelpon || "0274513503",
    nomorFax: profile.identity?.nomorFax || "0274582322",
    email: profile.identity?.email || "humas@smkn3jogja.sch.id",
    website: profile.identity?.website || "https://smkn3jogja.sch.id",
    sertifikasiIso: profile.identity?.sertifikasiIso || "9001:2015",
    aksesInternet: profile.identity?.aksesInternet || "Fiber Optik",
    kompetensiKeahlian: profile.identity?.kompetensiKeahlian || [
      "Broadcasting & Perfilman",
      "Teknik Jaringan Komputer & Telekomunikasi",
      "Desain Pemodelan & Informasi Bangunan",
      "Teknik Konstruksi & Perumahan",
      "Teknik Elektronika",
      "Teknik Ketenagalistrikan",
      "Teknik Otomotif",
      "Teknik Mesin",
    ],
    akreditasi: profile.identity?.akreditasi || "A",
    jumlahRombel: profile.identity?.jumlahRombel || "60 kelas",
    jumlahGuru: profile.identity?.jumlahGuru || "148 orang",
    jumlahTendik: profile.identity?.jumlahTendik || "39 orang",
  });

  // Sambutan State
  const [sambutanForm, setSambutanForm] = useState({
    title: profile.headmasterGreeting.title,
    subtitle: profile.headmasterGreeting.subtitle,
    photo: profile.headmasterGreeting.photo,
    content: [...profile.headmasterGreeting.content],
  });

  // Visi Misi State
  const [visi, setVisi] = useState(profile.vision);
  const [missions, setMissions] = useState([...profile.missions]);
  const [newMission, setNewMission] = useState("");

  // Ketarunaan State
  const [ketarunaan, setKetarunaan] = useState([...profile.ketarunaanValues]);

  const notifySaved = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      identity: identityForm,
    });
    notifySaved("Data Pokok & Identitas Resmi Sekolah berhasil disimpan!");
  };

  const handleSaveSambutan = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      headmasterGreeting: sambutanForm,
    });
    notifySaved("Sambutan Kepala Sekolah berhasil diperbarui!");
  };

  const handleSaveVisiMisi = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      vision: visi,
      missions: missions,
    });
    notifySaved("Visi & Misi sekolah berhasil diperbarui!");
  };

  const handleSaveKetarunaan = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ketarunaanValues: ketarunaan,
    });
    notifySaved("7 Nilai Karakter Ketarunaan berhasil diperbarui!");
  };

  const handleSavePortal = (e: React.FormEvent) => {
    e.preventDefault();
    updatePortalItems(portalForm);
    notifySaved("4 Portal Gerbang Utama berhasil diperbarui!");
  };

  const handleSaveTokoh = (e: React.FormEvent) => {
    e.preventDefault();
    updateTokohQuotes(tokohForm);
    notifySaved("Kutipan Tokoh Nasional berhasil diperbarui!");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Manajemen Profil & Filosofi Sekolah</span>
          </div>
          <h1 className="font-display font-black text-2xl text-slate-900">
            Kelola Profil, Visi Misi & Sambutan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ubah kata sambutan kepala sekolah, rumusan visi & misi, serta 7 nilai luhur pendidikan ketarunaan.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/profil"
            target="_blank"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Lihat Halaman Profil</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/profil/visi-misi"
            target="_blank"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
          >
            <span>Lihat Visi Misi</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/profil/sambutan"
            target="_blank"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
          >
            <span>Lihat Sambutan</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("identitas")}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "identitas"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Data Pokok & Identitas</span>
        </button>

        <button
          onClick={() => setActiveTab("sambutan")}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "sambutan"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Sambutan Kepala Sekolah</span>
        </button>

        <button
          onClick={() => setActiveTab("visi")}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "visi"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Visi & Misi Sekolah</span>
        </button>

        <button
          onClick={() => setActiveTab("ketarunaan")}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "ketarunaan"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>7 Nilai Ketarunaan</span>
        </button>

        <button
          onClick={() => setActiveTab("portal")}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "portal"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>4 Portal Gerbang</span>
        </button>

        <button
          onClick={() => setActiveTab("tokoh")}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "tokoh"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Pesan Tokoh (VIP)</span>
        </button>
      </div>

      {/* TAB 0: DATA POKOK & IDENTITAS */}
      {activeTab === "identitas" && (
        <form onSubmit={handleSaveIdentity} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-display font-bold text-base text-slate-900">
                Formulir Data Pokok Pendidikan & Profil Resmi Sekolah
              </h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Data ini akan tampil pada tabel profil publik saat pengunjung mengklik menu Profil.
              </p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200">
              Dapodik & BAN-S/M
            </span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Nama Sekolah
              </label>
              <input
                type="text"
                required
                value={identityForm.namaSekolah}
                onChange={(e) => setIdentityForm({ ...identityForm, namaSekolah: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                NPSN
              </label>
              <input
                type="text"
                required
                value={identityForm.npsn}
                onChange={(e) => setIdentityForm({ ...identityForm, npsn: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Bentuk Sekolah
              </label>
              <input
                type="text"
                required
                value={identityForm.bentukSekolah}
                onChange={(e) => setIdentityForm({ ...identityForm, bentukSekolah: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Status Sekolah
              </label>
              <input
                type="text"
                required
                value={identityForm.statusSekolah}
                onChange={(e) => setIdentityForm({ ...identityForm, statusSekolah: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Status Kepemilikan
              </label>
              <input
                type="text"
                required
                value={identityForm.statusKepemilikan}
                onChange={(e) => setIdentityForm({ ...identityForm, statusKepemilikan: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Nomor Telpon
              </label>
              <input
                type="text"
                required
                value={identityForm.nomorTelpon}
                onChange={(e) => setIdentityForm({ ...identityForm, nomorTelpon: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Nomor Fax
              </label>
              <input
                type="text"
                required
                value={identityForm.nomorFax}
                onChange={(e) => setIdentityForm({ ...identityForm, nomorFax: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Email Sekolah
              </label>
              <input
                type="email"
                required
                value={identityForm.email}
                onChange={(e) => setIdentityForm({ ...identityForm, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Website Resmi
              </label>
              <input
                type="url"
                required
                value={identityForm.website}
                onChange={(e) => setIdentityForm({ ...identityForm, website: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Sertifikasi ISO
              </label>
              <input
                type="text"
                required
                value={identityForm.sertifikasiIso}
                onChange={(e) => setIdentityForm({ ...identityForm, sertifikasiIso: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Akses Internet
              </label>
              <input
                type="text"
                required
                value={identityForm.aksesInternet}
                onChange={(e) => setIdentityForm({ ...identityForm, aksesInternet: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Akreditasi
              </label>
              <input
                type="text"
                required
                value={identityForm.akreditasi}
                onChange={(e) => setIdentityForm({ ...identityForm, akreditasi: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Jumlah Rombel
              </label>
              <input
                type="text"
                required
                value={identityForm.jumlahRombel}
                onChange={(e) => setIdentityForm({ ...identityForm, jumlahRombel: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Jumlah Guru
              </label>
              <input
                type="text"
                required
                value={identityForm.jumlahGuru}
                onChange={(e) => setIdentityForm({ ...identityForm, jumlahGuru: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Jumlah Tendik (Staf)
              </label>
              <input
                type="text"
                required
                value={identityForm.jumlahTendik}
                onChange={(e) => setIdentityForm({ ...identityForm, jumlahTendik: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Alamat Lengkap Sekolah
            </label>
            <textarea
              rows={2}
              required
              value={identityForm.alamat}
              onChange={(e) => setIdentityForm({ ...identityForm, alamat: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-2 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Data Pokok Sekolah</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 1: SAMBUTAN */}
      {activeTab === "sambutan" && (
        <form onSubmit={handleSaveSambutan} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 text-xs">
          <h2 className="font-display font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
            Form Sambutan Kepala Sekolah
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Judul Sambutan
              </label>
              <input
                type="text"
                required
                value={sambutanForm.title}
                onChange={(e) => setSambutanForm({ ...sambutanForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Nama & Gelar Kepala Sekolah
              </label>
              <input
                type="text"
                required
                value={sambutanForm.subtitle}
                onChange={(e) => setSambutanForm({ ...sambutanForm, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <ImageUploadInput
            label="Foto Resmi Kepala Sekolah"
            value={sambutanForm.photo}
            onChange={(url) => setSambutanForm({ ...sambutanForm, photo: url })}
            placeholder="https://... atau unggah foto dari komputer"
            helperText="Unggah foto formal kepala sekolah berseragam resmi."
          />

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700">Paragraf Isi Sambutan</label>
              <button
                type="button"
                onClick={() =>
                  setSambutanForm({
                    ...sambutanForm,
                    content: [...sambutanForm.content, ""],
                  })
                }
                className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Paragraf</span>
              </button>
            </div>

            {sambutanForm.content.map((p, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center font-mono font-bold text-slate-500 flex-shrink-0 mt-1">
                  {idx + 1}
                </span>
                <textarea
                  rows={3}
                  value={p}
                  onChange={(e) => {
                    const next = [...sambutanForm.content];
                    next[idx] = e.target.value;
                    setSambutanForm({ ...sambutanForm, content: next });
                  }}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                />
                {sambutanForm.content.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const next = sambutanForm.content.filter((_, i) => i !== idx);
                      setSambutanForm({ ...sambutanForm, content: next });
                    }}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg flex-shrink-0 mt-1"
                    title="Hapus Paragraf"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
            >
              Simpan Perubahan Sambutan
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: VISI MISI */}
      {activeTab === "visi" && (
        <form onSubmit={handleSaveVisiMisi} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <h2 className="font-display font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
            Rumusan Visi & Misi Resmi
          </h2>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Pernyataan Visi Sekolah
            </label>
            <textarea
              rows={3}
              required
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700">Daftar Butir Misi Sekolah</label>
            </div>

            {missions.map((m, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-mono font-bold flex-shrink-0 mt-1">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={m}
                  onChange={(e) => {
                    const next = [...missions];
                    next[idx] = e.target.value;
                    setMissions(next);
                  }}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => setMissions(missions.filter((_, i) => i !== idx))}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg flex-shrink-0 mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Tulis butir misi baru..."
                value={newMission}
                onChange={(e) => setNewMission(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (newMission.trim()) {
                    setMissions([...missions, newMission.trim()]);
                    setNewMission("");
                  }
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Misi</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
            >
              Simpan Visi & Misi
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: KETARUNAAN */}
      {activeTab === "ketarunaan" && (
        <form onSubmit={handleSaveKetarunaan} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="font-display font-bold text-base text-slate-900">
                7 Nilai Karakter Luhur Ketarunaan
              </h2>
              <p className="text-slate-500 text-xs">
                Pilar pembinaan mental, moral, dan kedisiplinan taruna SMKN 3 Yogyakarta.
              </p>
            </div>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold">
              7 Nilai Pokok
            </span>
          </div>

          <div className="space-y-4">
            {ketarunaan.map((val, idx) => (
              <div
                key={val.number}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                    {val.number}
                  </span>
                  <input
                    type="text"
                    required
                    value={val.title}
                    onChange={(e) => {
                      const next = [...ketarunaan];
                      next[idx].title = e.target.value;
                      setKetarunaan(next);
                    }}
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  required
                  value={val.desc}
                  onChange={(e) => {
                    const next = [...ketarunaan];
                    next[idx].desc = e.target.value;
                    setKetarunaan(next);
                  }}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
            >
              Simpan 7 Nilai Ketarunaan
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: 4 PORTAL GERBANG UTAMA */}
      {activeTab === "portal" && (
        <form
          onSubmit={handleSavePortal}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
        >
          <div>
            <h2 className="font-display font-bold text-lg text-slate-900">
              Kelola 4 Portal Gerbang Utama (Di Bawah Hero Beranda)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Atur judul, subjudul, dan tautan halaman untuk 4 gerbang ikon SVG yang muncul di beranda utama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portalForm.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                    Portal #{idx + 1}: {item.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">ID: {item.id}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Judul Portal
                  </label>
                  <input
                    type="text"
                    required
                    value={item.title}
                    onChange={(e) => {
                      const next = [...portalForm];
                      next[idx].title = e.target.value;
                      setPortalForm(next);
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subjudul / Keterangan
                  </label>
                  <input
                    type="text"
                    required
                    value={item.subtitle}
                    onChange={(e) => {
                      const next = [...portalForm];
                      next[idx].subtitle = e.target.value;
                      setPortalForm(next);
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tautan Tujuan (URL)
                  </label>
                  <input
                    type="text"
                    required
                    value={item.link}
                    onChange={(e) => {
                      const next = [...portalForm];
                      next[idx].link = e.target.value;
                      setPortalForm(next);
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm text-xs"
            >
              Simpan 4 Portal Gerbang
            </button>
          </div>
        </form>
      )}

      {/* TAB 5: PESAN TOKOH NASIONAL (VIP QUOTES) */}
      {activeTab === "tokoh" && (
        <form
          onSubmit={handleSaveTokoh}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-lg text-slate-900">
                Kelola Pesan & Sambutan Tokoh (VIP Quotes)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kutipan resmi dari para tokoh bangsa yang ditampilkan di seksi Sambutan Tokoh beranda.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const newId = `tokoh_${Date.now()}`;
                setTokohForm([
                  ...tokohForm,
                  {
                    id: newId,
                    name: "Nama Tokoh Baru",
                    title: "Jabatan Tokoh",
                    organization: "Instansi / Lembaga",
                    badge: "Pesan Inspiratif",
                    quote: "Kutipan sambutan atau apresiasi tokoh terhadap SMKN 3 Yogyakarta...",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                  },
                ]);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tokoh Baru</span>
            </button>
          </div>

          <div className="space-y-6">
            {tokohForm.map((tokoh, idx) => (
              <div
                key={tokoh.id}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Tokoh #{idx + 1}
                  </span>

                  {tokohForm.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus kutipan ${tokoh.name}?`)) {
                          setTokohForm(tokohForm.filter((_, i) => i !== idx));
                        }
                      }}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap Tokoh
                    </label>
                    <input
                      type="text"
                      required
                      value={tokoh.name}
                      onChange={(e) => {
                        const next = [...tokohForm];
                        next[idx].name = e.target.value;
                        setTokohForm(next);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Lencana Badge (Contoh: Amanat Pemimpin DIY)
                    </label>
                    <input
                      type="text"
                      required
                      value={tokoh.badge}
                      onChange={(e) => {
                        const next = [...tokohForm];
                        next[idx].badge = e.target.value;
                        setTokohForm(next);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Jabatan Resmi
                    </label>
                    <input
                      type="text"
                      required
                      value={tokoh.title}
                      onChange={(e) => {
                        const next = [...tokohForm];
                        next[idx].title = e.target.value;
                        setTokohForm(next);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Instansi / Organisasi
                    </label>
                    <input
                      type="text"
                      required
                      value={tokoh.organization}
                      onChange={(e) => {
                        const next = [...tokohForm];
                        next[idx].organization = e.target.value;
                        setTokohForm(next);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quote Text */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Isi Pesan / Kutipan Sambutan
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={tokoh.quote}
                    onChange={(e) => {
                      const next = [...tokohForm];
                      next[idx].quote = e.target.value;
                      setTokohForm(next);
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Foto Tokoh
                  </label>
                  <ImageUploadInput
                    value={tokoh.image}
                    onChange={(val) => {
                      const next = [...tokohForm];
                      next[idx].image = val;
                      setTokohForm(next);
                    }}
                    label="Unggah foto profil tokoh (dari file atau URL)"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm text-xs"
            >
              Simpan Pesan Tokoh
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
