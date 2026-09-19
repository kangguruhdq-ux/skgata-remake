"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Calendar, ChevronRight, ArrowRight, Eye, User, Newspaper, Megaphone, BookOpen, Award } from "lucide-react";
import { POSTS_DATA } from "@/lib/data-initial";
import { formatDate } from "@/lib/utils";

function KabarContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "Semua";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchParams.get("category")) {
      setActiveCategory(searchParams.get("category")!);
    }
  }, [searchParams]);

  const categories = ["Semua", "Berita", "Pengumuman", "Artikel", "SPMB"];

  const filteredPosts = POSTS_DATA.filter((post) => {
    const matchesCat = activeCategory === "Semua" || post.category === activeCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-skagata-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800">Kabar & Informasi</span>
        </nav>

        {/* Title Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="font-serif text-skagata-700 text-xl block mb-1">
                ꦧꦺꦫꦶꦠꦭꦤ꧀ꦥꦺꦔꦸꦩꦸꦩꦤ꧀
              </span>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
                Pusat Kabar & Publikasi Resmi
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Informasi aktual kegiatan sekolah, kemitraan DUDIKA, SPMB 2026, dan artikel vokasi SMKN 3 Yogyakarta.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kabar atau pengumuman..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-skagata-500 focus:bg-white transition"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? "bg-skagata-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition interactive-card flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-skagata-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{post.views} pembaca</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-900 leading-snug hover:text-skagata-700 transition">
                    <Link href={`/kabar/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/kabar/${post.slug}`}
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-skagata-700 font-semibold hover:text-skagata-900 transition"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-white rounded-3xl border border-slate-200">
            Tidak ditemukan artikel atau pengumuman yang cocok dengan filter Anda.
          </div>
        )}
      </div>
    </div>
  );
}

export default function KabarPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Memuat kabar...</div>}>
      <KabarContent />
    </Suspense>
  );
}
