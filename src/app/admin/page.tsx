"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  Layers,
  Users,
  Briefcase,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileEdit,
  Video,
  ExternalLink,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Megaphone,
  Bell,
  RefreshCw,
  Clock,
  Eye,
  ShieldCheck,
  Check,
  Sliders,
  Play,
} from "lucide-react";
import { useCMS } from "@/lib/store";
import { VIDEOS_DATA } from "@/lib/data-initial";

type Timeframe = "24h" | "7d" | "30d" | "year";

interface TrafficPoint {
  label: string;
  visitors: number;
  pageviews: number;
}

const TRAFFIC_DATA: Record<Timeframe, TrafficPoint[]> = {
  "24h": [
    { label: "00:00", visitors: 120, pageviews: 280 },
    { label: "03:00", visitors: 45, pageviews: 95 },
    { label: "06:00", visitors: 280, pageviews: 640 },
    { label: "09:00", visitors: 1420, pageviews: 3890 },
    { label: "12:00", visitors: 1890, pageviews: 4720 },
    { label: "15:00", visitors: 1650, pageviews: 4120 },
    { label: "18:00", visitors: 1340, pageviews: 3200 },
    { label: "21:00", visitors: 890, pageviews: 2100 },
  ],
  "7d": [
    { label: "Senin", visitors: 4200, pageviews: 11400 },
    { label: "Selasa", visitors: 5100, pageviews: 13900 },
    { label: "Rabu", visitors: 6800, pageviews: 18200 },
    { label: "Kamis", visitors: 6100, pageviews: 16500 },
    { label: "Jumat", visitors: 7400, pageviews: 19800 },
    { label: "Sabtu", visitors: 4900, pageviews: 12800 },
    { label: "Minggu", visitors: 3900, pageviews: 9900 },
  ],
  "30d": [
    { label: "Minggu 1", visitors: 24500, pageviews: 68000 },
    { label: "Minggu 2", visitors: 28900, pageviews: 79200 },
    { label: "Minggu 3", visitors: 33400, pageviews: 91500 },
    { label: "Minggu 4", visitors: 31200, pageviews: 84600 },
  ],
  year: [
    { label: "Jan", visitors: 32000, pageviews: 89000 },
    { label: "Feb", visitors: 41000, pageviews: 112000 },
    { label: "Mar", visitors: 49000, pageviews: 135000 },
    { label: "Apr", visitors: 54000, pageviews: 149000 },
    { label: "Mei", visitors: 68000, pageviews: 192000 },
    { label: "Jun", visitors: 82000, pageviews: 234000 },
    { label: "Jul", visitors: 95000, pageviews: 278000 },
    { label: "Agu", visitors: 58000, pageviews: 162000 },
    { label: "Sep", visitors: 64000, pageviews: 178000 },
  ],
};

const JURUSAN_POPULARITY = [
  { code: "TKJ", name: "Teknik Jaringan Komputer & Telekomunikasi", percent: 28.5, applicants: 428, quota: 72, growth: "+14%" },
  { code: "TKR", name: "Teknik Otomotif / Kendaraan Ringan", percent: 19.2, applicants: 288, quota: 72, growth: "+8%" },
  { code: "TPM", name: "Teknik Mesin / Pemesinan Presisi", percent: 15.4, applicants: 231, quota: 72, growth: "+11%" },
  { code: "DPIB", name: "Desain Pemodelan & Informasi Bangunan", percent: 12.1, applicants: 182, quota: 72, growth: "+6%" },
  { code: "TITL", name: "Teknik Ketenagalistrikan (Instalasi)", percent: 9.8, applicants: 147, quota: 72, growth: "+5%" },
  { code: "TAV", name: "Teknik Elektronika (Audio Video)", percent: 6.7, applicants: 101, quota: 72, growth: "+4%" },
  { code: "KGSP", name: "Konstruksi & Perawatan Gedung Sanitasi", percent: 5.1, applicants: 77, quota: 72, growth: "+7%" },
  { code: "TL", name: "Teknik Pengelasan & Fabrikasi Logam", percent: 3.2, applicants: 48, quota: 36, growth: "+9%" },
];

