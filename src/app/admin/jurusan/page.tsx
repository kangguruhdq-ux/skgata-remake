"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Edit3,
  Check,
  X,
  Layers,
  Users,
  Award,
  UserCheck,
  ShieldCheck,
  Camera,
  Sparkles,
  Wrench,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Search,
  Image as ImageIcon,
  Briefcase,
  Building,
  ChevronRight,
  Info,
  GraduationCap,
} from "lucide-react";
import { useCMS } from "@/lib/store";
import { MajorData, MajorGalleryItem } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

const DEFAULT_TEACHER_PHOTO = "/media/school/staff-331f777f37.webp";

interface MajorFormState {
  id: string;
  code: string;
  name: string;
  slug: string;
  colorBadge: string;
  badgeBg: string;
  tagline: string;
  description: string;
  aksara: string;
  coverImage: string;
  totalStudents: number;
  accreditation: string;
  headOfMajor: string;
  headOfMajorPhoto: string;
  gallery: MajorGalleryItem[];
  studentWorks: {
    title: string;
    description: string;
    image?: string;
  }[];
  competencies: string[];
  facilities: string[];
  careerProspects: string[];
  industryPartners: string[];
}

const BADGE_PRESETS = [
  { label: "Merah (TKRO / Otomotif)", badge: "bg-red-700 text-white", bg: "bg-red-500/10 text-red-700 border-red-200" },
  { label: "Cyan (TP / Pemesinan)", badge: "bg-cyan-700 text-white", bg: "bg-cyan-500/10 text-cyan-700 border-cyan-200" },
  { label: "Kuning (TITL / Listrik)", badge: "bg-yellow-500 text-slate-900", bg: "bg-yellow-500/10 text-yellow-800 border-yellow-200" },
  { label: "Indigo (TE / Elektronika)", badge: "bg-indigo-600 text-white", bg: "bg-indigo-500/10 text-indigo-700 border-indigo-200" },
  { label: "Oranye (TKP / Konstruksi)", badge: "bg-orange-600 text-white", bg: "bg-orange-500/10 text-orange-700 border-orange-200" },
  { label: "Teal (DPIB / Arsitektur BIM)", badge: "bg-teal-600 text-white", bg: "bg-teal-500/10 text-teal-700 border-teal-200" },
  { label: "Biru (TJKT / Jaringan)", badge: "bg-blue-600 text-white", bg: "bg-blue-500/10 text-blue-700 border-blue-200" },
  { label: "Amber (BP / Broadcasting)", badge: "bg-amber-600 text-white", badgeBg: "bg-amber-500/10 text-amber-700 border-amber-200" },
  { label: "Emerald (Umum Skagata)", badge: "bg-emerald-600 text-white", bg: "bg-emerald-500/10 text-emerald-700 border-emerald-200" },
];

