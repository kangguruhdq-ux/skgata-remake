"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit3, Check, X, Newspaper, Calendar, Eye } from "lucide-react";
import { useCMS } from "@/lib/store";
import { PostData } from "@/lib/data-initial";
import { formatDate } from "@/lib/utils";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

export default function AdminBeritaPage() {
  const { posts, updatePosts } = useCMS();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Berita" as "Berita" | "Pengumuman" | "Artikel" | "SPMB",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "Humas SMKN 3 Yogyakarta",
  });

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      category: "Berita",
      excerpt: "",
      content: "",
      coverImage: "",
      author: "Humas SMKN 3 Yogyakarta",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEditClick = (post: PostData) => {
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      author: post.author,
    });
    setEditingId(post.id);
    setIsAdding(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      updatePosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // update
      const updated = posts.map((p) =>
        p.id === editingId
          ? {
              ...p,
              ...form,
            }
          : p
      );
      updatePosts(updated);
    } else {
      // create
      const newPost: PostData = {
        id: `post-${Date.now()}`,
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: form.category,
        excerpt: form.excerpt,
        content: form.content,
        coverImage:
          form.coverImage ||
          "/media/school/jepang-2.webp",
        author: form.author,
        publishedAt: new Date().toISOString().split("T")[0],
        views: 1,
      };
      updatePosts([newPost, ...posts]);
    }

    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-display font-black text-2xl text-slate-900">
            Manajemen Berita & Publikasi
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola publikasi berita, rilis pengumuman resmi, artikel opini guru, dan informasi SPMB.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 bg-skagata-700 hover:bg-skagata-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Artikel Baru</span>
          </button>
        )}
      </div>

      {/* Form Add / Edit */}
      {isAdding && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-400 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
            <h2 className="font-display font-bold text-base text-slate-900">
              {editingId ? "Edit Artikel" : "Buat Publikasi Baru"}
            </h2>
            <button
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              <span>Batal</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm({
                      ...form,
                      title,
                      slug: form.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    });
                  }}
                  placeholder="Masukkan judul berita..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Slug URL</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="contoh-judul-artikel"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                >
                  <option value="Berita">Berita</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Artikel">Artikel</option>
                  <option value="SPMB">SPMB</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Penulis / Author</label>
                <input
                  type="text"
                  required
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-1">
              <ImageUploadInput
                label="Cover Gambar Berita / Artikel"
                value={form.coverImage}
                onChange={(newUrl) => setForm({ ...form, coverImage: newUrl })}
                helperText="Pilih foto dokumentasi acara, workshop, atau prestasi dari komputer."
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Ringkasan / Excerpt</label>
              <textarea
                rows={2}
                required
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Ringkasan singkat yang muncul di kartu listing..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Konten Lengkap (HTML Didukung)</label>
              <textarea
                rows={6}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Tuliskan isi artikel lengkap..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none font-mono text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>{editingId ? "Simpan Perubahan" : "Terbitkan Artikel"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Listing */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Daftar Seluruh Artikel ({posts.length})</span>
          <span>Tindakan Cepat</span>
        </div>

        <div className="divide-y divide-slate-100">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900 mt-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{post.excerpt}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleEditClick(post)}
                  className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition"
                  title="Edit artikel"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(post.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                  title="Hapus artikel"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
