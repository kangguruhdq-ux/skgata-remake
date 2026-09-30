"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, User, ChevronRight, Shield, Award, Briefcase, GraduationCap, Network, CheckCircle2, Info } from "lucide-react";
import { useCMS } from "@/lib/store";
import { SCHOOL_INFO } from "@/lib/data-initial";

interface OrgNode {
  id: string;
  name: string;
  nip: string | null;
  position: string;
  department: string | null;
  level: number;
  order: number;
  photo: string | null;
  task: string | null;
  isActive: boolean;
  period: string | null;
}

export default function StrukturOrganisasiPage() {
  const { profile, majors } = useCMS();
  const [nodes, setNodes] = useState<OrgNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);

  useEffect(() => {
    fetch("/api/organization")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.data) && data.data.length > 0) {
          setNodes(data.data);
        }
      })
      .catch((err) => console.warn("Failed to load organization tree from API:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter levels
  const level1 = nodes.filter((n) => n.level === 1);
  const level2 = nodes.filter((n) => n.level === 2);
  const level3 = nodes.filter((n) => n.level === 3);
  const level4 = nodes.filter((n) => n.level === 4);

  return (
    <div className="bg-slate-50 py-12 lg:py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Profil</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800">Struktur Organisasi</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
            Tata Kelola Sekolah
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-2">
            Bagan Struktur Organisasi SKAGATA
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 font-light">
            Hierarki kepemimpinan, jajaran manajerial, ketua program keahlian, dan unit pelaksana teknis
            SMK Negeri 3 Yogyakarta dalam mewujudkan layanan prima pendidikan vokasi.
          </p>
        </div>

        {/* Tree View Bagan */}
        <div className="space-y-10">
          {/* Level 1: Kepala Sekolah & Komite Sekolah */}
          <div>
            <div className="text-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full">
                Pucuk Pimpinan & Komite Sekolah
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {(level1.length > 0 ? level1 : [
                {
                  id: "ks-fallback",
                  position: "Kepala Sekolah",
                  name: SCHOOL_INFO.headmaster,
                  nip: "19680512 199403 1 008",
                  photo: "/media/school/kepala-sekolah.webp",
                  task: "Penanggung jawab utama seluruh kebijakan manajerial dan akuntabilitas sekolah.",
                  level: 1,
                  order: 1,
                  department: "Pucuk Pimpinan",
                  isActive: true,
                  period: "2025/2026",
                },
                {
                  id: "komite-fallback",
                  position: "Ketua Komite Sekolah",
                  name: "Drs. H. Sukardi",
                  nip: "Tokoh Masyarakat & DUDIKA",
                  photo: null,
                  task: "Dewan pertimbangan dan kemitraan masyarakat serta industri.",
                  level: 1,
                  order: 2,
                  department: "Dewan Pertimbangan",
                  isActive: true,
                  period: "2025/2026",
                },
              ]).map((node) => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node as OrgNode)}
                  className="bg-white rounded-3xl p-6 border-2 border-emerald-500/80 shadow-sm hover:shadow-md transition text-center flex flex-col items-center justify-between cursor-pointer group"
                >
                  <div className="flex flex-col items-center">
                    {node.photo ? (
                      <img
                        src={node.photo}
                        alt={node.name}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/40 mb-3 shadow"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-3">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                    )}
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {node.position}
                    </span>
                    <h3 className="font-display font-black text-lg text-slate-900 mt-2 group-hover:text-emerald-700 transition">
                      {node.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{node.nip}</p>
                  </div>
                  {node.task && (
                    <p className="text-[11px] text-slate-600 mt-3 pt-3 border-t border-slate-100 line-clamp-2">
                      {node.task}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connector line */}
          <div className="w-0.5 h-8 bg-emerald-300 mx-auto" />

          {/* Level 2: Wakil Kepala Sekolah & KTU */}
          <div>
            <div className="text-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-200/80 px-3 py-1 rounded-full">
                Jajaran Manajemen (Wakil Kepala Sekolah & KTU)
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {(level2.length > 0 ? level2 : [
                { id: "vp1", position: "WKS 1 Bid. Kurikulum", name: "Drs. Agus Triyono, M.T.", task: "Kurikulum Merdeka & UKK Industri", level: 2, order: 1, department: "Kurikulum", isActive: true, period: "2025/2026", nip: null, photo: null },
                { id: "vp2", position: "WKS 2 Bid. Kesiswaan", name: "Budi Santosa, S.Pd., M.Eng.", task: "Ketarunaan & Karakter Taruna", level: 2, order: 2, department: "Kesiswaan", isActive: true, period: "2025/2026", nip: null, photo: null },
                { id: "vp3", position: "WKS 3 Bid. Humas & Hubin", name: "Rina Wijayanti, S.Pd., M.Hum.", task: "Kemitraan DUDIKA & Skagata TV", level: 2, order: 3, department: "Humas", isActive: true, period: "2025/2026", nip: null, photo: null },
                { id: "vp4", position: "WKS 4 Bid. Sarpras", name: "Heri Purwanto, S.T.", task: "Modernisasi Bengkel & Fasilitas", level: 2, order: 4, department: "Sarpras", isActive: true, period: "2025/2026", nip: null, photo: null },
                { id: "vp5", position: "Kepala Sub Bag. TU", name: "Siti Rahmawati, S.AP.", task: "Administrasi & Kepegawaian", level: 2, order: 5, department: "Tata Usaha", isActive: true, period: "2025/2026", nip: null, photo: null },
              ]).map((vp, idx) => (
                <div
                  key={vp.id}
                  onClick={() => setSelectedNode(vp as OrgNode)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mb-3">
                      {idx + 1}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                      {vp.position}
                    </span>
                    <h4 className="font-display font-bold text-sm text-slate-900 mt-1 group-hover:text-emerald-700 transition">
                      {vp.name}
                    </h4>
                  </div>
                  {vp.task && (
                    <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100 line-clamp-2">
                      {vp.task}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connector line */}
          <div className="w-0.5 h-8 bg-slate-300 mx-auto" />

          {/* Level 3: Ketua Program Keahlian (Kaprogli) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">
                Ketua Program & Konsentrasi Keahlian
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 mt-2">
                8 Konsentrasi Keahlian Vokasi
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {(level3.length > 0 ? level3 : majors.map((m, idx) => ({
                id: m.code,
                position: `Ketua Program ${m.code}`,
                name: m.headOfMajor || `Kepala Jurusan ${m.code}`,
                department: m.name,
                task: m.tagline,
                level: 3,
                order: idx + 1,
                photo: null,
                nip: null,
                isActive: true,
                period: "2025/2026",
              }))).map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => setSelectedNode(dept as OrgNode)}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200/80 hover:border-purple-300 transition flex flex-col justify-between cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-skagata-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow">
                      {dept.department ? dept.department.slice(0, 3).toUpperCase() : "VOK"}
                    </span>
                    <div className="overflow-hidden">
                      <p className="font-bold text-xs text-slate-900 group-hover:text-purple-700 transition leading-snug">
                        {dept.position}
                      </p>
                      <p className="text-[11px] text-slate-600 font-medium mt-1 truncate">
                        {dept.name}
                      </p>
                    </div>
                  </div>
                  {dept.task && (
                    <p className="text-[10px] text-slate-500 mt-2.5 pt-2 border-t border-slate-200/60 line-clamp-2">
                      {dept.task}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Level 4: Unit Pelaksana Khusus */}
          {level4.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-lg">
                  Unit Pelaksana Khusus & Penjaminan Mutu
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 mt-2">
                  Layanan Pendukung Pendidikan Taruna
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {level4.map((unit) => (
                  <div
                    key={unit.id}
                    onClick={() => setSelectedNode(unit)}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-300 transition flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        {unit.department || "Unit Khusus"}
                      </span>
                      <h4 className="font-display font-bold text-sm text-slate-900 mt-1 group-hover:text-amber-700 transition">
                        {unit.position}
                      </h4>
                      <p className="text-xs text-slate-700 font-semibold mt-1">{unit.name}</p>
                    </div>
                    {unit.task && (
                      <p className="text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-200/60 line-clamp-2">
                        {unit.task}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Detail Pejabat */}
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
              <div className="text-center">
                {selectedNode.photo ? (
                  <img
                    src={selectedNode.photo}
                    alt={selectedNode.name}
                    className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-emerald-500 shadow mb-3"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    <User className="w-8 h-8" />
                  </div>
                )}
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  {selectedNode.position}
                </span>
                <h3 className="font-display font-black text-xl text-slate-900 mt-2">
                  {selectedNode.name}
                </h3>
                {selectedNode.nip && (
                  <p className="text-xs text-slate-500 font-mono mt-1">NIP: {selectedNode.nip}</p>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block">Bagian / Divisi:</span>
                  <p className="text-slate-600">{selectedNode.department || "SMK Negeri 3 Yogyakarta"}</p>
                </div>
                {selectedNode.task && (
                  <div>
                    <span className="font-bold text-slate-700 block">Tugas Pokok & Fungsi:</span>
                    <p className="text-slate-600 leading-relaxed">{selectedNode.task}</p>
                  </div>
                )}
                {selectedNode.period && (
                  <div>
                    <span className="font-bold text-slate-700 block">Periode Amanah:</span>
                    <p className="text-slate-600">{selectedNode.period}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
