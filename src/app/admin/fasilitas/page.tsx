"use client";

import React, { useState } from "react";
import {
  Wrench,
  Plus,
  Trash2,
  Edit2,
  Check,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useCMS } from "@/lib/store";
import { FacilityItem } from "@/lib/data-initial";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

export default function AdminFasilitasPage() {
  const { facilities, updateFacilities } = useCMS();
  const [savedMessage, setSavedMessage] = useState("");

  const [editingFacility, setEditingFacility] = useState<FacilityItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<FacilityItem>({
    id: "",
    title: "",
    category: "Teknik Mesin",
    image: "",
    desc: "",
    equipment: [],
  });

  const [equipmentInput, setEquipmentInput] = useState("");

  const notifySaved = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleStartAdd = () => {
    setEditingFacility(null);
    setForm({
      id: "fac-" + Date.now(),
      title: "",
      category: "Teknik Mesin",
      image: "",
      desc: "",
      equipment: [],
    });
    setEquipmentInput("");
    setIsAdding(true);
  };

  const handleStartEdit = (item: FacilityItem) => {
    setEditingFacility(item);
    setForm(item);
    setEquipmentInput((item.equipment || []).join(", "));
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedEquipment = equipmentInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: FacilityItem = {
      ...form,
      equipment: parsedEquipment,
    };

    if (editingFacility) {
      const updated = facilities.map((f) => (f.id === editingFacility.id ? payload : f));
      updateFacilities(updated);
      notifySaved("Data sarana & bengkel berhasil diperbarui!");
    } else {
      updateFacilities([...facilities, payload]);
      notifySaved("Fasilitas baru berhasil ditambahkan!");
    }
    setIsAdding(false);
    setEditingFacility(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus data fasilitas bengkel ini dari daftar sarana sekolah?")) {
      updateFacilities(facilities.filter((f) => f.id !== id));
      notifySaved("Fasilitas berhasil dihapus.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit mb-2">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            <span>Manajemen Sarana & Prasarana</span>
          </div>
          <h1 className="font-display font-black text-2xl text-slate-900">
            Kelola Fasilitas Bengkel & Laboratorium
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Atur dokumentasi bengkel CNC, lab komputer, studio siaran TV, car lift otomotif, dan sarana umum.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/profil/fasilitas"
            target="_blank"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
          >
            <span>Lihat Halaman Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          {!isAdding && (
            <button
              onClick={handleStartAdd}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Fasilitas</span>
            </button>
          )}
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Form Tambah/Edit */}
      {isAdding && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-sm text-slate-900">
              {editingFacility ? "Edit Fasilitas Bengkel/Lab" : "Tambah Sarana Prasarana Baru"}
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Batal
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Fasilitas / Ruang Praktik
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: CNC Machining Center & Fabrikasi Presisi"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Kategori Jurusan / Penanggung Jawab
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Teknik Mesin">Teknik Mesin</option>
                  <option value="Broadcasting">Broadcasting (Skagata TV)</option>
                  <option value="TJKT">TJKT (Jaringan & Komputer)</option>
                  <option value="Elektronika">Elektronika & Robotika</option>
                  <option value="Otomotif">Otomotif & Kendaraan Listrik</option>
                  <option value="DPIB">DPIB (Arsitektur & BIM)</option>
                  <option value="Konstruksi">Konstruksi Perumahan</option>
                  <option value="Listrik">Listrik & Daya Industri</option>
                  <option value="Fasilitas Umum">Fasilitas Umum (Perpus / Lapangan / Aula)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Deskripsi Spesifikasi & Kapasitas
              </label>
              <textarea
                rows={3}
                required
                placeholder="Jelaskan perlengkapan, mesin utama, luas, dan standar industri fasilitas ini..."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Daftar Peralatan Utama (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                placeholder="Contoh: CNC Milling 5-Axis, Mesin Bubut Presisi, Ruang CAD/CAM"
                value={equipmentInput}
                onChange={(e) => setEquipmentInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <ImageUploadInput
              label="Foto Fasilitas / Bengkel (Upload dari Komputer / URL)"
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              required
              placeholder="https://... atau unggah foto dari komputer"
              helperText="Foto akan ditampilkan sebagai visualisasi fasilitas di halaman profil."
            />

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
              >
                Simpan Fasilitas
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid Fasilitas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-slate-900">
              <img
                src={fac.image}
                alt={fac.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                {fac.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                  {fac.desc}
                </p>

                {fac.equipment && fac.equipment.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                    {fac.equipment.slice(0, 3).map((eq, i) => (
                      <span
                        key={i}
                        className="text-[9.5px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono"
                      >
                        ✓ {eq}
                      </span>
                    ))}
                    {fac.equipment.length > 3 && (
                      <span className="text-[9.5px] text-slate-400 self-center">
                        +{fac.equipment.length - 3} lainnya
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-slate-100">
                <button
                  onClick={() => handleStartEdit(fac)}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-emerald-700 border border-slate-200 transition text-xs flex items-center gap-1 font-semibold"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(fac.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-slate-200 transition text-xs flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
