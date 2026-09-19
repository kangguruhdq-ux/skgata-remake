"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit3, Check, X, Laptop, ExternalLink } from "lucide-react";
import { useCMS } from "@/lib/store";
import { ServiceData } from "@/lib/data-initial";

export default function AdminLayananPage() {
  const { services, updateServices } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    badge: "Sistem Baru",
    description: "",
    url: "https://",
  });

  const handleEdit = (s: ServiceData) => {
    setForm({
      name: s.name,
      badge: s.badge,
      description: s.description,
      url: s.url,
    });
    setEditingId(s.id);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    updateServices(
      services.map((s) => (s.id === editingId ? { ...s, ...form } : s))
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="font-display font-black text-2xl text-slate-900">
          Manajemen Tautan Portal & Layanan Kampus
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Konfigurasi alamat server eksternal (LMS Kelasiber Moodle, OPAC Widura, Rapot RSPK, Cloud, Whistleblowing System).
        </p>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-display font-bold text-base text-slate-900">
                Ubah Tautan Portal Layanan
              </h2>
              <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Layanan</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Badge Kategori</label>
                <input
                  type="text"
                  required
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">URL Endpoint Server</label>
                <input
                  type="url"
                  required
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid of Services */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
                  {srv.badge}
                </span>
                <a
                  href={srv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-700"
                  title="Buka Tautan"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <h3 className="font-display font-bold text-sm text-slate-900 mt-1">{srv.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.description}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-2 truncate bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                {srv.url}
              </p>
            </div>

            <button
              onClick={() => handleEdit(srv)}
              className="mt-4 w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200/80"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Ubah URL Layanan</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