export default function AdminOverviewPage() {
  const {
    posts,
    majors,
    teachers,
    jobs,
    services,
    announcement,
    activeVideoId,
    updateAnnouncement,
    setActiveVideoId,
  } = useCMS();

  // Analytics timeframe
  const [timeframe, setTimeframe] = useState<Timeframe>("7d");
  const [hoveredPoint, setHoveredPoint] = useState<TrafficPoint | null>(null);

  // Announcement Banner form state
  const [bannerForm, setBannerForm] = useState(announcement);
  const [bannerToast, setBannerToast] = useState(false);

  // Video switcher state
  const [videoToast, setVideoToast] = useState(false);

  // Service testing status
  const [isTestingServices, setIsTestingServices] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<Record<string, string>>({});

  const trafficPoints = TRAFFIC_DATA[timeframe];
  const maxVisitors = Math.max(...trafficPoints.map((p) => p.visitors));

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement(bannerForm);
    setBannerToast(true);
    setTimeout(() => setBannerToast(false), 3000);
  };

  const handleSelectVideo = (vidId: string) => {
    setActiveVideoId(vidId);
    setVideoToast(true);
    setTimeout(() => setVideoToast(false), 3000);
  };

  const handleTestAllServices = () => {
    setIsTestingServices(true);
    setTimeout(() => {
      const results: Record<string, string> = {};
      services.forEach((s) => {
        results[s.id] = "200 OK • 32ms";
      });
      setServiceStatus(results);
      setIsTestingServices(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Feedback */}
      <AnimatePresence>
        {bannerToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-400/30 flex items-center gap-2.5 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Pengumuman beranda berhasil diperbarui dan langsung tayang live di website!</span>
          </motion.div>
        )}
        {videoToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-teal-600 text-white px-5 py-3 rounded-2xl shadow-xl border border-teal-400/30 flex items-center gap-2.5 text-xs font-semibold"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Video YouTube Cinema di Beranda berhasil diganti dan langsung sinkron!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Welcome Controller Banner */}
      <div className="bg-gradient-to-r from-skagata-900 via-emerald-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All-in-One CMS & Analytics Controller Aktif</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight">
              Pusat Kendali Portal SMKN 3 Yogyakarta
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              Pantau trafik pengunjung web secara real-time, kendalikan teks pengumuman beranda, update 8 konsentrasi keahlian, direktori guru, lowongan BKK, dan status layanan kampus secara instan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/berita"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-md hover:scale-[1.02]"
            >
              <FileEdit className="w-4 h-4" />
              <span>Tulis Berita Baru</span>
            </Link>
            <a
              href="#pengumuman-live"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs backdrop-blur-md border border-white/20 transition flex items-center gap-1.5"
            >
              <Megaphone className="w-4 h-4 text-amber-300" />
              <span>Atur Pengumuman Live</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Pengunjung</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-slate-900">48.290</span>
            <span className="text-xs text-slate-400 font-normal">Sesi</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">31.420 Pengunjung Unik</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Kunjungan Halaman</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +24.2%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-slate-900">142.610</span>
            <span className="text-xs text-slate-400 font-normal">Hits</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Rata-rata 2.9 hal/sesi</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Durasi Kunjungan</span>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Clock className="w-3 h-3" /> 3m 48s
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-slate-900">228s</span>
            <span className="text-xs text-slate-400 font-normal">Avg</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Bounce rate rendah 22.4%</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Konten Terbit di Web</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Sparkles className="w-3 h-3" /> Aktif
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-slate-900">{posts.length}</span>
            <span className="text-xs text-slate-400 font-normal">Artikel</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">8 Jurusan &bull; {teachers.length} SDM Guru</span>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE TRAFFIC LINE & AREA CHART */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h2 className="font-display font-bold text-lg text-slate-900">
                Grafik Interaktif Tren Pengunjung Portal
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Arahkan kursor ke titik data untuk melihat rincian pengunjung unik dan jumlah impresi halaman.
            </p>
          </div>

          {/* Timeframe selector tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 text-xs">
            {(
              [
                { id: "24h", label: "Hari Ini" },
                { id: "7d", label: "7 Hari" },
                { id: "30d", label: "30 Hari" },
                { id: "year", label: "Tahun 2026" },
              ] as { id: Timeframe; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeframe(t.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                  timeframe === t.id
                    ? "bg-white text-skagata-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hovered point tooltip banner */}
        <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/60 text-xs">
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-700">
              {hoveredPoint ? `Titik: ${hoveredPoint.label}` : `Ikhtisar Periode: ${timeframe.toUpperCase()}`}
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Pengunjung: {hoveredPoint ? hoveredPoint.visitors.toLocaleString() : trafficPoints.reduce((acc, p) => acc + p.visitors, 0).toLocaleString()}
            </span>
            <span className="text-teal-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
              Tayangan Halaman: {hoveredPoint ? hoveredPoint.pageviews.toLocaleString() : trafficPoints.reduce((acc, p) => acc + p.pageviews, 0).toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Status: Data Server Real-Time Sinkron
          </span>
        </div>

        {/* SVG Curve Chart */}
        <div className="relative h-64 sm:h-72 w-full pt-4">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 700 240"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 60, 120, 180].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="700"
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area Path */}
            {(() => {
              const pts = trafficPoints.map((p, i) => {
                const x = (i / (trafficPoints.length - 1)) * 700;
                const y = 200 - (p.visitors / maxVisitors) * 170;
                return { x, y };
              });

              if (pts.length === 0) return null;

              // Generate smooth cubic bezier string
              let d = `M ${pts[0].x} ${pts[0].y}`;
              for (let i = 0; i < pts.length - 1; i++) {
                const p0 = pts[i];
                const p1 = pts[i + 1];
                const mx = (p0.x + p1.x) / 2;
                d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
              }

              const areaD = `${d} L ${pts[pts.length - 1].x} 220 L ${pts[0].x} 220 Z`;

              return (
                <>
                  <path d={areaD} fill="url(#trafficGradient)" />
                  <path
                    d={d}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {pts.map((pt, i) => (
                    <g
                      key={i}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredPoint(trafficPoints[i])}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="6"
                        className="fill-white stroke-emerald-600 stroke-[3] group-hover:scale-150 transition-transform origin-center"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="18"
                        className="fill-transparent"
                      />
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
            {trafficPoints.map((p, idx) => (
              <span key={idx}>{p.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: DUAL CARDS - POPULARITY 8 JURUSAN & DEVICE DEMOGRAPHICS */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Popularity Bar Chart: 8 Jurusan */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Tingkat Minat 8 Konsentrasi Keahlian
                </h3>
                <p className="text-xs text-slate-400">
                  Distribusi peminat pendaftaran dan kunjungan laman jurusan
                </p>
              </div>
            </div>
            <Link
              href="/admin/jurusan"
              className="text-xs font-bold text-skagata-700 hover:underline flex items-center gap-1"
            >
              <span>Kelola Jurusan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {JURUSAN_POPULARITY.map((j) => (
              <div key={j.code} className="space-y-1 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-10 px-1.5 py-0.5 rounded-md bg-skagata-900 text-emerald-300 font-mono text-[10px] text-center font-bold">
                      {j.code}
                    </span>
                    <span className="text-slate-800 font-medium truncate max-w-xs">{j.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-400">{j.applicants} pendaftar</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {j.percent}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${j.percent * 3}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown & Geo Origins */}
        <div className="lg:col-span-5 space-y-6">
          {/* Device Demographics */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Akses Pengunjung Berdasarkan Perangkat</span>
            </h3>

            <div className="grid grid-cols-3 gap-3 text-center pt-2">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <Smartphone className="w-5 h-5 text-emerald-600 mx-auto" />
                <span className="font-display font-black text-xl text-slate-900 mt-1 block">67.4%</span>
                <span className="text-[11px] text-slate-500">Smartphone</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <Monitor className="w-5 h-5 text-teal-600 mx-auto" />
                <span className="font-display font-black text-xl text-slate-900 mt-1 block">27.2%</span>
                <span className="text-[11px] text-slate-500">PC / Laptop</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <Tablet className="w-5 h-5 text-amber-600 mx-auto" />
                <span className="font-display font-black text-xl text-slate-900 mt-1 block">5.4%</span>
                <span className="text-[11px] text-slate-500">Tablet</span>
              </div>
            </div>

            {/* Segment Progress Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex">
              <div style={{ width: "67.4%" }} className="bg-emerald-500 h-full" title="Mobile 67.4%" />
              <div style={{ width: "27.2%" }} className="bg-teal-500 h-full" title="Desktop 27.2%" />
              <div style={{ width: "5.4%" }} className="bg-amber-400 h-full" title="Tablet 5.4%" />
            </div>

            {/* Geo Origins */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Wilayah Asal Trafik Terbanyak
              </span>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-600">DI Yogyakarta (Sleman, Kota, Bantul)</span>
                <span className="font-bold text-slate-900">62.4%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-600">Jawa Tengah (Klaten, Magelang, Solo)</span>
                <span className="font-bold text-slate-900">23.1%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Jawa Timur, Jawa Barat & Kemitraan</span>
                <span className="font-bold text-slate-900">14.5%</span>
              </div>
            </div>
          </div>

          {/* Quick YouTube Cinema Selector */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-600" />
                <span>Video YouTube Cinema di Beranda</span>
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Pilih video otentik sekolah yang langsung diputar di Video Theater beranda depan:
            </p>
            <select
              value={activeVideoId}
              onChange={(e) => handleSelectVideo(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-skagata-500 focus:outline-none"
            >
              {VIDEOS_DATA.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title} &bull; {v.speaker}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 3: HOMEPAGE ANNOUNCEMENT LIVE CONTROLLER (ADMIN MENGELOLA WEB SEPENUHNYA) */}
      <div id="pengumuman-live" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-500" />
              <h2 className="font-display font-bold text-lg text-slate-900">
                Pengatur Banner Pengumuman & SPMB di Beranda Depan
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ubah status aktif, pesan pemberitahuan darurat atau pendaftaran SPMB yang langsung muncul di bagian atas website publik.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">Status Banner:</span>
            <button
              type="button"
              onClick={() => setBannerForm({ ...bannerForm, enabled: !bannerForm.enabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                bannerForm.enabled ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  bannerForm.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${bannerForm.enabled ? "text-emerald-700" : "text-slate-400"}`}>
              {bannerForm.enabled ? "AKTIF" : "NONAKTIF"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Badge Tag</label>
              <input
                type="text"
                required
                value={bannerForm.badge}
                onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                placeholder="Contoh: INFO RESMI SPMB 2026"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tema Warna</label>
              <select
                value={bannerForm.theme}
                onChange={(e) =>
                  setBannerForm({
                    ...bannerForm,
                    theme: e.target.value as "emerald" | "amber" | "indigo",
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none font-medium"
              >
                <option value="emerald">Emerald Hijau (SPMB / Prestasi)</option>
                <option value="amber">Amber Kuning (Pemberitahuan Penting / Agenda)</option>
                <option value="indigo">Indigo Biru (Kemitraan / Beasiswa Khusus)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Teks Tautan</label>
              <input
                type="text"
                value={bannerForm.linkText}
                onChange={(e) => setBannerForm({ ...bannerForm, linkText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                placeholder="Contoh: Pelajari Alur Pendaftaran"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Isi Pesan Pengumuman</label>
              <input
                type="text"
                required
                value={bannerForm.text}
                onChange={(e) => setBannerForm({ ...bannerForm, text: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                placeholder="Tulis pesan yang akan dibaca semua pengunjung web..."
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">URL Target Tautan</label>
              <input
                type="text"
                value={bannerForm.linkUrl}
                onChange={(e) => setBannerForm({ ...bannerForm, linkUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-skagata-500 focus:outline-none"
                placeholder="/kabar?category=SPMB"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
              Pratinjau Banner Live di Atas Beranda:
            </span>
            <div className="flex items-center gap-2 text-[11.5px] truncate">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-bold text-[10px]">
                {bannerForm.badge}
              </span>
              <span className="text-slate-300">{bannerForm.text}</span>
              <span className="text-white underline font-semibold ml-auto">{bannerForm.linkText} &rarr;</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-md hover:scale-[1.02]"
            >
              <Check className="w-4 h-4" />
              <span>Simpan & Terapkan Perubahan ke Website Publik</span>
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 4: SERVER HEALTH INTEGRATION & AUDIT LOG */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Status 8 Layanan Digital Kampus */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Konektivitas 8 Portal Layanan Digital Kampus
                </h3>
                <p className="text-xs text-slate-400">
                  Memantau ketersediaan sistem Moodle, perpustakaan Widura, dan cloud
                </p>
              </div>
            </div>

            <button
              onClick={handleTestAllServices}
              disabled={isTestingServices}
              className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTestingServices ? "animate-spin text-emerald-600" : ""}`} />
              <span>{isTestingServices ? "Menguji..." : "Uji Latensi"}</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-emerald-50/40 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-bold text-slate-800 block truncate">{srv.name}</span>
                    <span className="text-[10px] text-slate-400 truncate block font-mono">
                      {serviceStatus[srv.id] || "200 OK • 28ms"}
                    </span>
                  </div>
                </div>

                <a
                  href={srv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-700 p-1 flex-shrink-0"
                  title="Buka link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/layanan"
              className="text-xs font-bold text-skagata-700 hover:underline flex items-center gap-1"
            >
              <span>Buka Editor Manajemen URL Layanan &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Audit Activity Trail */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-600" />
              <h3 className="font-display font-bold text-base text-slate-900">
                Log Audit & Aktivitas Terakhir
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              SYNC AUTO
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                CMS
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-slate-800 block">
                  Pembaruan Pengumuman SPMB 2026
                </span>
                <span className="text-[10px] text-slate-400">Baru saja &bull; Oleh Admin SKAGATA</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                POST
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-slate-800 block">
                  Publikasi Berita Prestasi LKS DIY 2026
                </span>
                <span className="text-[10px] text-slate-400">18 menit lalu &bull; Humas Skagata</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                SDM
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-slate-800 block">
                  Sinkronisasi Profil Pendidik & Tenaga Kependidikan
                </span>
                <span className="text-[10px] text-slate-400">1 jam lalu &bull; Dapodik Sync</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                BKK
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-slate-800 block">
                  Lowongan PT Denso Indonesia & Magang Jepang aktif
                </span>
                <span className="text-[10px] text-slate-400">2 jam lalu &bull; BKK Skagata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
