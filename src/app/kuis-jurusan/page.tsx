"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Trophy,
  Share2,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Briefcase,
  ChevronRight,
  Check,
  Zap,
} from "lucide-react";
import { useCMS } from "@/lib/store";
import { QuizOption } from "@/lib/data-initial";

export default function KuisJurusanPage() {
  const { majors, quizQuestions } = useCMS();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, QuizOption>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const questions = quizQuestions || [];
  const currentQ = questions[currentStep];

  const handleSelectOption = (option: QuizOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentStep]: option,
    }));
  };

  const handleNext = () => {
    if (!selectedAnswers[currentStep]) return;
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Major key mapping to actual MajorData slugs
  const majorKeyMap: Record<string, string> = {
    broadcasting: "broadcasting-perfilman",
    tjkt: "teknik-jaringan-komputer-telekomunikasi",
    dpib: "desain-pemodelan-informasi-bangunan",
    tkp: "teknik-konstruksi-perumahan",
    elektronika: "teknik-elektronika",
    ketenagalistrikan: "teknik-ketenagalistrikan",
    otomotif: "teknik-otomotif",
    mesin: "teknik-mesin",
  };

  // Calculate scores
  const scoreBoard: Record<string, number> = {
    broadcasting: 10,
    tjkt: 10,
    dpib: 10,
    tkp: 10,
    elektronika: 10,
    ketenagalistrikan: 10,
    otomotif: 10,
    mesin: 10,
  };

  Object.values(selectedAnswers).forEach((ans) => {
    if (ans.primaryMajor && scoreBoard[ans.primaryMajor] !== undefined) {
      scoreBoard[ans.primaryMajor] += 18;
    }
    if (ans.secondaryMajor && scoreBoard[ans.secondaryMajor] !== undefined) {
      scoreBoard[ans.secondaryMajor] += 8;
    }
  });

  // Sort majors by score
  const sortedScores = Object.entries(scoreBoard).sort((a, b) => b[1] - a[1]);

  const topKey = sortedScores[0]?.[0] || "broadcasting";
  const runnerUpKey = sortedScores[1]?.[0] || "tjkt";

  const topSlug = majorKeyMap[topKey];
  const runnerUpSlug = majorKeyMap[runnerUpKey];

  const topMajor = majors.find((m) => m.slug === topSlug) || majors[0];
  const runnerUpMajor = majors.find((m) => m.slug === runnerUpSlug) || majors[1];

  // Calculated percentage
  const maxPossible = 10 + 5 * 18; // 100
  const topPercentage = Math.min(98, Math.round((sortedScores[0][1] / maxPossible) * 100));
  const runnerUpPercentage = Math.min(88, Math.round((sortedScores[1][1] / maxPossible) * 100));

  const handleShare = () => {
    const shareText = `Hasil Kuis Rekomendasi Jurusan SMKN 3 Yogyakarta: Saya ${topPercentage}% cocok dengan Jurusan ${topMajor.name}! Coba kuisnya di ${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16 antialiased selection:bg-skagata-500 selection:text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <Link
            href="/"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 font-medium transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
          <span className="font-mono bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-semibold">
            Smart Vocational Career Matcher
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin-slow" />
            <span>Kuis Orientasi Karir & Minat Siswa Baru</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
            Kuis Rekomendasi Jurusan{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Smart Major Matcher
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Bingung menentukan 1 dari 8 jurusan unggulan di SMK Negeri 3 Yogyakarta (STM 2 Jetis)? Jawab 5 pertanyaan santai di bawah ini untuk menemukan keahlian masa depan yang paling cocok dengan potensimu!
          </p>
        </div>

        {/* Quiz Container or Results */}
        {!isCompleted ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 space-y-8 backdrop-blur-xl">
            {/* Progress Bar Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span>
                    Pertanyaan {currentStep + 1} dari {questions.length}
                  </span>
                </span>
                <span className="font-mono">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}% Selesai
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-1.5">
              <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                {currentQ?.question}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentQ?.subtitle}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid gap-3.5 sm:gap-4">
              {currentQ?.options.map((option) => {
                const isSelected = selectedAnswers[currentStep]?.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                      isSelected
                        ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                        : "bg-slate-50/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-transparent" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <p
                        className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                          isSelected
                            ? "text-emerald-950 dark:text-emerald-100 font-bold"
                            : "text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {option.text}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        {option.explanation}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedAnswers[currentStep]}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition shadow-lg shadow-emerald-950/20 flex items-center gap-2 btn-bounce"
              >
                <span>
                  {currentStep === questions.length - 1
                    ? "Lihat Hasil Rekomendasi"
                    : "Pertanyaan Selanjutnya"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="space-y-8 animate-fade-in-up">
            {/* Top Match Hero Card */}
            <div className="bg-gradient-to-br from-slate-900 via-skagata-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg font-bold">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                      Rekomendasi Utama (Paling Cocok)
                    </span>
                    <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                      {topMajor.name}
                    </h2>
                  </div>
                </div>

                <div className="text-left sm:text-right bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
                  <span className="text-[11px] text-slate-400 block font-medium">Tingkat Kecocokan</span>
                  <span className="font-display font-black text-2xl text-emerald-400 font-mono">
                    {topPercentage}% Cocok
                  </span>
                </div>
              </div>

              {/* Tagline & Aksara */}
              <div className="relative z-10 space-y-1">
                <p className="text-xs sm:text-sm font-semibold text-emerald-300">
                  {topMajor.tagline}
                </p>
                <p className="font-serif text-slate-400 text-xs tracking-wider opacity-80">
                  {topMajor.aksara}
                </p>
              </div>

              {/* Explanation */}
              <div className="relative z-10 bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl space-y-2">
                <h3 className="font-display font-bold text-xs sm:text-sm text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Mengapa Jurusan Ini Sangat Tepat Untuk Karir Masa Depanmu?</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Berdasarkan jawaban kuis kamu, kamu memiliki kombinasi ketertarikan yang sangat kuat pada{" "}
                  <strong>{topMajor.name}</strong>. Gaya berpikir analitis dan orientasi praktekmu sejalan dengan kurikulum industri, penguasaan teknologi terapan, dan peluang serapan kerja tinggi di jurusan ini.
                </p>
              </div>

              {/* Career & Industry Grid */}
              <div className="relative z-10 grid sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                  <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Peluang Profesi & Karir Unggulan:</span>
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {topMajor.careerProspects.slice(0, 4).map((prospect, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{prospect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                  <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                    <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                    <span>Mitra Industri Dunia:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {topMajor.industryPartners.slice(0, 4).map((partner, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-slate-200 text-[10px] font-medium"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/jurusan/${topMajor.slug}`}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Pelajari Kurikulum {topMajor.name}</span>
                </Link>

                <Link
                  href="/kabar?category=SPMB"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition flex items-center gap-2"
                >
                  <span>Daftar SPMB 2026 Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs transition flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Hasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Bagikan Hasil</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Runner-Up Major Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block font-mono">
                    Rekomendasi Alternatif (Runner-Up)
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    {runnerUpMajor.name}
                  </h3>
                </div>

                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit">
                  {runnerUpPercentage}% Kecocokan
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Jurusan ini juga sangat selaras dengan minat kedua kamu. Jika kuota jurusan pertama telah terpenuhi atau kamu ingin opsi cadangan di SPMB, {runnerUpMajor.name} adalah pilihan unggul yang menjanjikan.
              </p>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/jurusan/${runnerUpMajor.slug}`}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Lihat Detail {runnerUpMajor.name}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={handleRestart}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>
            </div>

            {/* Full 8 Major Affinity Comparison Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Perbandingan Skor Kesesuaian 8 Jurusan
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Distribusi kecocokan kepribadian dan potensi vokasi Anda di seluruh konsentrasi keahlian Skagata:
                </p>
              </div>

              <div className="space-y-3">
                {sortedScores.map(([key, score], idx) => {
                  const mSlug = majorKeyMap[key];
                  const majorObj = majors.find((m) => m.slug === mSlug);
                  if (!majorObj) return null;

                  const percent = Math.min(98, Math.round((score / maxPossible) * 100));

                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <Link
                          href={`/jurusan/${majorObj.slug}`}
                          className="font-medium text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 truncate max-w-[70%]"
                        >
                          <span className="font-mono text-slate-400 mr-2">0{idx + 1}.</span>
                          <span>{majorObj.name}</span>
                        </Link>
                        <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          {percent}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            idx === 0
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                              : idx === 1
                              ? "bg-teal-500"
                              : "bg-slate-300 dark:bg-slate-700"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
