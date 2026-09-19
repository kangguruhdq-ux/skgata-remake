"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

const TAB_META = {
  berita: {
    javanese: "ꦧꦺꦫꦶꦠ",
    title: "Pusat Liputan & Berita Terkini",
    subtitle: "Ikuti dinamika agenda kejuruan, kemitraan industri global, dan kegiatan kesiswaan.",
    categoryParam: "Berita",
    allLabel: "Lihat Semua Berita",
  },
  pengumuman: {
    javanese: "ꦥꦺꦔꦸꦩꦸꦩꦤ꧀",
    title: "Pusat Pengumuman Resmi",
    subtitle: "Informasi kedinasan, seleksi penerimaan murid baru (SPMB), dan agenda resmi sekolah.",
    categoryParam: "Pengumuman",
    allLabel: "Lihat Semua Pengumuman",
  },
  artikel: {
    javanese: "ꦄꦂꦠꦶꦏꦺꦭ꧀",
    title: "Koleksi Artikel & Opini Vokasi",
    subtitle: "Wawasan teknologi terapan, pedagogi kejuruan, dan opini praktisi industri masa kini.",
    categoryParam: "Artikel",
    allLabel: "Lihat Semua Artikel",
  },
};

export default function NewsCarousel() {
  const [activeTab, setActiveTab] = useState<"berita" | "pengumuman" | "artikel">("berita");
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentMeta = TAB_META[activeTab];

  const scrollCarousel = (direction: -1 | 1) => {
    if (!carouselRef.current) return;
    const amount = 320;
    carouselRef.current.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="berita" className="py-14 lg:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 reveal-up">
          <div>
            <span className="font-serif text-skagata-700 dark:text-emerald-400 text-xl font-bold tracking-widest block mb-1">
              {currentMeta.javanese}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {currentMeta.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              {currentMeta.subtitle}
            </p>
          </div>

          {/* Filter Tab Buttons & Carousel Arrow Controllers */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-200/70 p-1.5 rounded-2xl border border-slate-300/60">
              <button
                onClick={() => setActiveTab("berita")}
                className={`tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "berita"
                    ? "bg-white text-skagata-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <i className="fa-solid fa-newspaper mr-1.5" />
                Berita
              </button>
              <button
                onClick={() => setActiveTab("pengumuman")}
                className={`tab-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === "pengumuman"
                    ? "bg-white text-skagata-800 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <i className="fa-solid fa-bullhorn mr-1.5" />
                Pengumuman
              </button>
              <button
                onClick={() => setActiveTab("artikel")}
                className={`tab-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === "artikel"
                    ? "bg-white text-skagata-800 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <i className="fa-solid fa-book-bookmark mr-1.5" />
                Artikel
              </button>
            </div>

            {/* Carousel Controls (visible on berita tab) */}
            {activeTab === "berita" && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollCarousel(-1)}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-skagata-700 hover:text-white transition flex items-center justify-center shadow-sm btn-bounce"
                  title="Sebelumnya"
                >
                  <i className="fa-solid fa-arrow-left text-xs" />
                </button>
                <button
                  onClick={() => scrollCarousel(1)}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-skagata-700 hover:text-white transition flex items-center justify-center shadow-sm btn-bounce"
                  title="Berikutnya"
                >
                  <i className="fa-solid fa-arrow-right text-xs" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Content: BERITA (Horizontal Carousel) */}
        {activeTab === "berita" && (
          <div className="tab-content reveal-zoom delay-1">
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
            >
              {/* Berita 1 */}
              <article className="snap-start flex-shrink-0 w-[280px] sm:w-[330px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition interactive-card flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-slate-200 overflow-hidden">
                    <img
                      src="https://smkn3jogja.sch.id/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-08-at-18.14.17-260x195.jpeg"
                      alt="SMKN 3 Perluas Akses ke Jepang"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-skagata-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Internasional
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
                      <i className="fa-regular fa-calendar text-[11px]" /> 8 September 2026
                    </div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-snug hover:text-skagata-700 transition">
                      <Link href="/kabar/smkn-3-yogyakarta-perluas-akses-kebekerjaan-ke-jepang-hadirkan-owner-perusahaan-konstruksi">
                        SMKN 3 Yogyakarta Perluas Akses Kebekerjaan ke Jepang, Hadirkan Owner Perusahaan Konstruksi
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                      Memperkuat jembatan penyaluran alumni teknik langsung bekerja di industri konstruksi Tokyo & Osaka, Jepang.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    href="/kabar/smkn-3-yogyakarta-perluas-akses-kebekerjaan-ke-jepang-hadirkan-owner-perusahaan-konstruksi"
                    className="mt-1 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-skagata-700 font-semibold"
                  >
                    <span>Baca Rincian</span>
                    <i className="fa-solid fa-chevron-right text-[10px]" />
                  </Link>
                </div>
              </article>

              {/* Berita 2 */}
              <article className="snap-start flex-shrink-0 w-[280px] sm:w-[330px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition interactive-card flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-slate-200 overflow-hidden">
                    <img
                      src="https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-18.30.44-2-260x195.jpeg"
                      alt="Upacara Bahasa Jawa"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-purple-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Keistimewaan DIY
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
                      <i className="fa-regular fa-calendar text-[11px]" /> 31 Agustus 2026
                    </div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-snug hover:text-skagata-700 transition">
                      <Link href="/kabar/smkn-3-yogyakarta-hidupkan-nilai-keistimewaan-diy-lewat-upacara-berbahasa-jawa-dan-gagrag-yogyakarta">
                        Hidupkan Nilai Keistimewaan DIY Lewat Upacara Berbahasa Jawa dan Gagrag Yogyakarta
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                      Penanaman karakter sopan santun dan busana adat Mataram Ngayogyakarta bagi ribuan siswa Skagata.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    href="/kabar/smkn-3-yogyakarta-hidupkan-nilai-keistimewaan-diy-lewat-upacara-berbahasa-jawa-dan-gagrag-yogyakarta"
                    className="mt-1 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-skagata-700 font-semibold"
                  >
                    <span>Baca Rincian</span>
                    <i className="fa-solid fa-chevron-right text-[10px]" />
                  </Link>
                </div>
              </article>

              {/* Berita 3 */}
              <article className="snap-start flex-shrink-0 w-[280px] sm:w-[330px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition interactive-card flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-slate-200 overflow-hidden">
                    <img
                      src="https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-19-at-19.49.05-1-260x195.jpeg"
                      alt="Kelas Modena Technical School"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Kemitraan DUDIKA
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
                      <i className="fa-regular fa-calendar text-[11px]" /> 19 Agustus 2026
                    </div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-snug hover:text-skagata-700 transition">
                      <Link href="/kabar/perkuat-kemitraan-industri-kelas-modena-disiapkan-jadi-modena-technical-school">
                        Perkuat Kemitraan Industri, Kelas MODENA Disiapkan Jadi Modena Technical School
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                      Program link-and-match menghadirkan sertifikasi kompetensi industri appliances berstandar internasional.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    href="/kabar/perkuat-kemitraan-industri-kelas-modena-disiapkan-jadi-modena-technical-school"
                    className="mt-1 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-skagata-700 font-semibold"
                  >
                    <span>Baca Rincian</span>
                    <i className="fa-solid fa-chevron-right text-[10px]" />
                  </Link>
                </div>
              </article>

              {/* Berita 4 */}
              <article className="snap-start flex-shrink-0 w-[280px] sm:w-[330px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition interactive-card flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-slate-200 overflow-hidden">
                    <img
                      src="https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg"
                      alt="Festa Mangajapa ke-61"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-pink-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      HUT Ke-61
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
                      <i className="fa-regular fa-calendar text-[11px]" /> 20 Agustus 2026
                    </div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-snug hover:text-skagata-700 transition">
                      <Link href="/kabar/festa-mangajapa-2-000-siswa-smkn-3-yogyakarta-hidupkan-seni-dan-budaya-di-usia-ke-61">
                        FESTA MANGAJAPA, 2.000 Siswa Hidupkan Seni dan Budaya di Usia ke-61
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                      Perayaan HUT Mangajapa menyajikan parade kirab budaya dan kreasi teknologi karya taruna-taruni.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    href="/kabar/festa-mangajapa-2-000-siswa-smkn-3-yogyakarta-hidupkan-seni-dan-budaya-di-usia-ke-61"
                    className="mt-1 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-skagata-700 font-semibold"
                  >
                    <span>Baca Rincian</span>
                    <i className="fa-solid fa-chevron-right text-[10px]" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* Tab Content: PENGUMUMAN */}
        {activeTab === "pengumuman" && (
          <div className="tab-content grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 flex flex-col justify-between interactive-card">
              <div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  SPMB 2026
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  <i className="fa-regular fa-calendar" /> 26 Juni 2026
                </p>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1.5 leading-snug">
                  Pengumuman Hasil Akhir Seleksi Penerimaan Murid Baru (SPMB) DIY SMKN 3 Yogyakarta
                </h3>
                <p className="text-xs text-slate-600 mt-1.5">
                  Hasil seleksi resmi calon taruna baru jalur zonasi, prestasi, dan afirmasi dapat diakses secara transparan.
                </p>
              </div>
              <a
                href="https://smkn3jogja.sch.id/pengumuman/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-semibold text-skagata-700 hover:underline flex items-center gap-1"
              >
                Lihat Surat Keputusan <i className="fa-solid fa-arrow-right text-[10px]" />
              </a>
            </article>

            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 flex flex-col justify-between interactive-card">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Kelulusan
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  <i className="fa-regular fa-calendar" /> 5 Mei 2025
                </p>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1.5 leading-snug">
                  Pengumuman Kelulusan Siswa Kelas XII SMKN 3 Yogyakarta Tahun Pelajaran 2024/2025
                </h3>
                <p className="text-xs text-slate-600 mt-1.5">
                  Pengumuman kelulusan 100% siswa kelas XII dan sosialisasi legalisir ijazah online.
                </p>
              </div>
              <a
                href="https://kelulusansmk.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-semibold text-skagata-700 hover:underline flex items-center gap-1"
              >
                Cek Portal Kelulusan <i className="fa-solid fa-arrow-right text-[10px]" />
              </a>
            </article>

            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 flex flex-col justify-between interactive-card">
              <div>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  PPDB Afirmasi
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  <i className="fa-regular fa-calendar" /> 30 Mei 2023
                </p>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1.5 leading-snug">
                  SK Penetapan PPDB Jalur Disabilitas SMK N 3 Yogyakarta
                </h3>
                <p className="text-xs text-slate-600 mt-1.5">
                  Pemberian kuota dan akses ramah inklusi untuk calon siswa berkebutuhan khusus berpotensi kejuruan.
                </p>
              </div>
              <a
                href="https://smkn3jogja.sch.id/pengumuman/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-semibold text-skagata-700 hover:underline flex items-center gap-1"
              >
                Unduh Berkas SK <i className="fa-solid fa-arrow-right text-[10px]" />
              </a>
            </article>
          </div>
        )}

        {/* Tab Content: ARTIKEL */}
        {activeTab === "artikel" && (
          <div className="tab-content grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 flex flex-col justify-between interactive-card">
              <div>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Kompetisi LKS
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  <i className="fa-regular fa-calendar" /> 8 April 2026
                </p>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1.5 leading-snug">
                  SMKN 3 Yogyakarta Jadi Tuan Rumah LKS Tingkat Provinsi DIY 2026
                </h3>
                <p className="text-xs text-slate-600 mt-1.5">
                  Memacu etos juara dan standar keterampilan internasional bidang welding, electronics, dan electrical installation.
                </p>
              </div>
              <a
                href="https://smkn3jogja.sch.id/artikel/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-semibold text-skagata-700 hover:underline flex items-center gap-1"
              >
                Baca Tulisan Lengkap <i className="fa-solid fa-arrow-right text-[10px]" />
              </a>
            </article>

            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 flex flex-col justify-between interactive-card">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Career Day
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  <i className="fa-regular fa-calendar" /> 19 September 2025
                </p>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1.5 leading-snug">
                  Career Day SMKN 3 Yogyakarta: Jembatani Pendidikan dengan Dunia Kerja
                </h3>
                <p className="text-xs text-slate-600 mt-1.5">
                  Wawancara kerja langsung oleh 40+ perusahaan manufaktur otomotif, konstruksi sipil, dan industri IT.
                </p>
              </div>
              <a
                href="https://smkn3jogja.sch.id/artikel/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-semibold text-skagata-700 hover:underline flex items-center gap-1"
              >
                Baca Tulisan Lengkap <i className="fa-solid fa-arrow-right text-[10px]" />
              </a>
            </article>

            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 flex flex-col justify-between interactive-card">
              <div>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                  Pedagogi Vokasi
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  <i className="fa-regular fa-calendar" /> 7 Juni 2024
                </p>
                <h3 className="font-display font-bold text-sm text-slate-900 mt-1.5 leading-snug">
                  Workshop PjBL Berbasis TPACK untuk Penguatan Karya Inovatif Siswa
                </h3>
                <p className="text-xs text-slate-600 mt-1.5">
                  Pengembangan metode pembelajaran berbasis proyek industri nyata untuk guru vokasi.
                </p>
              </div>
              <a
                href="https://smkn3jogja.sch.id/artikel/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-semibold text-skagata-700 hover:underline flex items-center gap-1"
              >
                Baca Tulisan Lengkap <i className="fa-solid fa-arrow-right text-[10px]" />
              </a>
            </article>
          </div>
        )}

        {/* View All Button for the current category */}
        <div className="mt-10 text-center">
          <Link
            href={`/kabar?category=${currentMeta.categoryParam}`}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-skagata-800 hover:bg-skagata-900 text-white font-bold text-xs shadow-md transition group"
          >
            <span>{currentMeta.allLabel}</span>
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
