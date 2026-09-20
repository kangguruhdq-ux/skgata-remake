"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Newspaper, Bell, BookOpen } from "lucide-react";

interface NewsItem {
  id: string;
  category: string;
  categoryBadge: string;
  badgeBg: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

const BERITA_ITEMS: NewsItem[] = [
  {
    id: "berita-1",
    category: "Internasional",
    categoryBadge: "Internasional",
    badgeBg: "bg-emerald-700 text-white",
    date: "8 September 2026",
    title: "SMKN 3 Yogyakarta Perluas Akses Kebekerjaan ke Jepang, Hadirkan Owner Perusahaan Konstruksi",
    excerpt: "Memperkuat jembatan penyaluran alumni teknik langsung bekerja di industri konstruksi Tokyo & Osaka, Jepang dengan visa kerja kejuruan khusus.",
    image: "/media/school/jepang-2.webp",
    link: "/kabar/smkn-3-yogyakarta-perluas-akses-kebekerjaan-ke-jepang-hadirkan-owner-perusahaan-konstruksi",
  },
  {
    id: "berita-2",
    category: "Lingkungan",
    categoryBadge: "Adiwiyata",
    badgeBg: "bg-teal-700 text-white",
    date: "12 Juni 2026",
    title: "Satu Langkah Kecil, Berdampak Besar: Wujudkan Sekolah Bebas Sampah Plastik",
    excerpt: "Lingkungan sekolah yang bersih, sehat, dan berbudaya lingkungan hidup merupakan komitmen seluruh civitas akademika kampus Skagata Jetis.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-18.30.44-2-260x195.jpeg",
    link: "/kabar/smkn-3-yogyakarta-hidupkan-nilai-keistimewaan-diy-lewat-upacara-berbahasa-jawa-dan-gagrag-yogyakarta",
  },
  {
    id: "berita-3",
    category: "Keistimewaan",
    categoryBadge: "Budaya DIY",
    badgeBg: "bg-purple-700 text-white",
    date: "31 Agustus 2026",
    title: "Hidupkan Nilai Keistimewaan DIY Lewat Upacara Berbahasa Jawa dan Busana Gagrag Yogyakarta",
    excerpt: "Penanaman karakter sopan santun adiluhung dan keluhuran budi pekerti Mataram Ngayogyakarta bagi seluruh taruna-taruni Skagata.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-18.30.44-2-260x195.jpeg",
    link: "/kabar/smkn-3-yogyakarta-hidupkan-nilai-keistimewaan-diy-lewat-upacara-berbahasa-jawa-dan-gagrag-yogyakarta",
  },
  {
    id: "berita-4",
    category: "Industri",
    categoryBadge: "Kemitraan DUDIKA",
    badgeBg: "bg-blue-700 text-white",
    date: "19 Agustus 2026",
    title: "Perkuat Kemitraan Industri, Kelas MODENA Disiapkan Jadi Modena Technical School",
    excerpt: "Program link-and-match menghadirkan sertifikasi kompetensi industri appliances berstandar internasional dan serapan kerja alumni.",
    image: "/media/school/modena-2.webp",
    link: "/kabar/perkuat-kemitraan-industri-kelas-modena-disiapkan-jadi-modena-technical-school",
  },
  {
    id: "berita-5",
    category: "Seni & Karakter",
    categoryBadge: "HUT Ke-61",
    badgeBg: "bg-pink-700 text-white",
    date: "20 Agustus 2026",
    title: "FESTA MANGAJAPA, 2.000 Siswa SMKN 3 Yogyakarta Hidupkan Seni dan Budaya",
    excerpt: "Perayaan HUT Mangajapa menyajikan parade kirab budaya, pertunjukan kesenian tradisi, dan pameran inovasi teknologi karya taruna.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg",
    link: "/kabar/festa-mangajapa-2-000-siswa-smkn-3-yogyakarta-hidupkan-seni-dan-budaya-di-usia-ke-61",
  },
  {
    id: "berita-6",
    category: "Adiwiyata",
    categoryBadge: "Peduli Lingkungan",
    badgeBg: "bg-emerald-800 text-white",
    date: "8 Juni 2026",
    title: "Jumat Bersih SMKN 3 Yogyakarta, Langkah Nyata Menuju Sekolah Hijau Berkelanjutan",
    excerpt: "Dalam rangka memperingati Hari Lingkungan Hidup, seluruh warga sekolah bersinergi membersihkan bengkel, laboratorium, dan ruang publik.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/TJ-2023-1024x683.jpg",
    link: "/kabar",
  },
];

const PENGUMUMAN_ITEMS: NewsItem[] = [
  {
    id: "peng-1",
    category: "SPMB 2026",
    categoryBadge: "SPMB Resmi",
    badgeBg: "bg-amber-600 text-white",
    date: "26 Juni 2026",
    title: "Pengumuman Hasil Seleksi SPMB 2026 SMK Negeri 3 Yogyakarta",
    excerpt: "Pengumuman Hasil Seleksi SPMB Tahun 2026 jalur zonasi, afirmasi, dan prestasi dapat diakses secara transparan melalui portal resmi.",
    image: "/media/school/logo.webp",
    link: "https://smkn3jogja.sch.id/pengumuman/",
  },
  {
    id: "peng-2",
    category: "Daftar Ulang",
    categoryBadge: "Berkas Resmi",
    badgeBg: "bg-cyan-700 text-white",
    date: "25 Juni 2026",
    title: "Berkas Daftar Ulang SPMB Tahun 2026 Calon Taruna Baru",
    excerpt: "Silakan unduh dan lengkapi berkas persyaratan daftar ulang SPMB 2026: Surat Pernyataan Ketarunaan, Tata Tertib, dan Dokumen Registrasi.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg",
    link: "https://smkn3jogja.sch.id/pengumuman/",
  },
  {
    id: "peng-3",
    category: "Kelulusan",
    categoryBadge: "Alumni XII",
    badgeBg: "bg-emerald-700 text-white",
    date: "5 Mei 2026",
    title: "Pengumuman Kelulusan Siswa Kelas XII SMKN 3 Yogyakarta TP 2025/2026",
    excerpt: "Kelulusan 100% siswa kelas XII dan prosedur layanan legalisasi ijazah daring serta panduan registrasi bursa kerja khusus (BKK).",
    image: "/media/school/jepang-2.webp",
    link: "https://kelulusansmk.my.id",
  },
  {
    id: "peng-4",
    category: "Inklusi",
    categoryBadge: "Afirmasi",
    badgeBg: "bg-indigo-700 text-white",
    date: "30 Mei 2026",
    title: "SK Penetapan Penerimaan Peserta Didik Baru Jalur Disabilitas & Afirmasi",
    excerpt: "Pemberian kuota dan pendampingan fasilitas ramah disabilitas bagi calon siswa berkebutuhan khusus berpotensi kejuruan teknik.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/TJ-2023-1024x683.jpg",
    link: "https://smkn3jogja.sch.id/pengumuman/",
  },
];

const ARTIKEL_ITEMS: NewsItem[] = [
  {
    id: "art-1",
    category: "Kompetisi Vokasi",
    categoryBadge: "Prestasi LKS",
    badgeBg: "bg-purple-700 text-white",
    date: "8 April 2026",
    title: "SMKN 3 Yogyakarta Jadi Tuan Rumah LKS Tingkat Provinsi DIY 2026",
    excerpt: "Memacu etos juara dan standar keterampilan internasional bidang welding, electronics, mechanical engineering, dan electrical installation.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/MESIN-2023-1024x683.jpg",
    link: "/kabar",
  },
  {
    id: "art-2",
    category: "Karir Industri",
    categoryBadge: "Career Day",
    badgeBg: "bg-amber-700 text-white",
    date: "19 September 2025",
    title: "Career Day SMKN 3 Yogyakarta: Jembatani Pendidikan dengan Dunia Kerja",
    excerpt: "Wawancara kerja langsung oleh 40+ perusahaan manufaktur otomotif, konstruksi sipil, dan industri IT terkemuka nusantara.",
    image: "/media/school/modena-2.webp",
    link: "/karir",
  },
  {
    id: "art-3",
    category: "Pedagogi Vokasi",
    categoryBadge: "Inovasi Guru",
    badgeBg: "bg-emerald-700 text-white",
    date: "7 Juni 2025",
    title: "Workshop PjBL Berbasis TPACK untuk Penguatan Karya Inovatif Siswa",
    excerpt: "Pengembangan metode pembelajaran berbasis proyek industri nyata (Project Based Learning) untuk mencetak lulusan siap kerja mandiri.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/BC-2023-1024x683.jpg",
    link: "/kabar",
  },
];

const TAB_CONFIG = {
  berita: {
    javanese: "ꦧꦺꦫꦶꦠ",
    title: "Pusat Liputan & Berita Terkini",
    subtitle: "Ikuti dinamika agenda kejuruan, kemitraan industri global, dan kegiatan kesiswaan.",
    items: BERITA_ITEMS,
    allLabel: "Lihat Semua Berita",
    allLink: "/kabar?category=Berita",
  },
  pengumuman: {
    javanese: "ꦥꦺꦔꦸꦩꦸꦩꦤ꧀",
    title: "Pusat Pengumuman Resmi",
    subtitle: "Informasi kedinasan, seleksi penerimaan murid baru (SPMB), dan agenda resmi sekolah.",
    items: PENGUMUMAN_ITEMS,
    allLabel: "Lihat Semua Pengumuman",
    allLink: "/kabar?category=Pengumuman",
  },
  artikel: {
    javanese: "ꦄꦂꦠꦶꦏꦺꦭ꧀",
    title: "Koleksi Artikel & Opini Vokasi",
    subtitle: "Wawasan teknologi terapan, pedagogi kejuruan, dan opini praktisi industri masa kini.",
    items: ARTIKEL_ITEMS,
    allLabel: "Lihat Semua Artikel",
    allLink: "/kabar?category=Artikel",
  },
};

export default function NewsCarousel() {
  const [activeTab, setActiveTab] = useState<"berita" | "pengumuman" | "artikel">("berita");
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeMeta = TAB_CONFIG[activeTab];

  const handleTabChange = (tab: "berita" | "pengumuman" | "artikel") => {
    setActiveTab(tab);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollCarousel = (direction: -1 | 1) => {
    if (!carouselRef.current) return;
    const amount = 340;
    carouselRef.current.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="berita"
      className="py-14 lg:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 w-full max-w-full overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header with Title, Tabs, and Arrow Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="font-serif text-emerald-600 dark:text-emerald-400 text-xl font-bold tracking-widest block mb-1">
              {activeMeta.javanese}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {activeMeta.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              {activeMeta.subtitle}
            </p>
          </div>

          {/* Filter Tab Buttons & Carousel Navigation Arrows */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-300/70 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleTabChange("berita")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === "berita"
                    ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>Berita</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("pengumuman")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === "pengumuman"
                    ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Pengumuman</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("artikel")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === "artikel"
                    ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Artikel</span>
              </button>
            </div>

            {/* Carousel Previous / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                title="Sebelumnya"
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                title="Berikutnya"
                aria-label="Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Content Track (Exact Layout matching media_1789820074851.png) */}
        <div className="w-full">
          <div
            ref={carouselRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 transparent",
            }}
          >
            {activeMeta.items.map((item) => (
              <article
                key={item.id}
                className="snap-start flex-shrink-0 w-[285px] sm:w-[325px] md:w-[340px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Cover Image */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg";
                      }}
                    />
                    <span
                      className={`absolute top-3 left-3 ${item.badgeBg} text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm`}
                    >
                      {item.categoryBadge}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    {/* Teal / Cyan Date as seen in reference image */}
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mb-2">
                      {item.date}
                    </span>

                    {/* Bold Headline */}
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                      <Link href={item.link}>{item.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 pb-5 pt-0">
                  <Link
                    href={item.link}
                    className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all gap-1 group-hover:gap-1.5"
                  >
                    <span>Baca selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View All Category Link */}
        <div className="mt-10 text-center">
          <Link
            href={activeMeta.allLink}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-skagata-900 hover:bg-skagata-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95 group"
          >
            <span>{activeMeta.allLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
