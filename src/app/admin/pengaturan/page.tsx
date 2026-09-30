"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  Check,
  RotateCcw,
  Video,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Bot,
  ArrowRight,
  Globe,
  Sliders,
  Image as ImageIcon,
  Menu,
  Eye,
  EyeOff,
  Search,
} from "lucide-react";
import { useCMS } from "@/lib/store";
import { VideoData } from "@/lib/data-initial";
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, MailIcon } from "@/components/ui/SocialIcons";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

interface NavMenuItem {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
  order: number;
}

const DEFAULT_NAV_MENUS: NavMenuItem[] = [
  { id: "home", label: "Beranda", href: "/", isVisible: true, order: 1 },
  { id: "profile", label: "Profil", href: "/profil", isVisible: true, order: 2 },
  { id: "majors", label: "8 Konsentrasi Keahlian", href: "/program-keahlian", isVisible: true, order: 3 },
  { id: "news", label: "Kabar & Berita", href: "/kabar", isVisible: true, order: 4 },
  { id: "career", label: "Bursa Kerja (BKK)", href: "/karir", isVisible: true, order: 5 },
  { id: "services", label: "Portal Layanan", href: "/layanan", isVisible: true, order: 6 },
  { id: "quiz", label: "Kuis Rekomendasi Jurusan", href: "/kuis-jurusan", isVisible: true, order: 7 },
];

