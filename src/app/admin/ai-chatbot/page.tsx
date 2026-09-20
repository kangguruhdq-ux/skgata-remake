"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  KeyRound,
  Check,
  Eye,
  EyeOff,
  RotateCcw,
  Send,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Compass,
  ArrowRight,
} from "lucide-react";
import { useCMS } from "@/lib/store";

export default function AdminAiChatbotPage() {
  const { chatbotSettings, updateChatbotSettings, quizQuestions } = useCMS();

  const [form, setForm] = useState({
    enabled: chatbotSettings?.enabled ?? true,
    provider: (chatbotSettings?.provider || "gemini") as "gemini" | "groq" | "openrouter",
    apiKey: chatbotSettings?.apiKey || "",
    groqApiKey: chatbotSettings?.groqApiKey || "",
    openRouterApiKey: chatbotSettings?.openRouterApiKey || "",
    model: chatbotSettings?.model || "gemini-1.5-flash",
    botName: chatbotSettings?.botName || "Skagata Bot AI",
    greeting:
      chatbotSettings?.greeting ||
      "Halo! Saya Skagata Bot AI, asisten virtual resmi SMK Negeri 3 Yogyakarta. Ada yang bisa saya bantu terkait 8 Jurusan, SPMB, Ketarunaan, atau Layanan Sekolah?",
    systemPrompt:
      chatbotSettings?.systemPrompt ||
      "Anda adalah Skagata Bot AI, asisten kecerdasan buatan resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis). Berikan jawaban yang ramah, sopan, akurat, informatif, dan menjunjung tinggi nilai budaya Yogyakarta serta disiplin ketarunaan. Sekolah memiliki 8 jurusan: Broadcasting & Perfilman, TJKT, DPIB, TKP, Teknik Elektronika, Teknik Ketenagalistrikan, Teknik Otomotif, dan Teknik Mesin. NPSN sekolah 20404181, beralamat di Jl. Robert Wolter Monginsidi No. 2, Cokrodiningratan, Jetis, Yogyakarta. Berikan jawaban terstruktur dengan poin-poin yang mudah dibaca.",
    quickPrompts: chatbotSettings?.quickPrompts || [
      "Rekomendasi Jurusan yang Cocok",
      "Syarat & Alur Pendaftaran SPMB",
      "Apa saja 8 Jurusan Keahlian?",
      "Bagaimana Sistem Ketarunaan?",
      "Alamat & Kontak Resmi Sekolah",
      "Program Magang Kerja ke Jepang",
    ],
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [newPrompt, setNewPrompt] = useState("");
  const [customModelInput, setCustomModelInput] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "failed">("idle");
  const [testResult, setTestResult] = useState("");

  // Live tester state inside admin
  const [previewInput, setPreviewInput] = useState("");
  const [previewMessages, setPreviewMessages] = useState<Array<{ sender: "user" | "bot"; text: string; source?: string }>>([
    {
      sender: "bot",
      text: form.greeting,
      source: "preview",
    },
  ]);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Sync default model when provider changes if model isn't matching
  const handleProviderChange = (newProvider: "gemini" | "groq" | "openrouter") => {
    let defaultModel = form.model;
    if (newProvider === "gemini" && (!form.model.includes("gemini") || form.model.includes("/"))) {
      defaultModel = "gemini-1.5-flash";
    } else if (newProvider === "groq" && (!form.model.includes("llama") && !form.model.includes("mixtral") && !form.model.includes("gemma"))) {
      defaultModel = "llama-3.3-70b-versatile";
    } else if (newProvider === "openrouter" && !form.model.includes("/") && !form.model.includes(":")) {
      defaultModel = "google/gemini-2.0-flash-exp:free";
    }
    setForm({ ...form, provider: newProvider, model: defaultModel });
    setTestResult("");
    setTestStatus("idle");
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateChatbotSettings(form);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleTestConnection = async () => {
    setTestStatus("testing");
    setTestResult("");

    // Provider specific validation
    if (form.provider === "gemini") {
      const key = form.apiKey.trim();
      if (!key) {
        setTestStatus("failed");
        setTestResult("Google AI Studio API Key masih kosong. Masukkan kunci Anda (diawali 'AIzaSy...').");
        return;
      }
      if (key.startsWith("AQ.") || key.startsWith("ya29.")) {
        setTestStatus("failed");
        setTestResult(
          "Perhatian: Kunci diawali 'AQ.' (Token Sesi/Cloud), bukan Google AI Studio API Key resmi. Buat kunci resmi gratis di https://aistudio.google.com/app/apikey (diawali 'AIzaSy...')."
        );
        return;
      }
    } else if (form.provider === "groq") {
      const key = form.groqApiKey.trim();
      if (!key) {
        setTestStatus("failed");
        setTestResult("Groq API Key masih kosong. Buat API Key gratis di https://console.groq.com/keys (diawali 'gsk_...').");
        return;
      }
    } else if (form.provider === "openrouter") {
      const key = form.openRouterApiKey.trim();
      if (!key) {
        setTestStatus("failed");
        setTestResult("OpenRouter API Key masih kosong. Buat API Key gratis di https://openrouter.ai/keys (diawali 'sk-or-...').");
        return;
      }
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Halo, tolong berikan satu kalimat perkenalan singkat tentang SMKN 3 Yogyakarta.",
          provider: form.provider,
          apiKey: form.apiKey,
          groqApiKey: form.groqApiKey,
          openRouterApiKey: form.openRouterApiKey,
          model: form.model,
          systemPrompt: form.systemPrompt,
        }),
      });

      const data = await res.json();
      if (data.source === form.provider || (data.source === "gemini" && form.provider === "gemini")) {
        setTestStatus("success");
        setTestResult(`Koneksi Berhasil! Provider ${form.provider.toUpperCase()} (Model: ${data.model || form.model}) merespons: "${data.reply.slice(0, 120)}..."`);
      } else {
        setTestStatus("failed");
        if (data.apiError) {
          setTestResult(`Gagal terhubung ke ${form.provider.toUpperCase()}: ${data.apiError}`);
        } else {
          setTestResult(`API Key ditolak oleh penyedia ${form.provider.toUpperCase()}. Sistem otomatis mengaktifkan Internal Knowledge Engine.`);
        }
      }
    } catch (err: any) {
      setTestStatus("failed");
      setTestResult("Terjadi kesalahan jaringan saat menghubungi API.");
    }
  };

  const handleAddPrompt = () => {
    if (!newPrompt.trim()) return;
    setForm({
      ...form,
      quickPrompts: [...form.quickPrompts, newPrompt.trim()],
    });
    setNewPrompt("");
  };

  const handleRemovePrompt = (idxToRemove: number) => {
    setForm({
      ...form,
      quickPrompts: form.quickPrompts.filter((_, idx) => idx !== idxToRemove),
    });
  };

  const handleLivePreviewSend = async () => {
    if (!previewInput.trim() || previewLoading) return;
    const query = previewInput.trim();
    setPreviewMessages((prev) => [...prev, { sender: "user", text: query }]);
    setPreviewInput("");
    setPreviewLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          provider: form.provider,
          apiKey: form.apiKey,
          groqApiKey: form.groqApiKey,
          openRouterApiKey: form.openRouterApiKey,
          model: form.model,
          systemPrompt: form.systemPrompt,
        }),
      });

      const data = await res.json();
      setPreviewMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          source: data.source,
        },
      ]);
    } catch (err) {
      setPreviewMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Gagal terhubung ke API.",
          source: "error",
        },
      ]);
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-lg shadow-emerald-950/10 shrink-0">
            <img
              src="/media/school/logo.webp"
              alt="Logo SMKN 3 Yogyakarta"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                AI Assistant (Skagata Bot) & Kuis Jurusan
              </h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                Google Gemini API
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pengelolaan kunci Google AI Studio gratis, model bahasa, kepribadian AI, pesan sambutan, dan monitoring kuis jurusan.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSave()}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-2 shadow self-start sm:self-auto text-xs"
        >
          <Check className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Pengaturan AI Chatbot berhasil disimpan dan langsung aktif di seluruh website!</span>
        </div>
      )}

      {/* Guide Banner for Active AI Provider */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-skagata-950 to-emerald-950 text-white rounded-3xl border border-emerald-500/30 shadow space-y-3">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>
            Panduan Mendapatkan API Key Gratis ({form.provider === "gemini" ? "Google AI Studio" : form.provider === "groq" ? "Groq Cloud" : "OpenRouter"}):
          </span>
        </div>

        {form.provider === "gemini" && (
          <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed">
            <li>
              Kunjungi portal Google AI Studio:{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-semibold underline hover:text-emerald-300 inline-flex items-center gap-1"
              >
                <span>https://aistudio.google.com/app/apikey</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>Masuk dengan akun Google / Gmail Anda lalu klik <strong>&quot;Create API key&quot;</strong>.</li>
            <li>Salin kode API Key yang didapat (diawali dengan <code>AIzaSy...</code>) dan tempelkan pada kolom di bawah.</li>
          </ol>
        )}

        {form.provider === "groq" && (
          <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed">
            <li>
              Kunjungi portal resmi Groq Console:{" "}
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-semibold underline hover:text-emerald-300 inline-flex items-center gap-1"
              >
                <span>https://console.groq.com/keys</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>Masuk dengan akun Google/GitHub Anda, lalu klik tombol <strong>&quot;Create API Key&quot;</strong>.</li>
            <li>Salin kode API Key yang didapat (diawali dengan <code>gsk_...</code>) dan tempelkan pada kolom di bawah.</li>
          </ol>
        )}

        {form.provider === "openrouter" && (
          <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed">
            <li>
              Kunjungi portal OpenRouter:{" "}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-semibold underline hover:text-emerald-300 inline-flex items-center gap-1"
              >
                <span>https://openrouter.ai/keys</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>Daftar/Masuk lalu klik <strong>&quot;Create Key&quot;</strong>.</li>
            <li>Salin kode API Key yang didapat (diawali dengan <code>sk-or-...</code>) dan tempelkan pada formulir di bawah. Model berakhiran <code>:free</code> 100% gratis digunakan.</li>
          </ol>
        )}

        <p className="text-[11px] text-emerald-200/80 bg-white/5 p-2.5 rounded-xl border border-white/10">
          <strong>Keandalan Sistem:</strong> Jika API Key belum diisi atau kuota habis, website <strong>tetap berfungsi lancar</strong> karena otomatis beralih ke Knowledge Engine internal otentik SMKN 3 Yogyakarta.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Settings Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="font-display font-bold text-base text-slate-900">
                Penyedia Kecerdasan Buatan (AI Engine)
              </h2>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={form.enabled}
                  onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Aktifkan Chatbot di Web</span>
              </label>
            </div>

            {/* Provider Selector Tabs */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block text-xs">
                Pilih Engine AI yang Digunakan di Chatbot:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "gemini",
                    name: "Google Gemini",
                    desc: "Google AI Studio",
                    badge: "Resmi Google",
                  },
                  {
                    id: "groq",
                    name: "Groq Cloud",
                    desc: "Ultra-Fast Llama 3",
                    badge: "Kecepatan Tinggi",
                  },
                  {
                    id: "openrouter",
                    name: "OpenRouter",
                    desc: "Multi-Model Hub",
                    badge: "Model Gratis",
                  },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleProviderChange(p.id as any)}
                    className={`p-3 rounded-2xl border text-left transition relative ${
                      form.provider === p.id
                        ? "bg-emerald-50/80 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{p.name}</span>
                      {form.provider === p.id && (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{p.desc}</span>
                    <span className="inline-block mt-1.5 text-[9px] px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-600 font-mono">
                      {p.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* API Key Input based on selected provider */}
            <div className="space-y-1.5 pt-1">
              <label className="font-semibold text-slate-700 block text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {form.provider === "gemini"
                      ? "Google AI Studio API Key"
                      : form.provider === "groq"
                      ? "Groq Cloud API Key"
                      : "OpenRouter API Key"}
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Tersimpan di Database CMS</span>
              </label>

              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={
                    form.provider === "gemini"
                      ? form.apiKey
                      : form.provider === "groq"
                      ? form.groqApiKey
                      : form.openRouterApiKey
                  }
                  onChange={(e) => {
                    if (form.provider === "gemini") setForm({ ...form, apiKey: e.target.value });
                    else if (form.provider === "groq") setForm({ ...form, groqApiKey: e.target.value });
                    else setForm({ ...form, openRouterApiKey: e.target.value });
                  }}
                  placeholder={
                    form.provider === "gemini"
                      ? "Contoh: AIzaSyD..."
                      : form.provider === "groq"
                      ? "Contoh: gsk_..."
                      : "Contoh: sk-or-v1-..."
                  }
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Test Button & Result */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testStatus === "testing"}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200 disabled:opacity-50"
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {testStatus === "testing"
                      ? "Menguji Koneksi..."
                      : `Uji Koneksi ${form.provider.toUpperCase()}`}
                  </span>
                </button>

                {((form.provider === "gemini" && form.apiKey) ||
                  (form.provider === "groq" && form.groqApiKey) ||
                  (form.provider === "openrouter" && form.openRouterApiKey)) && (
                  <button
                    type="button"
                    onClick={() => {
                      if (form.provider === "gemini") setForm({ ...form, apiKey: "" });
                      else if (form.provider === "groq") setForm({ ...form, groqApiKey: "" });
                      else setForm({ ...form, openRouterApiKey: "" });
                    }}
                    className="px-3 py-2 text-slate-400 hover:text-red-600 text-xs font-medium"
                  >
                    Hapus Kunci
                  </button>
                )}
              </div>

              {testResult && (
                <div
                  className={`p-3 rounded-xl text-xs mt-2 flex items-start gap-2 ${
                    testStatus === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-amber-50 text-amber-900 border border-amber-200"
                  }`}
                >
                  {testStatus === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-relaxed">{testResult}</span>
                </div>
              )}
            </div>

            {/* Model Selector Adapts to Provider */}
            <div className="space-y-1.5 pt-1">
              <label className="font-semibold text-slate-700 block text-xs">
                Pilihan Model ({form.provider.toUpperCase()})
              </label>

              {form.provider === "gemini" && (
                <div className="grid sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", desc: "Cepat & Ringan (Rekomendasi)" },
                    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", desc: "Generasi Terbaru Google" },
                    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", desc: "Penalaran Lengkap" },
                  ].map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setForm({ ...form, model: mod.id })}
                      className={`p-3 rounded-xl border text-left transition ${
                        form.model === mod.id
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs">{mod.name}</span>
                        {form.model === mod.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal block mt-1">{mod.desc}</span>
                    </button>
                  ))}
                </div>
              )}

              {form.provider === "groq" && (
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", desc: "Sangat Cerdas & Cepat (Paling Disukai)" },
                    { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant", desc: "Kecepatan Respon Tertinggi" },
                    { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", desc: "Model MoE Konteks 32k" },
                    { id: "gemma2-9b-it", name: "Gemma 2 9B", desc: "Model Google di Server Groq" },
                  ].map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setForm({ ...form, model: mod.id })}
                      className={`p-3 rounded-xl border text-left transition ${
                        form.model === mod.id
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs">{mod.name}</span>
                        {form.model === mod.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal block mt-1">{mod.desc}</span>
                    </button>
                  ))}
                </div>
              )}

              {form.provider === "openrouter" && (
                <div className="space-y-2 text-xs">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      { id: "google/gemini-2.0-flash-exp:free", name: "Gemini 2.0 Flash Exp", desc: "100% Gratis di OpenRouter" },
                      { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B Instruct", desc: "100% Gratis di OpenRouter" },
                      { id: "deepseek/deepseek-chat", name: "DeepSeek V3", desc: "Sangat Terjangkau & Cerdas" },
                      { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B Instruct", desc: "Model Cepat Gratis" },
                    ].map((mod) => (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => setForm({ ...form, model: mod.id })}
                        className={`p-3 rounded-xl border text-left transition ${
                          form.model === mod.id
                            ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs">{mod.name}</span>
                          {form.model === mod.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                        <span className="text-[10px] text-slate-500 font-normal block mt-1">{mod.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom OpenRouter model input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={form.model}
                      onChange={(e) => setForm({ ...form, model: e.target.value })}
                      placeholder="Atau ketik model OpenRouter kustom (contoh: qwen/qwen-2.5-72b-instruct)..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bot Name & Greeting */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="font-semibold text-slate-700 block text-xs mb-1">
                  Nama Tampilan Bot
                </label>
                <input
                  type="text"
                  value={form.botName}
                  onChange={(e) => setForm({ ...form, botName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block text-xs mb-1">
                  Pesan Pembuka (Greeting Sambutan)
                </label>
                <textarea
                  rows={2}
                  value={form.greeting}
                  onChange={(e) => setForm({ ...form, greeting: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block text-xs mb-1">
                  System Prompt (Instruksi & Persona Bot)
                </label>
                <textarea
                  rows={4}
                  value={form.systemPrompt}
                  onChange={(e) => setForm({ ...form, systemPrompt: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px] leading-relaxed"
                />
              </div>
            </div>

            {/* Quick Prompts Chips Management */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-800 text-xs">
                  Pilihan Tombol Pintas Pertanyaan Cepat (Quick Chips)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {form.quickPrompts.length} Aktif
                </span>
              </div>

              <div className="space-y-2">
                {form.quickPrompts.map((prompt, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <span className="truncate text-slate-800 font-medium">{prompt}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePrompt(idx)}
                      className="text-slate-400 hover:text-red-600 transition p-1"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Tambah prompt cepat baru (contoh: Beasiswa Prestasi Skagata)..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddPrompt();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddPrompt}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSave()}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-2 shadow text-xs"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Pengaturan AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Chatbot Simulator & Kuis Quick Access */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Simulator */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md overflow-hidden shrink-0">
                  <img
                    src="/media/school/logo.webp"
                    alt="SMKN 3 Yogyakarta"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-display font-bold text-sm text-slate-900">
                  Live Preview Chat Simulator
                </h3>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPreviewMessages([
                    { sender: "bot", text: form.greeting, source: "preview" },
                  ])
                }
                className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Chat Box */}
            <div className="h-[340px] bg-slate-50 rounded-2xl border border-slate-200 p-3 overflow-y-auto space-y-2.5 text-xs">
              {previewMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "bot" && (
                    <div className="w-6 h-6 rounded-md bg-white p-0.5 border border-emerald-300/40 shadow-xs flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                      <img
                        src="/media/school/logo.webp"
                        alt="SMKN 3"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-2.5 rounded-xl ${
                      m.sender === "user"
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-slate-800 border border-slate-200 shadow-xs"
                    }`}
                  >
                    <p className="text-[11px] leading-relaxed whitespace-pre-wrap">
                      {m.text}
                    </p>
                    {m.source && (
                      <span className="text-[9px] text-slate-400 block mt-1 font-mono">
                        Sumber: {m.source}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {previewLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-md bg-white p-0.5 border border-emerald-300/40 shadow-xs flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                    <img
                      src="/media/school/logo.webp"
                      alt="SMKN 3"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-400 text-xs flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                    <span>AI sedang berpikir...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Simulator Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={previewInput}
                onChange={(e) => setPreviewInput(e.target.value)}
                placeholder="Ketik pertanyaan untuk uji bot..."
                disabled={previewLoading}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleLivePreviewSend();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleLivePreviewSend}
                disabled={!previewInput.trim() || previewLoading}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl transition shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Kuis Jurusan Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900">
                <Compass className="w-4 h-4 text-emerald-600" />
                <h3 className="font-display font-bold text-sm">
                  Kuis Rekomendasi Jurusan
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                5 Pertanyaan
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Kuis Smart Major Matcher membantu calon taruna baru menemukan 1 dari 8 jurusan terbaik berdasarkan minat dan kepribadiannya.
            </p>

            <div className="space-y-2 text-xs">
              {quizQuestions?.slice(0, 3).map((q, idx) => (
                <div key={q.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-700 block text-[11px]">
                    0{idx + 1}. {q.question}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {q.options.length} opsi pilihan jawaban
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/kuis-jurusan"
              target="_blank"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <span>Uji Coba Halaman Kuis Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
