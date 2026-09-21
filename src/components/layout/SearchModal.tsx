"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, BookOpen, Layers, Laptop, User } from "lucide-react";
import { MAJORS_DATA, POSTS_DATA, SERVICES_DATA, TEACHERS_DATA } from "@/lib/data-initial";
import { useCMS } from "@/lib/store";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { majors, posts, services, teachers } = useCMS();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previous; };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const majorList = majors && majors.length > 0 ? majors : MAJORS_DATA;
  const postList = posts && posts.length > 0 ? posts : POSTS_DATA;
  const serviceList = services && services.length > 0 ? services : SERVICES_DATA;
  const teacherList = teachers && teachers.length > 0 ? teachers : TEACHERS_DATA;

  const filteredMajors = q
    ? majorList.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.code.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      )
    : [];

  const filteredPosts = q
    ? postList.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      )
    : [];

  const filteredServices = q
    ? serviceList.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
    : [];

  const filteredTeachers = q
    ? teacherList.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.role.toLowerCase().includes(q) ||
          (t.department && t.department.toLowerCase().includes(q))
      )
    : [];

  const hasResults =
    filteredMajors.length > 0 ||
    filteredPosts.length > 0 ||
    filteredServices.length > 0 ||
    filteredTeachers.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[calc(100dvh-2rem)] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-display font-bold text-base text-slate-900">
              Pencarian Cepat SKAGATA
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input */}
        <div className="mt-4 relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari program keahlian, berita, SPMB, layanan, guru..."
            className="w-full px-4 py-3 pl-11 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-skagata-500 focus:bg-white transition"
          />
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded-md"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Results Container */}
        <div className="mt-4 overflow-y-auto flex-1 pr-1 space-y-4">
          {!q && (
            <div className="py-6 text-center space-y-3">
              <p className="text-xs text-slate-400">Kata kunci populer yang sering dicari:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                {["SPMB", "TJKT", "Pemesinan", "Kelasiber", "Widura", "Ketarunaan", "Jepang"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-skagata-700 rounded-xl transition text-slate-600"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-8 text-center text-slate-400 text-sm">
              Tidak ditemukan hasil untuk kata kunci <span className="font-semibold text-slate-700">"{query}"</span>.
            </div>
          )}

          {/* Majors Results */}
          {filteredMajors.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Program Keahlian ({filteredMajors.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredMajors.map((m) => (
                  <Link
                    key={m.id}
                    href={`/jurusan/${m.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{m.name}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {m.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{m.tagline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Posts Results */}
          {filteredPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Kabar & Artikel ({filteredPosts.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredPosts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/kabar/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition"
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-emerald-600 uppercase">
                        {p.category}
                      </span>
                      <p className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-1">
                        {p.title}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Digital Services Results */}
          {filteredServices.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                <Laptop className="w-3.5 h-3.5 text-purple-600" />
                <span>Layanan Digital ({filteredServices.length})</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredServices.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{s.name}</span>
                      <span className="text-[10px] text-slate-500 line-clamp-1">{s.description}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                      Buka portal &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Teachers Results */}
          {filteredTeachers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>Pendidik & Tendik ({filteredTeachers.length})</span>
              </div>
              <div className="space-y-1">
                {filteredTeachers.map((t) => (
                  <Link
                    key={t.id}
                    href="/profil/sdm"
                    onClick={onClose}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div>
                      <p className="font-bold text-xs text-slate-900">{t.name}</p>
                      <p className="text-[10px] text-slate-500">{t.role}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">NIP: {t.nip}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Gunakan Esc untuk menutup</span>
          <Link
            href="/kabar"
            onClick={onClose}
            className="text-emerald-600 hover:underline font-semibold"
          >
            Lihat Arsip Lengkap &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