export default function AdminPengaturanPage() {
  const {
    schoolInfo,
    socialLinks,
    activeVideoId,
    videos,
    navLinks: cmsNavLinks,
    updateSchoolInfo,
    updateSocialLinks,
    updateNavLinks,
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
    logoUrl: "/media/school/logo.webp",
    faviconUrl: "/favicon.ico",
    metaTitle: "SMK Negeri 3 Yogyakarta | STM 2 Jetis Unggul & Berkarakter",
    metaDescription: "Website resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis). Konsisten mencetak teknisi unggul berstandar industri dengan 8 konsentrasi keahlian.",
    metaKeywords: "SMK Negeri 3 Yogyakarta, STM 2 Jetis, SMKN 3 Jogja, SMK Vokasi Yogyakarta, Sekolah Kejuruan Teknik",
  });

  const [socials, setSocials] = useState({
    facebook: socialLinks.facebook,
    twitter: socialLinks.twitter,
    instagram: socialLinks.instagram,
    youtube: socialLinks.youtube,
    email: socialLinks.email,
  });

  const [navMenus, setNavMenus] = useState<NavMenuItem[]>(DEFAULT_NAV_MENUS);
  const [savedMessage, setSavedMessage] = useState(false);
  const [videoForm, setVideoForm] = useState<VideoData>({
    id: "",
    title: "",
    subtitle: "",
    speaker: "",
    description: "",
    icon: "Play",
    color: "text-emerald-400 bg-emerald-500/20",
  });
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  // Load database settings on mount
  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.status === "success" && res.data) {
          const d = res.data;
          setForm((prev) => ({
            ...prev,
            name: d.schoolName || prev.name,
            motto: d.tagline || prev.motto,
            phone: d.phone || prev.phone,
            email: d.email || prev.email,
            address: d.address || prev.address,
            headmaster: d.headmaster || prev.headmaster,
            logoUrl: d.logoUrl || prev.logoUrl,
            faviconUrl: d.faviconUrl || prev.faviconUrl,
            metaTitle: d.metaTitle || prev.metaTitle,
            metaDescription: d.metaDescription || prev.metaDescription,
            metaKeywords: d.metaKeywords || prev.metaKeywords,
          }));

          setSocials({
            facebook: d.socialFacebook || socialLinks.facebook,
            twitter: d.socialTwitter || socialLinks.twitter,
            instagram: d.socialInstagram || socialLinks.instagram,
            youtube: d.socialYoutube || socialLinks.youtube,
            email: d.email || socialLinks.email,
          });

          if (d.navLinks) {
            try {
              const parsed = JSON.parse(d.navLinks);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setNavMenus(parsed);
              }
            } catch {}
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (cmsNavLinks && Array.isArray(cmsNavLinks) && cmsNavLinks.length > 0) {
      setNavMenus(cmsNavLinks);
    }
  }, [cmsNavLinks]);

  const resetVideoForm = () => {
    setVideoForm({
      id: "",
      title: "",
      subtitle: "",
      speaker: "",
      description: "",
      icon: "Play",
      color: "text-emerald-400 bg-emerald-500/20",
    });
    setEditingVideoId(null);
  };

  const saveVideo = (event: React.FormEvent) => {
    event.preventDefault();
    const id = editingVideoId || videoForm.id.trim() || `video-${Date.now()}`;
    const payload = { ...videoForm, id };
    updateVideos(
      editingVideoId
        ? videos.map((video) => (video.id === editingVideoId ? payload : video))
        : [...videos, payload]
    );
    if (!activeVideoId) setActiveVideoId(id);
    resetVideoForm();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Update client CMS store
    updateSchoolInfo({
      name: form.name,
      motto: form.motto,
      phone: form.phone,
      fax: form.fax,
      email: form.email,
      address: form.address,
      headmaster: form.headmaster,
      logoUrl: form.logoUrl,
      faviconUrl: form.faviconUrl,
    });
    updateSocialLinks(socials);
    updateNavLinks(navMenus);

    // 2. Persist to server SiteSetting model in PostgreSQL
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolName: form.name,
          tagline: form.motto,
          phone: form.phone,
          email: form.email,
          address: form.address,
          headmaster: form.headmaster,
          logoUrl: form.logoUrl,
          faviconUrl: form.faviconUrl,
          metaTitle: form.metaTitle,
          metaDescription: form.metaDescription,
          metaKeywords: form.metaKeywords,
          socialFacebook: socials.facebook,
          socialTwitter: socials.twitter,
          socialInstagram: socials.instagram,
          socialYoutube: socials.youtube,
          activeVideoId,
          navLinks: navMenus,
        }),
      });
    } catch (err) {
      console.warn("Failed to persist settings to server API:", err);
    }

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset seluruh data konten ke data otentik awal SMKN 3 Yogyakarta?")) {
      resetToDefaults();
      alert("Konten berhasil di-reset ke data asli sekolah.");
    }
  };

  const toggleNavVisibility = (id: string) => {
    setNavMenus((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, isVisible: !item.isVisible } : item));
      updateNavLinks(updated);
      return updated;
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Konfigurasi & Identitas Sistem</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Pengaturan Situs & Konten Global
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-light">
            Konfigurasi identitas sekolah, branding logo, SEO meta tags, navigasi menu, media sosial resmi, dan video cinema aktif.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Data Default</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>Pengaturan situs dan navigasi berhasil disimpan ke database produksi!</span>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Settings Form */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Section 1: Identitas & Logo */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <h2 className="font-display font-bold text-base text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Identitas Sekolah & Branding</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Resmi Sekolah</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Kepala Sekolah</label>
                  <input
                    type="text"
                    required
                    value={form.headmaster}
                    onChange={(e) => setForm({ ...form, headmaster: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tagline & Motto Sekolah</label>
                <input
                  type="text"
                  required
                  value={form.motto}
                  onChange={(e) => setForm({ ...form, motto: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <ImageUploadInput
                  label="Logo Resmi Sekolah"
                  value={form.logoUrl}
                  onChange={(url) => setForm({ ...form, logoUrl: url })}
                  placeholder="/media/school/logo.webp atau unggah dari penyimpanan komputer"
                  helperText="Format: WebP, PNG, SVG (transparan disarankan). Digunakan pada header & navbar."
                  presets={[
                    { label: "Logo Skagata Asli (WebP)", url: "/media/school/logo.webp" },
                    { label: "Logo Kemendikbud", url: "/media/school/logo-kemendikbud.webp" },
                  ]}
                />

                <ImageUploadInput
                  label="Favicon Website"
                  value={form.faviconUrl}
                  onChange={(url) => setForm({ ...form, faviconUrl: url })}
                  placeholder="/favicon.ico atau unggah dari penyimpanan komputer"
                  helperText="Format: ICO atau PNG 32x32 / 64x64 piksel untuk tab browser."
                  presets={[
                    { label: "Favicon Skagata Asli", url: "/favicon.ico" },
                  ]}
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nomor Fax</label>
                  <input
                    type="text"
                    value={form.fax}
                    onChange={(e) => setForm({ ...form, fax: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Alamat Email Resmi</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Section 2: SEO Meta Defaults */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <h2 className="font-display font-bold text-base text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                <span>SEO & Meta Tags Penelusuran Mesin Pencari</span>
              </h2>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Default Meta Title</label>
                <input
                  type="text"
                  required
                  value={form.metaTitle}
                  onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Default Meta Description</label>
                <textarea
                  rows={2}
                  required
                  value={form.metaDescription}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Kata Kunci Penelusuran (Keywords)</label>
                <input
                  type="text"
                  required
                  value={form.metaKeywords}
                  onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Section 3: Navigation Menu Visibility */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <h2 className="font-display font-bold text-base text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Menu className="w-4 h-4 text-emerald-600" />
                <span>Visibilitas Menu Navigasi Website</span>
              </h2>

              <div className="space-y-2">
                {navMenus.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                        {index + 1}
                      </span>
                      <div>
                        <span className="font-bold text-slate-800 block">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.href}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleNavVisibility(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-semibold text-[11px] transition ${
                        item.isVisible
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {item.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{item.isVisible ? "Aktif di Navbar" : "Disembunyikan"}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: 5 Official Social Media Links */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-display font-bold text-base text-slate-900">
                  5 Kanal Media Sosial Resmi Sekolah
                </h2>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-semibold">
                  Tampil di Topbar & Footer
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <FacebookIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Facebook URL</span>
                  </label>
                  <input
                    type="url"
                    value={socials.facebook}
                    onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <TwitterIcon className="w-3.5 h-3.5 text-sky-500" />
                    <span>Twitter / X URL</span>
                  </label>
                  <input
                    type="url"
                    value={socials.twitter}
                    onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                    <span>Instagram URL</span>
                  </label>
                  <input
                    type="url"
                    value={socials.instagram}
                    onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                    <span>YouTube Channel URL</span>
                  </label>
                  <input
                    type="url"
                    value={socials.youtube}
                    onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-950/40 text-xs"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Seluruh Pengaturan Situs</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: AI Assistant & Cinema Controller */}
        <div className="lg:col-span-4 space-y-5">
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

          {/* Media Management Quick Link Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <ImageIcon className="w-4 h-4" />
              <span>Media & Galeri Storage</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Kelola dan unggah gambar logo, kepala sekolah, fasilitas, dan banner dengan kompresi WebP otomatis.
            </p>
            <Link
              href="/admin/media"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:underline"
            >
              <span>Buka Galeri Media &rarr;</span>
            </Link>
          </div>

          {/* Video Cinema Controller */}
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
              <input
                required
                value={videoForm.id}
                disabled={!!editingVideoId}
                onChange={(e) => setVideoForm({ ...videoForm, id: e.target.value })}
                placeholder="ID YouTube (contoh: tJhzVg7Nq4g)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
              <input
                required
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                placeholder="Judul video"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <input
                value={videoForm.subtitle}
                onChange={(e) => setVideoForm({ ...videoForm, subtitle: e.target.value })}
                placeholder="Subjudul"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <textarea
                required
                rows={2}
                value={videoForm.description}
                onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                placeholder="Deskripsi video"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold"
                >
                  {editingVideoId ? "Simpan Video" : "Tambah Video"}
                </button>
                {editingVideoId && (
                  <button
                    type="button"
                    onClick={resetVideoForm}
                    className="px-3 py-2 bg-slate-100 rounded-xl font-bold"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-1.5">
              {videos.map((video) => (
                <div key={`${video.id}-actions`} className="flex items-center gap-1.5 text-[10px]">
                  <span className="truncate flex-1 text-slate-500">{video.id}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingVideoId(video.id);
                      setVideoForm(video);
                    }}
                    className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (videos.length > 1 && confirm("Hapus video ini?")) {
                        updateVideos(videos.filter((item) => item.id !== video.id));
                        if (activeVideoId === video.id) {
                          setActiveVideoId(videos.find((item) => item.id !== video.id)?.id || "");
                        }
                      }
                    }}
                    className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
