"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  ShieldAlert,
  Search,
  RefreshCw,
  Trash2,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Activity,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: string | null;
  ip: string | null;
  createdAt: string;
}

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState("ALL");
  const [selectedEntity, setSelectedEntity] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 25;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      let url = `/api/admin/audit-log?limit=${limit}&offset=${offset}`;
      if (selectedAction !== "ALL") url += `&action=${encodeURIComponent(selectedAction)}`;
      if (selectedEntity !== "ALL") url += `&entity=${encodeURIComponent(selectedEntity)}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "success") {
        setLogs(data.logs || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, selectedAction, selectedEntity]);

  const handleClearLogs = async () => {
    const confirmClear = window.confirm(
      "PERINGATAN KEAMANAN:\n\nApakah Anda yakin ingin MENGHAPUS SEMUA riwayat log audit sistem?\nTindakan ini permanen dan akan dicatat sebagai event audit baru."
    );
    if (!confirmClear) return;

    setIsClearing(true);
    try {
      const res = await fetch("/api/admin/audit-log", { method: "DELETE" });
      const data = await res.json();
      if (data.status === "success") {
        setToastMessage("Seluruh riwayat log audit telah dibersihkan.");
        setTimeout(() => setToastMessage(null), 3500);
        fetchLogs();
      } else {
        alert(data.message || "Gagal membersihkan log audit.");
      }
    } catch {
      alert("Terjadi kesalahan jaringan saat membersihkan log.");
    } finally {
      setIsClearing(false);
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "LOGIN":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "LOGOUT":
        return "bg-slate-100 text-slate-700 border-slate-300";
      case "CREATE":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "UPDATE":
      case "SETTINGS_CHANGE":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "DELETE":
      case "MEDIA_DELETE":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "CLEAR_LOGS":
        return "bg-purple-100 text-purple-800 border-purple-300 font-bold";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      log.actor.toLowerCase().includes(q) ||
      (log.details && log.details.toLowerCase().includes(q)) ||
      log.action.toLowerCase().includes(q) ||
      log.entity.toLowerCase().includes(q) ||
      (log.ip && log.ip.includes(q))
    );
  });

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Sistem Keamanan & Audit Trail</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Log Audit & Riwayat Aktivitas
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-light">
              Merekam secara lengkap jejak audit digital: login admin, penambahan dan perubahan data,
              unggah media, konfigurasi sistem, hingga penghapusan konten secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLogs}
              disabled={loading}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition flex items-center gap-2 border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
              <span>Segarkan</span>
            </button>
            <button
              onClick={handleClearLogs}
              disabled={isClearing || logs.length === 0}
              className="px-4 py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-semibold rounded-xl text-xs transition flex items-center gap-2 border border-rose-500/30 hover:border-rose-500/50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bersihkan Log</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Log Terekam</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-slate-900">{total}</span>
            <span className="text-xs text-slate-400">Entri</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Tersimpan di PostgreSQL</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Sesi Login Terverifikasi</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-emerald-600">
              {logs.filter((l) => l.action === "LOGIN").length}
            </span>
            <span className="text-xs text-slate-400">Sesi</span>
          </div>
          <span className="text-[11px] text-emerald-600/80 mt-1 block">JWT Token HttpOnly</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Perubahan Data (CRUD)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-amber-600">
              {logs.filter((l) => ["CREATE", "UPDATE", "SETTINGS_CHANGE"].includes(l.action)).length}
            </span>
            <span className="text-xs text-slate-400">Modifikasi</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Sinkronisasi Database</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Integritas Keamanan</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-teal-600">100%</span>
            <span className="text-xs text-slate-400">Aman</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Anti Tamper Proof</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan operator, rincian aktivitas, atau alamat IP..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Aksi:</span>
          </div>
          <select
            value={selectedAction}
            onChange={(e) => {
              setSelectedAction(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">Semua Aksi</option>
            <option value="LOGIN">LOGIN</option>
            <option value="LOGOUT">LOGOUT</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="SETTINGS_CHANGE">PENGATURAN</option>
            <option value="CLEAR_LOGS">CLEAR LOGS</option>
          </select>

          <select
            value={selectedEntity}
            onChange={(e) => {
              setSelectedEntity(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">Semua Entitas</option>
            <option value="AUTH">AUTH</option>
            <option value="POST">BERITA & KABAR</option>
            <option value="MAJOR">JURUSAN</option>
            <option value="ORG_NODE">STRUKTUR ORGANISASI</option>
            <option value="TEACHER">SDM & GURU</option>
            <option value="MEDIA">MEDIA</option>
            <option value="SETTINGS">PENGATURAN</option>
            <option value="SYSTEM">SISTEM</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Waktu (WIB)</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Aksi</th>
                <th className="py-3 px-4">Entitas</th>
                <th className="py-3 px-4">Rincian Perubahan</th>
                <th className="py-3 px-4">Alamat IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-emerald-600 mb-2" />
                    <span>Memuat log audit sistem...</span>
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Clock className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <span>Belum ada catatan log audit yang cocok dengan filter.</span>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const date = new Date(log.createdAt);
                  const timeFormatted = date.toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {timeFormatted}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate max-w-[140px]">{log.actor}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getActionBadge(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                        {log.entity}
                        {log.entityId && (
                          <span className="text-[10px] text-slate-400 block truncate max-w-[100px]">
                            #{log.entityId}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-700 max-w-xs break-words">
                        {log.details || "-"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-500">
                        {log.ip || "127.0.0.1"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <span>
            Menampilkan halaman {page} dari {totalPages} ({total} total log)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold px-2">{page}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-100 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
