"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Newspaper, Bell, BookOpen } from "lucide-react";
import { useCMS } from "@/lib/store";

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

const FALLBACK_BERITA_ITEMS: NewsItem[] = [
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
    image: "/media/school/modena-2.webp",
    link: "/kabar",
  },
  {
    id: "berita-3",
    category: "Keistimewaan",
    categoryBadge: "Budaya DIY",
    badgeBg: "bg-purple-700 text-white",
    date: "31 Agustus 2026",
    title: "Hidupkan Nilai Keistimewaan DIY Lewat Upacara Berbahasa Jawa dan Busana Gagrag Yogyakarta",
    excerpt: "Penanaman karakter sopan santun adiluhung dan keluhuran budi pekerti Mataram Ngayogyakarta bagi seluruh taruna-taruni Skagata.",
    image: "/media/school/logo.webp",
    link: "/kabar",
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
    link: "/kabar",
  },
];

const FALLBACK_PENGUMUMAN_ITEMS: NewsItem[] = [
  {
    id: "peng-1",
    category: "SPMB 2026",
    categoryBadge: "SPMB Resmi",
    badgeBg: "bg-amber-600 text-white",
    date: "26 Juni 2026",
    title: "Pengumuman Hasil Seleksi SPMB 2026 SMK Negeri 3 Yogyakarta",
    excerpt: "Pengumuman Hasil Seleksi SPMB Tahun 2026 jalur zonasi, afirmasi, dan prestasi dapat diakses secara transparan melalui portal resmi.",
    image: "/media/school/logo.webp",
    link: "/kabar?category=SPMB",
  },
  {
    id: "peng-2",
    category: "Daftar Ulang",
    categoryBadge: "Berkas Resmi",
    badgeBg: "bg-cyan-700 text-white",
    date: "25 Juni 2026",
    title: "Berkas Daftar Ulang SPMB Tahun 2026 Calon Taruna Baru",
    excerpt: "Silakan unduh dan lengkapi berkas persyaratan daftar ulang SPMB 2026: Surat Pernyataan Ketarunaan, Tata Tertib, dan Dokumen Registrasi.",
    image: "/media/school/logo.webp",
    link: "/kabar?category=SPMB",
  },
];

const FALLBACK_ARTIKEL_ITEMS: NewsItem[] = [
  {
    id: "art-1",
    category: "Kompetisi Vokasi",
    categoryBadge: "Prestasi LKS",
    badgeBg: "bg-purple-700 text-white",
    date: "8 April 2026",
    title: "SMKN 3 Yogyakarta Jadi Tuan Rumah LKS Tingkat Provinsi DIY 2026",
    excerpt: "Memacu etos juara dan standar keterampilan internasional bidang welding, electronics, mechanical engineering, dan electrical installation.",
    image: "/media/school/workshop-bp-1.webp",
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
];

export default function NewsCarousel() {
  const { posts } = useCMS();
  const [activeTab, setActiveTab] = useState<"berita" | "pengumuman" | "artikel">("berita");
  const carouselRef = useRef<HTMLDivElement>(null);

  const tabConfig = useMemo(() => {
    // Dynamic mapping from active CMS posts
    const beritaList = (posts || []).filter((p) => p.category === "Berita");
    const pengumumanList = (posts || []).filter((p) => p.category === "Pengumuman" || p.category === "SPMB");
    const artikelList = (posts || []).filter((p) => p.category === "Artikel");

    const mapPostToItem = (p: any): NewsItem => ({
      id: p.id,
      category: p.category,
      categoryBadge: p.category,
      badgeBg:
        p.category === "SPMB"
          ? "bg-amber-600 text-white"
          : p.category === "Pengumuman"
          ? "bg-cyan-700 text-white"
          : p.category === "Artikel"
          ? "bg-purple-700 text-white"
          : "bg-emerald-700 text-white",
      date: p.publishedAt || "Terbaru",
      title: p.title,
      excerpt: p.excerpt || "",
      image: p.coverImage || "/media/school/logo.webp",
      link: `/kabar/${p.slug}`,
    });

    const beritaItems = beritaList.length > 0 ? beritaList.map(mapPostToItem) : FALLBACK_BERITA_ITEMS;
    const pengumumanItems = pengumumanList.length > 0 ? pengumumanList.map(mapPostToItem) : FALLBACK_PENGUMUMAN_ITEMS;
    const artikelItems = artikelList.length > 0 ? artikelList.map(mapPostToItem) : FALLBACK_ARTIKEL_ITEMS;

    return {
      berita: {
        javanese: "ꦧꦺꦫꦶꦠ",
        title: "Pusat Liputan & Berita Terkini",
        subtitle: "Ikuti dinamika agenda kejuruan, kemitraan industri global, dan kegiatan kesiswaan.",
        items: beritaItems,
        allLabel: "Lihat Semua Berita",
        allLink: "/kabar?category=Berita",
      },
      pengumuman: {
        javanese: "ꦥꦺꦔꦸꦩꦸꦩꦤ꧀",
        title: "Pusat Pengumuman Resmi",
        subtitle: "Informasi kedinasan, seleksi penerimaan murid baru (SPMB), dan agenda resmi sekolah.",
        items: pengumumanItems,
        allLabel: "Lihat Semua Pengumuman",
        allLink: "/kabar?category=Pengumuman",
      },
      artikel: {
        javanese: "ꦄꦂꦠꦶꦏꦺꦭ꧀",
        title: "Koleksi Artikel & Opini Vokasi",
        subtitle: "Wawasan teknologi terapan, pedagogi kejuruan, dan opini praktisi industri masa kini.",
        items: artikelItems,
        allLabel: "Lihat Semua Artikel",
        allLink: "/kabar?category=Artikel",
      },
    };
  }, [posts]);

  const activeMeta = tabConfig[activeTab];

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

        {/* Carousel Content Track */}
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
                      width="340"
                      height="192"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "/media/school/logo.webp";
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
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block mb-2">
                      {item.date}
                    </span>

                    <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                      <Link href={item.link}>{item.title}</Link>
                    </h3>

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
