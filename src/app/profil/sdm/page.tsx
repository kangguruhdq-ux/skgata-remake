"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Users, ChevronRight, UserCheck, Filter, ChevronLeft, ShieldCheck } from "lucide-react";
import { useCMS } from "@/lib/store";

const DEFAULT_PHOTO = "/media/school/staff-331f777f37.webp";
const ITEMS_PER_PAGE = 24;

export default function SDMPage() {
  const { teachers } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic departments derived from active CMS teachers list
  const departments = useMemo(() => {
    const defaultDepts = ["Semua", "Pendidik", "Tenaga Kependidikan", "Pimpinan & Manajemen", "Instruktur Taruna"];
    const customDepts = new Set<string>();
    teachers.forEach((t) => {
      if (t.department && !["Pendidik", "Tenaga Kependidikan", "Pimpinan & Manajemen", "Instruktur Taruna"].includes(t.department)) {
        customDepts.add(t.department);
      }
    });
    return [...defaultDepts, ...Array.from(customDepts).sort()];
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        teacher.name.toLowerCase().includes(term) ||
        teacher.role.toLowerCase().includes(term) ||
        (teacher.nip && teacher.nip.toLowerCase().includes(term)) ||
        (teacher.department && teacher.department.toLowerCase().includes(term));

      let matchesDept = true;
      if (selectedDept === "Pendidik") {
        matchesDept = teacher.department === "Pendidik" || /guru/i.test(teacher.role);
      } else if (selectedDept === "Tenaga Kependidikan") {
        matchesDept = teacher.department === "Tenaga Kependidikan" || /staf|tata usaha|teknisi|pustakawan/i.test(teacher.role);
      } else if (selectedDept === "Pimpinan & Manajemen") {
        matchesDept = /kepala|waka|ka\.|manajemen/i.test(teacher.role);
      } else if (selectedDept === "Instruktur Taruna") {
        matchesDept = /taruna|instruktur|pembina/i.test(teacher.role);
      } else if (selectedDept !== "Semua") {
        matchesDept = teacher.department === selectedDept;
      }

      return matchesSearch && matchesDept;
    });
  }, [teachers, searchTerm, selectedDept]);

  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE));
  const displayedTeachers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTeachers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTeachers, currentPage]);

  const handleFilterChange = (dept: string) => {
    setSelectedDept(dept);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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
                <span>Pendidik & Tenaga Kependidikan ({teachers.length} Data)</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 leading-tight">
                Direktori Guru & Tenaga Kependidikan
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Tenaga pendidik profesional bersertifikasi asesor BNSP dan instruktur industri untuk membimbing taruna unggul.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Cari nama guru, NIP, peran, unit..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-skagata-500 focus:bg-white transition"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          {/* Department Filter Chips */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter Unit:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => handleFilterChange(dept)}
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

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-50">
            <span>
              Menampilkan <strong>{displayedTeachers.length}</strong> dari <strong>{filteredTeachers.length}</strong> pendidik & staf
              {selectedDept !== "Semua" ? ` [Unit: ${selectedDept}]` : ""}
            </span>
            {totalPages > 1 && (
              <span className="font-mono">Halaman {currentPage} dari {totalPages}</span>
            )}
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition interactive-card flex gap-4 items-center"
            >
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm border border-slate-100">
                <img
                  src={teacher.photo || DEFAULT_PHOTO}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="overflow-hidden flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block max-w-full truncate">
                  {teacher.department || "Pendidik"}
                </span>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1 truncate" title={teacher.name}>
                  {teacher.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1" title={teacher.role}>{teacher.role}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  {teacher.nip && teacher.nip !== "-" ? `NIP. ${teacher.nip}` : "SMKN 3 Yogyakarta"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Only show a sliding window of pages
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                        currentPage === pageNum
                          ? "bg-skagata-700 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                  return <span key={pageNum} className="text-slate-400 text-xs px-1">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1 shadow-sm"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-white rounded-3xl border border-slate-200">
            Tidak ditemukan data pendidik yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>
    </div>
  );
}
