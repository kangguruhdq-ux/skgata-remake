"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
  Check,
  FolderOpen,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

interface MediaLibraryItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  category: string;
  alt?: string | null;
}

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  presets?: { label: string; url: string }[];
}

export default function ImageUploadInput({
  label = "Foto / Gambar",
  value,
  onChange,
  required = false,
  placeholder = "https://... atau unggah dari penyimpanan",
  helperText = "Format didukung: WebP, PNG, JPG, GIF, SVG. Maksimal 5 MB.",
  presets,
}: ImageUploadInputProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "gallery" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value || "");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Media Library state
  const [mediaItems, setMediaItems] = useState<MediaLibraryItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [gallerySearch, setGallerySearch] = useState("");

  useEffect(() => {
    setUrlInput(value || "");
  }, [value]);

  const loadMediaLibrary = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setMediaItems(data.data);
      }
    } catch (err) {
      console.warn("Failed to load media library:", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleTabChange = (tab: "upload" | "gallery" | "url") => {
    setActiveTab(tab);
    if (tab === "gallery" && mediaItems.length === 0) {
      loadMediaLibrary();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar yang valid (WebP, PNG, JPG, atau GIF).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file melebihi batas 5MB. Silakan pilih gambar yang lebih ringan.");
      return;
    }

    setIsUploading(true);
    setFileName(file.name);

    try {
      // 1. Try uploading to server Media Storage (/api/admin/media)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "general");
      formData.append("alt", file.name);
      formData.append("usageContext", label);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "success" && data.data?.url) {
          onChange(data.data.url);
          setUrlInput(data.data.url);
          setIsUploading(false);
          return;
        }
      }

      // 2. Fallback to FileReader data URL if server storage returns non-success
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onChange(result);
          setUrlInput(result);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      // Fallback
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onChange(result);
          setUrlInput(result);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setFileName("");
    }
  };

  const handleSelectFromGallery = (item: MediaLibraryItem) => {
    onChange(item.url);
    setUrlInput(item.url);
    setFileName(item.originalName || item.filename);
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const defaultPresets = presets || [
    {
      label: "Logo Resmi SKAGATA",
      url: "/media/school/logo.webp",
    },
    {
      label: "Foto Kepala Sekolah",
      url: "/media/school/kepala-sekolah.webp",
    },
    {
      label: "Gerbang STM 2 Jetis",
      url: "/media/school/gerbang-utama.webp",
    },
    {
      label: "Video Profil Utama",
      url: "/media/school/video-profil.webp",
    },
    {
      label: "Studio Skagata TV",
      url: "/media/school/broadcast.webp",
    },
    {
      label: "Lab Jaringan TJKT",
      url: "/media/school/tjkt.webp",
    },
  ];

  const filteredGallery = mediaItems.filter((item) => {
    if (!gallerySearch) return true;
    const q = gallerySearch.toLowerCase();
    return (
      item.filename.toLowerCase().includes(q) ||
      item.originalName.toLowerCase().includes(q) ||
      (item.alt && item.alt.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-2 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <label className="font-semibold text-slate-700 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>{label}</span>
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleTabChange("upload")}
            className={`px-2 py-0.5 rounded-md font-medium transition flex items-center gap-1 ${
              activeTab === "upload"
                ? "bg-white text-emerald-700 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Unggah dari Storage</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("gallery")}
            className={`px-2 py-0.5 rounded-md font-medium transition flex items-center gap-1 ${
              activeTab === "gallery"
                ? "bg-white text-emerald-700 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <FolderOpen className="w-3 h-3" />
            <span>Galeri Media Server</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("url")}
            className={`px-2 py-0.5 rounded-md font-medium transition flex items-center gap-1 ${
              activeTab === "url"
                ? "bg-white text-emerald-700 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>URL</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Local File Upload to Server Storage */}
      {activeTab === "upload" && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`file-input-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          />

          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 transition text-center cursor-pointer group ${
              isUploading
                ? "border-emerald-400 bg-emerald-50/50 cursor-wait"
                : "border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-emerald-400 text-slate-500 group-hover:text-emerald-600 flex items-center justify-center transition shadow-sm">
                {isUploading ? (
                  <RefreshCw className="w-5 h-5 text-emerald-600 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <div className="text-slate-700 font-semibold text-xs">
                {isUploading
                  ? "Mengunggah foto ke penyimpanan server..."
                  : "Klik untuk memilih foto dari penyimpanan laptop / HP"}
              </div>
              <p className="text-[11px] text-slate-400 font-light">
                {fileName ? `File terpilih: ${fileName}` : helperText}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Media Storage Gallery Picker */}
      {activeTab === "gallery" && (
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={gallerySearch}
                onChange={(e) => setGallerySearch(e.target.value)}
                placeholder="Cari foto di galeri..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="button"
              onClick={loadMediaLibrary}
              disabled={loadingMedia}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-700"
              title="Segarkan galeri"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingMedia ? "animate-spin" : ""}`} />
            </button>
          </div>

          {loadingMedia ? (
            <div className="py-6 text-center text-slate-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Memuat galeri media...</span>
            </div>
          ) : filteredGallery.length === 0 ? (
            <div className="py-6 text-center text-slate-400">
              <p>Belum ada foto yang cocok di galeri penyimpanan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
              {filteredGallery.map((item) => {
                const isSelected = value === item.url;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectFromGallery(item)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition group text-left ${
                      isSelected
                        ? "border-emerald-600 ring-2 ring-emerald-500/30"
                        : "border-slate-200 hover:border-emerald-400"
                    }`}
                    title={item.originalName || item.filename}
                  >
                    <img
                      src={item.url}
                      alt={item.alt || item.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-emerald-600/40 flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Mode 3: Direct URL Input */}
      {activeTab === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px]"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold transition text-xs flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Terapkan</span>
          </button>
        </div>
      )}

      {/* Preset Quick Selection Buttons */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Pilihan Cepat Aset Resmi Sekolah:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {defaultPresets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(p.url);
                setUrlInput(p.url);
                setFileName("");
              }}
              className="text-[10.5px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200 transition font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Image Preview & Delete Action */}
      {value && (
        <div className="relative mt-2 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3 overflow-hidden">
          <div className="w-20 h-16 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 relative">
            <img
              src={value}
              alt="Pratinjau Foto"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Foto Terpasang</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate font-mono mt-0.5">
              {value.startsWith("data:") ? `DataURL Base64 (${value.slice(0, 32)}...)` : value}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClear}
            title="Hapus foto ini"
            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition border border-transparent hover:border-rose-200 flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
