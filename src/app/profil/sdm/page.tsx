"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Users, ChevronRight, UserCheck, Filter } from "lucide-react";
import { TEACHERS_DATA } from "@/lib/data-initial";

export default function SDMPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("Semua");

  const departments = [
    "Semua",
    "Pendidik (Guru)",
    "Tenaga Kependidikan",
    "Pimpinan & Manajemen",
    "Instruktur Taruna",
  ];

  const filteredTeachers = TEACHERS_DATA.filter((teacher) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      teacher.name.toLowerCase().includes(term) ||
      teacher.role.toLowerCase().includes(term) ||
      (teacher.nip && teacher.nip.toLowerCase().includes(term));

    let matchesDept = true;
    if (selectedDept === "Pendidik (Guru)") {
      matchesDept = teacher.department === "Pendidik";
    } else if (selectedDept === "Tenaga Kependidikan") {
      matchesDept = teacher.department === "Tenaga Kependidikan";
    } else if (selectedDept === "Pimpinan & Manajemen") {
      matchesDept = /kepala|waka|ka\./i.test(teacher.role);
    } else if (selectedDept === "Instruktur Taruna") {
      matchesDept = /taruna|instruktur/i.test(teacher.role);
    }

    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-skagata-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Profil</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800">Direktori SDM Guru & Tendik</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg w-fit mb-2">
                <Users className="w-4 h-4" />
                <span>Pendidik & Tenaga Kependidikan</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 leading-tight">
                Direktori Guru & Tenaga Kependidikan
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Tenaga pendidik profesional bersertifikasi asesor BNSP dan industri untuk membimbing taruna unggul.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama guru, NIP, peran..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-skagata-500 focus:bg-white transition"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          {/* Department Filter Chips */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
            <span className="text-xs text-slate-400 self-center mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter Unit:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                  selectedDept === dept
                    ? "bg-skagata-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition interactive-card flex gap-4 items-center"
            >
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="overflow-hidden flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {teacher.department}
                </span>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1 truncate">
                  {teacher.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{teacher.role}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  {teacher.nip ? `NIP. ${teacher.nip}` : "SMKN 3 Yogyakarta"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-white rounded-3xl border border-slate-200">
            Tidak ditemukan data pendidik yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>
    </div>
  );
}
