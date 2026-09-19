"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Minimize2,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useCMS } from "@/lib/store";
import SkagataPetCompanion from "./SkagataPetCompanion";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  source?: "gemini" | "knowledge_engine" | "error_fallback";
}

export default function SkagataBot() {
  const { chatbotSettings } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  // Initialize first greeting when loaded
  useEffect(() => {
    if (messages.length === 0 && chatbotSettings?.greeting) {
      setMessages([
        {
          id: "welcome-1",
          sender: "bot",
          text: chatbotSettings.greeting,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          source: "knowledge_engine",
        },
      ]);
    }
  }, [chatbotSettings?.greeting, messages.length]);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, messages, isTyping]);

  if (chatbotSettings && chatbotSettings.enabled === false) {
    return null;
  }

  const handleSend = async (userText?: string) => {
    const query = (userText || input).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Build history for backend
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("model" as const),
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          provider: chatbotSettings?.provider || "gemini",
          apiKey: chatbotSettings?.apiKey || "",
          groqApiKey: chatbotSettings?.groqApiKey || "",
          openRouterApiKey: chatbotSettings?.openRouterApiKey || "",
          model: chatbotSettings?.model || "",
          systemPrompt: chatbotSettings?.systemPrompt || "",
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        "Terima kasih atas pertanyaannya. Silakan hubungi kami langsung di (0274) 513503.";

      const botMessage: ChatMessage = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        source: data.source || "knowledge_engine",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage: ChatMessage = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: "Maaf, terjadi gangguan koneksi. Anda dapat mencoba kembali atau menghubungi pihak sekolah melalui WhatsApp / Telepon (0274) 513503.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        source: "error_fallback",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        sender: "bot",
        text:
          chatbotSettings?.greeting ||
          "Halo! Saya Skagata Bot AI, asisten virtual resmi SMK Negeri 3 Yogyakarta. Ada yang bisa saya bantu?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        source: "knowledge_engine",
      },
    ]);
  };

  // Simple Markdown Parser for Bot Text (Bold, Bullets, Links, Line Breaks)
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Process markdown link [label](url)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      let processedLine: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        const [fullMatch, label, url] = match;
        const beforeText = line.substring(lastIndex, match.index);

        if (beforeText) {
          processedLine.push(renderBoldText(beforeText, `${lineIdx}-b-${lastIndex}`));
        }

        const isInternal = url.startsWith("/");
        processedLine.push(
          isInternal ? (
            <Link
              key={`${lineIdx}-link-${match.index}`}
              href={url}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              <span>{label}</span>
              <ExternalLink className="w-3 h-3 inline" />
            </Link>
          ) : (
            <a
              key={`${lineIdx}-link-${match.index}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              <span>{label}</span>
              <ExternalLink className="w-3 h-3 inline" />
            </a>
          )
        );

        lastIndex = match.index + fullMatch.length;
      }

      if (lastIndex < line.length) {
        processedLine.push(
          renderBoldText(line.substring(lastIndex), `${lineIdx}-end`)
        );
      }

      if (processedLine.length === 0) {
        processedLine = [renderBoldText(line, `${lineIdx}-full`)];
      }

      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");

      return (
        <div
          key={lineIdx}
          className={`${isBullet ? "pl-2.5 my-0.5" : "my-0.5"} leading-relaxed`}
        >
          {processedLine}
        </div>
      );
    });
  };

  const renderBoldText = (str: string, keyPrefix: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={`${keyPrefix}-bold-${idx}`}
            className="font-bold text-slate-900 dark:text-white"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`${keyPrefix}-txt-${idx}`}>{part}</span>;
    });
  };

  const quickPrompts = chatbotSettings?.quickPrompts || [
    "Rekomendasi Jurusan yang Cocok",
    "Syarat & Alur Pendaftaran SPMB",
    "Apa saja 8 Jurusan Keahlian?",
    "Bagaimana Sistem Ketarunaan?",
    "Alamat & Kontak Resmi Sekolah",
    "Program Magang Kerja ke Jepang",
  ];

  return (
    <>
      {/* Interactive Mascot Companion: Pet Skagata (Si Gata) */}
      {!isOpen && (
        <SkagataPetCompanion
          onOpenChat={() => setIsOpen(true)}
          botName={chatbotSettings?.botName || "Si Gata"}
        />
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-2 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-[410px] max-w-[410px] max-h-[min(85dvh,620px)] h-[min(620px,85dvh)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-fade-in-up">
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-skagata-900 via-slate-900 to-emerald-950 text-white border-b border-slate-800 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-white/10 border border-white/20 p-1 flex items-center justify-center shadow overflow-hidden shrink-0">
                <img
                  src="https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-300x300.png"
                  alt="Logo SMKN 3 Yogyakarta"
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-sm text-white leading-tight">
                    {chatbotSettings?.botName || "Skagata Bot AI"}
                  </h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span>SMK Negeri 3 Yogyakarta</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-mono text-[9px]">
                    {chatbotSettings?.provider === "groq" && chatbotSettings?.groqApiKey
                      ? "Groq Llama 3"
                      : chatbotSettings?.provider === "openrouter" && chatbotSettings?.openRouterApiKey
                      ? "OpenRouter"
                      : chatbotSettings?.apiKey
                      ? "Google Gemini"
                      : "Knowledge Base"}
                  </span>
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Mulai Percakapan Baru"
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Tutup Obrolan"
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice Pill */}
          <div className="px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/40 text-[10px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <span className="truncate flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Asisten pintar untuk 8 Jurusan, SPMB 2026, & Ketarunaan</span>
            </span>
            <Link
              href="/kuis-jurusan"
              onClick={() => setIsOpen(false)}
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline shrink-0 pl-2"
            >
              Kuis Jurusan &rarr;
            </Link>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 p-0.5 border border-emerald-300/40 shadow-xs flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                    <img
                      src="https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-300x300.png"
                      alt="SMKN 3 Yogyakarta"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl p-3 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 rounded-tl-xs"
                  }`}
                >
                  <div className="text-[12px]">
                    {msg.sender === "bot"
                      ? renderFormattedText(msg.text)
                      : msg.text}
                  </div>

                  <div
                    className={`mt-1.5 text-[9px] flex items-center justify-end gap-1 ${
                      msg.sender === "user"
                        ? "text-emerald-100/80"
                        : "text-slate-400 dark:text-slate-400"
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 p-0.5 border border-emerald-300/40 shadow-xs flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                  <img
                    src="https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-300x300.png"
                    alt="SMKN 3 Yogyakarta"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-xs p-3.5 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.slice(0, 4).map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                disabled={isTyping}
                className="text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan seputar Skagata..."
              disabled={isTyping}
              className="flex-1 px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Kirim Pesan"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl transition shadow flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