export default function AdminJurusanPage() {
  const { majors, updateMajors, teachers } = useCMS();
  const [editingMajor, setEditingMajor] = useState<MajorData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "gallery" | "works" | "curriculum" | "headmaster">("info");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Array item temp inputs
  const [newCompetency, setNewCompetency] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [newCareer, setNewCareer] = useState("");
  const [newPartner, setNewPartner] = useState("");

  const [form, setForm] = useState<MajorFormState>({
    id: "",
    code: "",
    name: "",
    slug: "",
    colorBadge: "bg-emerald-600 text-white",
    badgeBg: "bg-emerald-50 text-emerald-800",
    tagline: "",
    description: "",
    aksara: "",
    coverImage: "/media/school/otomotif-cover.webp",
    totalStudents: 288,
    accreditation: "A (Unggul) - Bengkel Resmi TEFA APM",
    headOfMajor: "",
    headOfMajorPhoto: DEFAULT_TEACHER_PHOTO,
    gallery: [],
    studentWorks: [],
    competencies: [],
    facilities: [],
    careerProspects: [],
    industryPartners: [],
  });

  const handleEditClick = (major: MajorData) => {
    setIsCreating(false);
    setEditingMajor(major);
    setActiveTab("info");
    setForm({
      id: major.id,
      code: major.code,
      name: major.name,
      slug: major.slug,
      colorBadge: major.colorBadge || "bg-emerald-600 text-white",
      badgeBg: major.badgeBg || "bg-emerald-50 text-emerald-800",
      tagline: major.tagline || "",
      description: major.description || "",
      aksara: major.aksara || "",
      coverImage: major.coverImage || "/media/school/otomotif-cover.webp",
      totalStudents: Number(major.totalStudents) || 0,
      accreditation: major.accreditation || "A (Unggul)",
      headOfMajor: major.headOfMajor || "",
      headOfMajorPhoto: major.headOfMajorPhoto || DEFAULT_TEACHER_PHOTO,
      gallery: Array.isArray(major.gallery) ? [...major.gallery] : [],
      studentWorks: Array.isArray(major.studentWorks) ? [...major.studentWorks] : [],
      competencies: Array.isArray(major.competencies) ? [...major.competencies] : [],
      facilities: Array.isArray(major.facilities) ? [...major.facilities] : [],
      careerProspects: Array.isArray(major.careerProspects) ? [...major.careerProspects] : [],
      industryPartners: Array.isArray(major.industryPartners) ? [...major.industryPartners] : [],
    });
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    const newId = `major-${Date.now()}`;
    const emptyMajor: MajorFormState = {
      id: newId,
      code: "BARU",
      name: "",
      slug: "",
      colorBadge: "bg-emerald-600 text-white",
      badgeBg: "bg-emerald-50 text-emerald-800",
      tagline: "",
      description: "",
      aksara: "",
      coverImage: "/media/school/otomotif-cover.webp",
      totalStudents: 100,
      accreditation: "A (Unggul)",
      headOfMajor: "",
      headOfMajorPhoto: DEFAULT_TEACHER_PHOTO,
      gallery: [],
      studentWorks: [],
      competencies: [],
      facilities: [],
      careerProspects: [],
      industryPartners: [],
    };
    setEditingMajor(emptyMajor as any);
    setForm(emptyMajor);
    setActiveTab("info");
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

  // Gallery CRUD Handlers
  const handleAddGalleryItem = () => {
    const newItem: MajorGalleryItem = {
      url: form.coverImage || "/media/school/otomotif-cover.webp",
      title: `Foto Fasilitas / Bengkel ${form.code || "Jurusan"} #${form.gallery.length + 1}`,
      caption: "Dokumentasi kegiatan praktik kejuruan taruna berstandar industri.",
    };
    setForm((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newItem],
    }));
  };

  const handleUpdateGalleryItem = (index: number, field: keyof MajorGalleryItem, val: string) => {
    setForm((prev) => {
      const updated = [...prev.gallery];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, gallery: updated };
    });
  };

  const handleDeleteGalleryItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleMoveGalleryItem = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= form.gallery.length) return;
    setForm((prev) => {
      const copy = [...prev.gallery];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return { ...prev, gallery: copy };
    });
  };

  // Student Works CRUD Handlers
  const handleAddWorkItem = () => {
    setForm((prev) => ({
      ...prev,
      studentWorks: [
        ...prev.studentWorks,
        {
          title: `Produk & Inovasi Taruna #${prev.studentWorks.length + 1}`,
          description: "Karya inovatif taruna berbasis pembelajaran Teaching Factory.",
          image: form.coverImage || "/media/school/otomotif-info-1.webp",
        },
      ],
    }));
  };

  const handleUpdateWorkItem = (index: number, field: "title" | "description" | "image", val: string) => {
    setForm((prev) => {
      const updated = [...prev.studentWorks];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, studentWorks: updated };
    });
  };

  const handleDeleteWorkItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      studentWorks: prev.studentWorks.filter((_, i) => i !== index),
    }));
  };

  // Array Field Handlers (Competencies, Facilities, Careers, Partners)
  const handleAddCompetency = () => {
    if (!newCompetency.trim()) return;
    setForm((prev) => ({
      ...prev,
      competencies: [...prev.competencies, newCompetency.trim()],
    }));
    setNewCompetency("");
  };

  const handleDeleteCompetency = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      competencies: prev.competencies.filter((_, i) => i !== idx),
    }));
  };

  const handleAddFacility = () => {
    if (!newFacility.trim()) return;
    setForm((prev) => ({
      ...prev,
      facilities: [...prev.facilities, newFacility.trim()],
    }));
    setNewFacility("");
  };

  const handleDeleteFacility = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== idx),
    }));
  };

  const handleAddCareer = () => {
    if (!newCareer.trim()) return;
    setForm((prev) => ({
      ...prev,
      careerProspects: [...prev.careerProspects, newCareer.trim()],
    }));
    setNewCareer("");
  };

  const handleDeleteCareer = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      careerProspects: prev.careerProspects.filter((_, i) => i !== idx),
    }));
  };

  const handleAddPartner = () => {
    if (!newPartner.trim()) return;
    setForm((prev) => ({
      ...prev,
      industryPartners: [...prev.industryPartners, newPartner.trim()],
    }));
    setNewPartner("");
  };

  const handleDeletePartner = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      industryPartners: prev.industryPartners.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Nama konsentrasi keahlian wajib diisi!");
      return;
    }

    const calculatedSlug =
      form.slug.trim() ||
      form.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const calculatedCode =
      form.code.trim().toUpperCase() ||
      calculatedSlug
        .split("-")
        .map((p) => p[0])
        .join("")
        .slice(0, 5)
        .toUpperCase() ||
      "JUR";

    const payload: MajorData = {
      id: form.id || `major-${Date.now()}`,
      code: calculatedCode,
      name: form.name.trim(),
      slug: calculatedSlug,
      colorBadge: form.colorBadge,
      badgeBg: form.badgeBg,
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      aksara: form.aksara.trim(),
      coverImage: form.coverImage,
      totalStudents: Number(form.totalStudents) || 0,
      accreditation: form.accreditation.trim(),
      headOfMajor: form.headOfMajor.trim(),
      headOfMajorPhoto: form.headOfMajorPhoto,
      gallery: form.gallery,
      studentWorks: form.studentWorks,
      competencies: form.competencies,
      facilities: form.facilities,
      careerProspects: form.careerProspects,
      industryPartners: form.industryPartners,
    };

    let updatedList: MajorData[];
    if (isCreating) {
      updatedList = [...majors, payload];
    } else {
      updatedList = majors.map((m) => (m.id === payload.id ? payload : m));
    }

    updateMajors(updatedList);
    setEditingMajor(null);
    setIsCreating(false);

    setToastMessage(`Program keahlian "${payload.name}" berhasil disimpan dan langsung tayang ke publik!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDelete = (id: string, name: string) => {
    if (majors.length <= 1) {
      alert("Minimal harus ada 1 program keahlian di sistem.");
      return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus jurusan "${name}" dari seluruh sistem dan website publik?`)) {
      updateMajors(majors.filter((major) => major.id !== id));
      setToastMessage(`Jurusan "${name}" berhasil dihapus.`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  // Filter list
  const filteredMajors = majors.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.code.toLowerCase().includes(q) ||
      (m.tagline && m.tagline.toLowerCase().includes(q)) ||
      (m.headOfMajor && m.headOfMajor.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Manajemen Akademik & Vokasi</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Program Keahlian & Galeri Bengkel
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-light">
            Kelola data 8 jurusan: cover bengkel, galeri foto praktik, karya/inovasi taruna, kurikulum kompetensi, fasilitas lab, dan profil guru pengampu.
          </p>
        </div>

        <button
          onClick={handleCreateClick}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jurusan Baru</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari jurusan berdasarkan nama, kode (TKRO, TP, dll), atau guru..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Menampilkan <span className="font-bold text-slate-800">{filteredMajors.length}</span> dari {majors.length} Konsentrasi Keahlian
        </div>
      </div>

      {/* Grid Jurusan Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMajors.map((major) => (
          <div
            key={major.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group"
          >
            <div>
              {/* Cover Thumbnail */}
              <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-900 mb-3 border border-slate-100 group-hover:scale-[1.01] transition">
                <img
                  src={major.coverImage}
                  alt={major.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded shadow ${major.colorBadge}`}>
                  {major.code}
                </span>

                {/* Badges Count on Cover */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px]">
                  <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Camera className="w-3 h-3 text-emerald-400" />
                    <span>{major.gallery?.length || 0} Foto Galeri</span>
                  </span>
                  <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{major.studentWorks?.length || 0} Karya</span>
                  </span>
                </div>
              </div>

              {/* Major Info */}
              <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                {major.name}
              </h3>
              {major.aksara && (
                <span className="text-[11px] text-emerald-600 font-serif block opacity-90 mt-0.5">
                  {major.aksara}
                </span>
              )}
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {major.tagline}
              </p>

              {/* Accredit & Students */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold border-t border-slate-100 pt-2 text-slate-600">
                <span className="truncate max-w-[150px]">{major.accreditation}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  {major.totalStudents} Taruna
                </span>
              </div>

              {/* Head of Major */}
              <div className="mt-2.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 border border-emerald-400/50 shrink-0">
                  <img
                    src={major.headOfMajorPhoto || DEFAULT_TEACHER_PHOTO}
                    alt={major.headOfMajor || "Guru"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block leading-none">
                    Ketua Konsentrasi
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800 truncate block mt-0.5" title={major.headOfMajor}>
                    {major.headOfMajor || "Belum ditentukan"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-1.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleEditClick(major)}
                className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-emerald-200"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Edit Lengkap & Foto ({major.gallery?.length || 0})</span>
              </button>

              <div className="flex gap-1.5">
                <Link
                  href={`/jurusan/${major.slug}`}
                  target="_blank"
                  className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-[11px] font-semibold transition flex items-center justify-center gap-1 border border-slate-200"
                >
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                  <span>Lihat Web</span>
                </Link>
                <button
                  onClick={() => handleDelete(major.id, major.name)}
                  className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-xl text-[11px] font-semibold transition flex items-center justify-center border border-rose-100"
                  title="Hapus Jurusan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive Edit / Create Modal */}
      {editingMajor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[calc(100dvh-2rem)] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${form.colorBadge}`}>
                  {form.code || "JUR"}
                </span>
                <div>
                  <h2 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-tight">
                    {isCreating ? "Tambah Program Keahlian Baru" : `Edit: ${form.name || editingMajor.name}`}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    ID: {form.id} | Slug: /jurusan/{form.slug || "otomatis"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setEditingMajor(null); setIsCreating(false); }}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 overflow-x-auto shrink-0 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className={`py-3 px-3 font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "info"
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Info & Cover Bengkel</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className={`py-3 px-3 font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "gallery"
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-teal-600" />
                <span>Galeri Bengkel ({form.gallery.length} Foto)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("works")}
                className={`py-3 px-3 font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "works"
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Karya & Inovasi ({form.studentWorks.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("curriculum")}
                className={`py-3 px-3 font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "curriculum"
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <span>Kompetensi & Fasilitas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("headmaster")}
                className={`py-3 px-3 font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "headmaster"
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ketua Konsentrasi</span>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
              {/* TAB 1: INFO & COVER */}
              {activeTab === "info" && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid sm:grid-cols-12 gap-3.5">
                    <div className="sm:col-span-8">
                      <label className="font-semibold text-slate-700 block mb-1">
                        Nama Konsentrasi Keahlian *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Contoh: Teknik Kendaraan Ringan Otomotif"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="font-semibold text-slate-700 block mb-1">
                        Kode Singkatan (e.g. TKRO) *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.code}
                        onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                        placeholder="TKRO"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Aksara Jawa Tradisional
                      </label>
                      <input
                        type="text"
                        value={form.aksara}
                        onChange={(e) => setForm({ ...form, aksara: e.target.value })}
                        placeholder="ꦠꦺꦏ꧀ꦤꦶꦏ꧀ꦏꦼꦤ꧀ꦢꦫꦄꦤ꧀ꦫꦶꦔꦤ꧀"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-serif text-sm"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Status Akreditasi & Sertifikasi
                      </label>
                      <input
                        type="text"
                        required
                        value={form.accreditation}
                        onChange={(e) => setForm({ ...form, accreditation: e.target.value })}
                        placeholder="A (Unggul) - Bengkel Resmi TEFA APM"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Jumlah Taruna Aktif
                      </label>
                      <input
                        type="number"
                        required
                        value={form.totalStudents}
                        onChange={(e) => setForm({ ...form, totalStudents: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Pilihan Warna Badge Jurusan
                      </label>
                      <select
                        value={form.colorBadge}
                        onChange={(e) => {
                          const preset = BADGE_PRESETS.find((p) => p.badge === e.target.value);
                          setForm({
                            ...form,
                            colorBadge: e.target.value,
                            badgeBg: preset?.bg || form.badgeBg,
                          });
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                      >
                        {BADGE_PRESETS.map((p) => (
                          <option key={p.badge} value={p.badge}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Tagline Keunggulan Jurusan
                    </label>
                    <input
                      type="text"
                      required
                      value={form.tagline}
                      onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                      placeholder="Teknologi Kendaraan Modern, Sistem Injeksi EFI & Electric Vehicle"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Foto Cover Utama Bengkel Jurusan */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <ImageUploadInput
                      label="Foto Utama / Cover Bengkel Jurusan"
                      value={form.coverImage}
                      onChange={(url) => setForm({ ...form, coverImage: url })}
                      placeholder="/media/school/otomotif-cover.webp atau unggah dari penyimpanan komputer"
                      helperText="Unggah foto suasana bengkel kejuruan dari penyimpanan laptop/HP. Gambar ini tampil di hero showcase halaman jurusan."
                      presets={[
                        { label: "Bengkel Otomotif Skagata (TKRO)", url: "/media/school/otomotif-cover.webp" },
                        { label: "Bengkel Pemesinan CNC (TP)", url: "/media/school/pemesinan-cover.webp" },
                        { label: "Lab Komputer & Fiber Optik (TJKT)", url: "/media/school/tjkt-cover.webp" },
                        { label: "Studio Broadcasting (BP)", url: "/media/school/broadcasting-cover.webp" },
                        { label: "Lab Instalasi Listrik (TITL)", url: "/media/school/titl-cover.webp" },
                        { label: "Studio Gambar BIM (DPIB)", url: "/media/school/dpib-cover.webp" },
                        { label: "Workshop Konstruksi Kayu/Baja (TKP)", url: "/media/school/tkp-cover.webp" },
                        { label: "Lab Elektronika & IoT (TE)", url: "/media/school/te-cover.webp" },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Deskripsi Lengkap Program Keahlian
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Deskripsikan kurikulum, keunggulan teknis, fasilitas peralatan, dan profil lulusan..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: GALERI BENGKEL & FASILITAS (FOTO) */}
              {activeTab === "gallery" && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-teal-900 text-xs flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-teal-600" />
                        <span>Galeri Foto Bengkel & Laboratorium Kejuruan</span>
                      </h3>
                      <p className="text-[11px] text-teal-700 mt-0.5">
                        Kelola seluruh dokumentasi otentik sarana dan peralatan praktik di {form.name || form.code}. Taruna dan calon siswa dapat melihat galeri ini di Lightbox interaktif.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddGalleryItem}
                      className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Tambah Foto Galeri</span>
                    </button>
                  </div>

                  {form.gallery.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500">
                      <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2 opacity-60" />
                      <p className="font-semibold text-xs">Belum ada foto galeri di bengkel ini.</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Klik tombol "+ Tambah Foto Galeri" di atas untuk menambahkan dokumentasi sarana.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {form.gallery.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 relative group"
                        >
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                              <span>Foto #{idx + 1}: {item.title || "Tanpa Judul"}</span>
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveGalleryItem(idx, "up")}
                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                                title="Pindah ke atas"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === form.gallery.length - 1}
                                onClick={() => handleMoveGalleryItem(idx, "down")}
                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                                title="Pindah ke bawah"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteGalleryItem(idx)}
                                className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded ml-2"
                                title="Hapus foto dari galeri"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-semibold text-slate-700 block mb-1">
                                Judul / Nama Fasilitas
                              </label>
                              <input
                                type="text"
                                required
                                value={item.title}
                                onChange={(e) => handleUpdateGalleryItem(idx, "title", e.target.value)}
                                placeholder="Contoh: Bengkel Resmi TEFA Skagata Auto Service"
                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-semibold text-slate-700 block mb-1">
                                Keterangan / Deskripsi Singkat
                              </label>
                              <input
                                type="text"
                                required
                                value={item.caption}
                                onChange={(e) => handleUpdateGalleryItem(idx, "caption", e.target.value)}
                                placeholder="Contoh: Bengkel mobil standar APM dengan 4 car lift hidrolik..."
                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <ImageUploadInput
                            label="Pilih / Unggah File Foto dari Perangkat"
                            value={item.url}
                            onChange={(newUrl) => handleUpdateGalleryItem(idx, "url", newUrl)}
                            placeholder="/media/school/... atau unggah dari komputer/HP"
                            helperText="Pilih foto langsung dari laptop atau galeri media sekolah."
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: KARYA & INOVASI TARUNA */}
              {activeTab === "works" && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Karya, Inovasi & Prestasi Taruna</span>
                      </h3>
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        Tampilkan produk teaching factory, mobil riset, prototipe mesin, atau aplikasi yang dibuat taruna {form.name || form.code}.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddWorkItem}
                      className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Tambah Karya Taruna</span>
                    </button>
                  </div>

                  {form.studentWorks.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500">
                      <Sparkles className="w-8 h-8 mx-auto text-amber-400 mb-2 opacity-60" />
                      <p className="font-semibold text-xs">Belum ada karya inovasi taruna yang didaftarkan.</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Klik tombol "+ Tambah Karya Taruna" untuk menambahkan produk buatan taruna.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {form.studentWorks.map((work, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 relative group"
                        >
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                              <span>Karya #{idx + 1}: {work.title || "Tanpa Judul"}</span>
                            </span>

                            <button
                              type="button"
                              onClick={() => handleDeleteWorkItem(idx)}
                              className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                              title="Hapus karya"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-semibold text-slate-700 block mb-1">
                                Judul Karya / Inovasi
                              </label>
                              <input
                                type="text"
                                required
                                value={work.title}
                                onChange={(e) => handleUpdateWorkItem(idx, "title", e.target.value)}
                                placeholder="Contoh: Mobil Listrik Riset Taruna Skagata EV-01"
                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="font-semibold text-slate-700 block mb-1">
                                Deskripsi Hasil Karya / Produk
                              </label>
                              <input
                                type="text"
                                required
                                value={work.description}
                                onChange={(e) => handleUpdateWorkItem(idx, "description", e.target.value)}
                                placeholder="Contoh: Kendaraan prototipe listrik bertenaga baterai lithium..."
                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <ImageUploadInput
                            label="Foto Produk / Karya Taruna (Opsional)"
                            value={work.image || ""}
                            onChange={(newUrl) => handleUpdateWorkItem(idx, "image", newUrl)}
                            placeholder="/media/school/... atau unggah dari laptop/HP"
                            helperText="Unggah foto prototipe produk atau dokumentasi uji coba taruna."
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: KURIKULUM, FASILITAS & KEMITRAAN */}
              {activeTab === "curriculum" && (
                <div className="space-y-5 animate-in fade-in">
                  {/* 1. Kompetensi Utama */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Kompetensi Utama yang Dipelajari ({form.competencies.length})</span>
                    </h3>
                    <div className="space-y-1.5">
                      {form.competencies.map((comp, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-slate-200 text-xs"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span>{comp}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteCompetency(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newCompetency}
                        onChange={(e) => setNewCompetency(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCompetency(); } }}
                        placeholder="Ketik kompetensi baru (e.g. Diagnostik Kerusakan EFI dengan Scanner) lalu tekan Enter..."
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCompetency}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>

                  {/* 2. Fasilitas Bengkel */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-emerald-600" />
                      <span>Fasilitas Bengkel & Laboratorium Kejuruan ({form.facilities.length})</span>
                    </h3>
                    <div className="space-y-1.5">
                      {form.facilities.map((fac, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-slate-200 text-xs"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>{fac}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteFacility(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newFacility}
                        onChange={(e) => setNewFacility(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddFacility(); } }}
                        placeholder="Ketik fasilitas baru (e.g. Bengkel TEFA Auto Service 4 Car Lift) lalu tekan Enter..."
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddFacility}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>

                  {/* 3. Prospek Karir & Mitra */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Karir */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                        <span>Prospek Karir & Profesi ({form.careerProspects.length})</span>
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {form.careerProspects.map((car, idx) => (
                          <div key={idx} className="flex items-center justify-between p-1.5 bg-white rounded-lg border text-[11px]">
                            <span>{car}</span>
                            <button type="button" onClick={() => handleDeleteCareer(idx)} className="text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          value={newCareer}
                          onChange={(e) => setNewCareer(e.target.value)}
                          placeholder="Karir baru..."
                          className="flex-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <button type="button" onClick={handleAddCareer} className="px-2.5 py-1 bg-slate-700 text-white rounded-lg font-bold text-xs">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Mitra */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-600" />
                        <span>Mitra Industri DUDIKA ({form.industryPartners.length})</span>
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {form.industryPartners.map((ptn, idx) => (
                          <div key={idx} className="flex items-center justify-between p-1.5 bg-white rounded-lg border text-[11px]">
                            <span>{ptn}</span>
                            <button type="button" onClick={() => handleDeletePartner(idx)} className="text-slate-400 hover:text-rose-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          value={newPartner}
                          onChange={(e) => setNewPartner(e.target.value)}
                          placeholder="Mitra baru (e.g. PT Toyota Astra)..."
                          className="flex-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <button type="button" onClick={handleAddPartner} className="px-2.5 py-1 bg-slate-700 text-white rounded-lg font-bold text-xs">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: KETUA / GURU JURUSAN */}
              {activeTab === "headmaster" && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Ketua Konsentrasi Keahlian / Guru Pengampu
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Data ini ditampilkan pada kartu profil pimpinan konsentrasi di halaman detail jurusan. Anda dapat memilih cepat dari 148 guru sekolah atau mengisinya secara manual.
                    </p>

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

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">
                          Nama Guru / Ketua Konsentrasi *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.headOfMajor}
                          onChange={(e) => setForm({ ...form, headOfMajor: e.target.value })}
                          placeholder="Contoh: Widodo, M.Pd."
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <ImageUploadInput
                        label="Pasfoto Guru / Ketua Konsentrasi"
                        value={form.headOfMajorPhoto}
                        onChange={(newUrl) => setForm({ ...form, headOfMajorPhoto: newUrl })}
                        placeholder="/media/school/staff-... atau unggah dari laptop/HP"
                        helperText="Unggah pasfoto guru dari penyimpanan atau pilih dari direktori."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 shrink-0">
                <span className="text-[11px] text-slate-400">
                  Semua perubahan akan langsung disimpan ke database produksi dan sinkron di beranda & halaman detail.
                </span>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => { setEditingMajor(null); setIsCreating(false); }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition text-slate-600 text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow text-xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan Seluruh Perubahan Jurusan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
