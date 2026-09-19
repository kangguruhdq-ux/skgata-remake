"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
  Check,
  Sparkles,
  RefreshCw,
  FolderOpen,
} from "lucide-react";

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
  placeholder = "https://... atau unggah dari komputer",
  helperText = "Format didukung: JPG, PNG, WebP, GIF. Maksimal 5 MB.",
  presets,
}: ImageUploadInputProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value || "");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar yang valid (JPG, PNG, WebP, atau GIF).");
      return;
    }

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file melebihi 5MB. Silakan pilih gambar yang lebih ringan.");
      return;
    }

    setIsUploading(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result);
        setUrlInput(result);
      }
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert("Gagal membaca file gambar dari penyimpanan lokal.");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setFileName("");
    }
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
      label: "Bengkel CNC Mesin",
      url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-11.56.52-576x1024.jpeg",
    },
    {
      label: "Studio Skagata TV",
      url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/BP-1024x740.jpeg",
    },
    {
      label: "Lab TJKT & Fiber Optik",
      url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/TJ-2023-1024x683.jpg",
    },
    {
      label: "Bengkel Otomotif TEFA",
      url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-09.29.53-576x1024.jpeg",
    },
    {
      label: "Lab Modena Elektronika",
      url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-11-at-08.33.41-576x1024.jpeg",
    },
    {
      label: "Studio Desain DPIB BIM",
      url: "https://smkn3jogja.sch.id/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-13-at-15.09.03-e1653536892633-1024x1024.jpeg",
    },
  ];

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-slate-700 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>{label}</span>
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2 py-0.5 rounded-md font-medium transition flex items-center gap-1 ${
              activeTab === "upload"
                ? "bg-white text-emerald-700 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <FolderOpen className="w-3 h-3" />
            <span>Penyimpanan Lokal</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2 py-0.5 rounded-md font-medium transition flex items-center gap-1 ${
              activeTab === "url"
                ? "bg-white text-emerald-700 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>URL Web</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Local File Upload */}
      {activeTab === "upload" ? (
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
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 rounded-2xl p-4 transition cursor-pointer text-center group"
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-emerald-400 text-slate-500 group-hover:text-emerald-600 flex items-center justify-center transition shadow-sm">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-slate-700 font-semibold text-xs">
                Klik untuk memilih foto dari penyimpanan laptop / HP
              </div>
              <p className="text-[11px] text-slate-400 font-light">
                {fileName ? `File terpilih: ${fileName}` : helperText}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Direct URL Input */
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none font-mono text-[11px]"
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
          Pilihan Cepat Foto Otentik SMKN 3:
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

      {/* Image Preview & Delete / Reset Action */}
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
              <span>Foto Siap Ditampilkan</span>
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
