"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Heart, X } from "lucide-react";

interface SkagataPetCompanionProps {
  onOpenChat: () => void;
  botName?: string;
}

interface SvgParticle {
  id: number;
  x: number;
  y: number;
  type: "heart" | "sparkle" | "star";
  size: number;
  color: string;
}

export default function SkagataPetCompanion({
  onOpenChat,
  botName = "Si Gata",
}: SkagataPetCompanionProps) {
  const petRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPetting, setIsPetting] = useState(false);
  const [pettingLevel, setPettingLevel] = useState(0); // 0 (idle) to 1 (happy petted)
  const [tiltAngle, setTiltAngle] = useState(0);
  const [particles, setParticles] = useState<SvgParticle[]>([]);
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);

  const petDecayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastStrokeTimeRef = useRef(0);
  const lastParticleTimeRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Clean Dialogues without emoji text
  const defaultDialogues = [
    "Halo! Aku Si Gata, maskot cerdas SMKN 3 Yogyakarta.",
    "Elus kepalaku, aku senang berinteraksi denganmu.",
    "Mataku dapat mengamati arah kursor mouse kamu secara langsung.",
    "Ingin info 8 Jurusan dan SPMB 2026? Klik aku sekarang.",
    "Bingung memilih jurusan? Coba Kuis Rekomendasi Jurusan.",
    "Tanyakan apapun seputar sekolah ke asisten AI Skagata.",
  ];

  const pettingDialogues = [
    "Terima kasih atas elusannya, menyenangkan sekali.",
    "Sensormu hangat, Si Gata siap membantumu hari ini.",
    "Energi sistem bertambah berkat interaksimu.",
    "Si Gata senang menemanimu menjelajahi web Skagata.",
    "Silakan klik untuk mulai berkonsultasi dengan asisten AI.",
  ];

  const [currentDialogue, setCurrentDialogue] = useState(defaultDialogues[0]);

  // Eye tracking: Follow cursor anywhere on screen with smooth rAF throttling
  useEffect(() => {
    let rAFId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rAFId) return;

      rAFId = requestAnimationFrame(() => {
        rAFId = null;
        if (!petRef.current) return;

        const rect = petRef.current.getBoundingClientRect();
        const petCenterX = rect.left + rect.width / 2;
        const petCenterY = rect.top + rect.height / 2 - 10;

        const dx = e.clientX - petCenterX;
        const dy = e.clientY - petCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.hypot(dx, dy);

        // Max eye travel radius is 5.5 pixels
        const maxRadius = 5.5;
        const travel = Math.min(maxRadius, distance / 35);

        setPupilOffset({
          x: Math.cos(angle) * travel,
          y: Math.sin(angle) * travel,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rAFId) cancelAnimationFrame(rAFId);
    };
  }, []);

  // Natural Blinking Cycle (every 4 - 6 seconds)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4800);

    return () => clearInterval(blinkInterval);
  }, []);

  // Automatic Speech Cycle when idle
  useEffect(() => {
    if (isPetting) return;

    const speechTimer = setInterval(() => {
      setCurrentDialogue((prev) => {
        const nextIdx =
          (defaultDialogues.indexOf(prev) + 1) % defaultDialogues.length;
        return defaultDialogues[nextIdx >= 0 ? nextIdx : 0];
      });
    }, 7500);

    return () => clearInterval(speechTimer);
  }, [isPetting, defaultDialogues]);

  // Petting / Elus Interaction: Organic spring physics and directional tilt
  const handlePetMove = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    setIsPetting(true);
    setPettingLevel(1);
    if (isBubbleDismissed) {
      setIsBubbleDismissed(false);
    }

    // Calculate stroke delta & tilt direction
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (lastMousePosRef.current.x !== 0) {
      const deltaX = clientX - lastMousePosRef.current.x;
      const targetTilt = Math.max(-5, Math.min(5, deltaX * 0.6));
      setTiltAngle(targetTilt);
    }
    lastMousePosRef.current = { x: clientX, y: clientY };

    // Update dialogue with cooldown (at least 3.5 seconds between dialogue changes)
    if (now - lastStrokeTimeRef.current > 3500) {
      lastStrokeTimeRef.current = now;
      const randomPetDialogue =
        pettingDialogues[Math.floor(Math.random() * pettingDialogues.length)];
      setCurrentDialogue(randomPetDialogue);
    }

    // Spawn pure SVG vector particles gently throttled (max 1 per 240ms)
    if (now - lastParticleTimeRef.current > 240) {
      lastParticleTimeRef.current = now;
      const types: Array<"heart" | "sparkle" | "star"> = [
        "heart",
        "sparkle",
        "star",
      ];
      const colors = ["#10b981", "#34d399", "#f59e0b", "#f43f5e", "#06b6d4"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newParticle: SvgParticle = {
        id: now + Math.random(),
        x: (Math.random() - 0.5) * 44,
        y: (Math.random() - 0.5) * 15,
        type: randomType,
        size: Math.floor(Math.random() * 5) + 14,
        color: randomColor,
      };

      setParticles((prev) => [...prev.slice(-4), newParticle]);
    }

    // Ultra-smooth return to normal: reset pettingLevel after delay
    if (petDecayTimerRef.current) clearTimeout(petDecayTimerRef.current);
    petDecayTimerRef.current = setTimeout(() => {
      setIsPetting(false);
      setPettingLevel(0);
      setTiltAngle(0);
    }, 1800);
  };

  // Clean up particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div
      ref={petRef}
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none pointer-events-auto max-w-[calc(100vw-24px)]"
    >
      {/* Floating Speech Bubble (Bisa Ngomong) */}
      {!isBubbleDismissed && (
        <div
          onClick={onOpenChat}
          className="mb-2 max-w-[195px] sm:max-w-[240px] cursor-pointer group"
          title="Klik untuk membuka asisten AI"
        >
          <div className="relative p-2.5 sm:p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl rounded-br-xs border border-emerald-500/30 shadow-xl shadow-emerald-950/15 text-slate-800 dark:text-slate-100 text-[11px] leading-snug transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500">
            {/* Close / Dismiss button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsBubbleDismissed(true);
              }}
              className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm transition"
              title="Tutup pesan"
              aria-label="Tutup pesan"
            >
              <X className="w-2.5 h-2.5" />
            </button>

            <p className="font-medium transition-opacity duration-500 pr-1">
              {currentDialogue}
            </p>

            <div className="mt-1 flex items-center justify-between text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                <span>{botName}</span>
              </span>
              <span className="group-hover:translate-x-0.5 transition-transform">
                Buka Chat &rarr;
              </span>
            </div>

            {/* Pointer tail */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white dark:border-t-slate-900" />
          </div>
        </div>
      )}

      {/* Pure SVG Floating Particles */}
      <div className="relative w-full h-0 pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: `${p.y - 32}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className="absolute animate-fade-in-up transition-opacity duration-1000 opacity-90 filter drop-shadow flex items-center justify-center"
          >
            {p.type === "heart" && (
              <svg
                viewBox="0 0 24 24"
                width={p.size}
                height={p.size}
                fill={p.color}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            {p.type === "sparkle" && (
              <svg
                viewBox="0 0 24 24"
                width={p.size}
                height={p.size}
                fill={p.color}
              >
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
            )}
            {p.type === "star" && (
              <svg
                viewBox="0 0 24 24"
                width={p.size}
                height={p.size}
                fill={p.color}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            )}
          </span>
        ))}
      </div>

      {/* Mascot Body Outer Wrapper: Continuous gentle float without animation interruption */}
      <div
        onClick={onOpenChat}
        onMouseMove={handlePetMove}
        onTouchStart={handlePetMove}
        onTouchMove={handlePetMove}
        className="relative group cursor-pointer touch-none select-none"
        style={{
          animation: "petFloat 4.2s ease-in-out infinite alternate",
        }}
        title="Klik untuk membuka chat, atau elus Si Gata!"
      >
        {/* Ambient Neon Aura with smooth cross-fade */}
        <div
          className="absolute -inset-2 rounded-full blur-xl transition-all duration-700 ease-out pointer-events-none"
          style={{
            background:
              pettingLevel > 0
                ? "radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(244,63,94,0.3) 60%, transparent 100%)"
                : "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
            opacity: pettingLevel > 0 ? 0.85 : 0.45,
          }}
        />

        {/* Inner Pet Container: Interactive squash, stretch, bounce & directional lean */}
        <div
          className="relative w-20 h-20 sm:w-24 sm:h-24"
          style={{
            transform: isPetting
              ? `scale(1.07, 0.94) translateY(2px) rotate(${tiltAngle}deg)`
              : "scale(1, 1) translateY(0px) rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full filter drop-shadow-xl"
          >
            <defs>
              <linearGradient id="bodyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#f0fdf4" />
                <stop offset="100%" stopColor="#bbf7d0" />
              </linearGradient>

              <linearGradient id="visorGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>

              <linearGradient id="earGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>

              <linearGradient id="eyeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              {/* Baret Taruna Gradients */}
              <linearGradient id="beretGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="55%" stopColor="#047857" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>

              <linearGradient id="beretFoldGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#065f46" />
              </linearGradient>

              <linearGradient id="goldEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Jet Thruster Glow Underneath */}
            <ellipse
              cx="50"
              cy="86"
              rx={11 + pettingLevel * 3}
              ry="4"
              fill="#10b981"
              opacity="0.65"
              className="animate-pulse"
            />
            <ellipse
              cx="50"
              cy="88"
              rx="6"
              ry="2"
              fill="#34d399"
              opacity="0.9"
            />

            {/* Cyber Comms Antenna (Peeking from right of beret) */}
            <path
              d="M72 18 L81 8"
              stroke="#047857"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="81"
              cy="8"
              r={3.5 + pettingLevel * 1}
              fill={pettingLevel > 0 ? "#10b981" : "#059669"}
              filter="url(#softGlow)"
            />
            <circle cx="80" cy="7" r="1" fill="#ffffff" />

            {/* Cyber Ear Fins with soft responsive flare */}
            <g
              style={{
                transformOrigin: "18px 49px",
                transform: `rotate(${pettingLevel * -6}deg)`,
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <path
                d="M18 42 L8 48 L18 56 Z"
                fill="url(#earGrad2)"
                stroke="#047857"
                strokeWidth="1.5"
              />
            </g>
            <g
              style={{
                transformOrigin: "82px 49px",
                transform: `rotate(${pettingLevel * 6}deg)`,
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <path
                d="M82 42 L92 48 L82 56 Z"
                fill="url(#earGrad2)"
                stroke="#047857"
                strokeWidth="1.5"
              />
            </g>

            {/* Main Chibi Robot Body */}
            <rect
              x="18"
              y="20"
              width="64"
              height="62"
              rx="28"
              fill="url(#bodyGrad2)"
              stroke="#10b981"
              strokeWidth="2.5"
            />

            {/* Ketarunaan Gold Badge on Chest */}
            <path
              d="M50 70 L43 74 L45 81 L50 84 L55 81 L57 74 Z"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="1"
            />
            <polygon
              points="50,73 52,77 56,77 53,80 54,84 50,82 46,84 47,80 44,77 48,77"
              fill="#ffffff"
            />

            {/* Visor Screen */}
            <rect
              x="26"
              y="32"
              width="48"
              height="30"
              rx="13"
              fill="url(#visorGrad2)"
              stroke="#047857"
              strokeWidth="1.5"
            />

            {/* Blush Cheeks (Smooth Opacity Transition) */}
            <g
              className="transition-opacity duration-700 ease-out"
              opacity={0.15 + pettingLevel * 0.75}
            >
              <ellipse cx="31" cy="55" rx="3.5" ry="2" fill="#f43f5e" />
              <ellipse cx="69" cy="55" rx="3.5" ry="2" fill="#f43f5e" />
            </g>

            {/* EXPRESSION 1: TRACKING EYES (Fades out gently when petted, fades back in) */}
            <g
              className="transition-opacity duration-500 ease-out"
              opacity={1 - pettingLevel}
              style={{
                transformOrigin: "50px 46px",
                transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
                transition:
                  "transform 0.15s ease-in-out, opacity 0.5s ease-out",
              }}
            >
              {/* Left Eye Base & Pupil */}
              <circle cx="40" cy="46" r="6.8" fill="#042f2e" />
              <circle
                cx={40 + pupilOffset.x}
                cy={46 + pupilOffset.y}
                r="4.8"
                fill="url(#eyeGrad2)"
                filter="url(#softGlow)"
              />
              <circle
                cx={40 + pupilOffset.x - 1.5}
                cy={46 + pupilOffset.y - 1.5}
                r="1.6"
                fill="#ffffff"
              />

              {/* Right Eye Base & Pupil */}
              <circle cx="60" cy="46" r="6.8" fill="#042f2e" />
              <circle
                cx={60 + pupilOffset.x}
                cy={46 + pupilOffset.y}
                r="4.8"
                fill="url(#eyeGrad2)"
                filter="url(#softGlow)"
              />
              <circle
                cx={60 + pupilOffset.x - 1.5}
                cy={46 + pupilOffset.y - 1.5}
                r="1.6"
                fill="#ffffff"
              />

              {/* Gentle digital mouth */}
              <circle cx="50" cy="54" r="1.4" fill="#34d399" opacity="0.8" />
            </g>

            {/* EXPRESSION 2: HAPPY CRESCENT EYES (Cross-fades smoothly in and out) */}
            <g
              className="transition-opacity duration-500 ease-out"
              opacity={pettingLevel}
              stroke="#34d399"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            >
              <path d="M34 47 Q 40 40, 46 47" />
              <path d="M54 47 Q 60 40, 66 47" />
              {/* Cute Smiling Mouth */}
              <path d="M47 54 Q 50 57.5, 53 54" strokeWidth="2" />
            </g>

            {/* Paws / Hands */}
            <ellipse
              cx="26"
              cy="67"
              rx="4"
              ry="6"
              fill="#ecfdf5"
              stroke="#10b981"
              strokeWidth="1.5"
              transform={pettingLevel > 0 ? "rotate(-18 26 67)" : ""}
              className="transition-transform duration-700"
            />
            <ellipse
              cx="74"
              cy="67"
              rx="4"
              ry="6"
              fill="#ecfdf5"
              stroke="#10b981"
              strokeWidth="1.5"
              className="transition-transform duration-700"
            />

            {/* BARET TARUNA SKAGATA (Iconic Military Beret with Gold Crest) */}
            <g
              style={{
                transformOrigin: "50px 22px",
                transform: `rotate(${isPetting ? tiltAngle * 0.4 : 0}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              {/* Under-drape shadow */}
              <ellipse cx="78" cy="24" rx="8" ry="4" fill="#022c22" opacity="0.6" />

              {/* Beret Main Crown (Tilted proudly to the right) */}
              <path
                d="M 17 23 C 12 13, 26 5, 48 5 C 68 5, 87 11, 85 21 C 84 27, 72 27, 58 23 C 44 19, 28 20, 17 23 Z"
                fill="url(#beretGrad)"
                stroke="#022c22"
                strokeWidth="1.2"
              />

              {/* Beret Fabric Fold & Sheen Highlight */}
              <path
                d="M 28 10 C 46 7, 64 8, 77 14 C 66 12, 48 10, 34 12 Z"
                fill="url(#beretFoldGrad)"
                opacity="0.45"
              />

              {/* Dark Leather Trim / Headband */}
              <path
                d="M 20 24 Q 48 19 77 25"
                stroke="#0f172a"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Ketarunaan Gold Crest / Lencana Baret (Left side) */}
              <g transform="translate(34, 13)">
                {/* Gold Shield */}
                <path
                  d="M 0 -6 L 6 -3 L 6 3 L 0 7 L -6 3 L -6 -3 Z"
                  fill="url(#goldEmblemGrad)"
                  stroke="#78350f"
                  strokeWidth="0.8"
                />
                {/* Inner White Star */}
                <polygon
                  points="0,-4 1.2,-1 4.5,-1 2,0.8 2.8,4 0,2 -2.8,4 -2,0.8 -4.5,-1 -1.2,-1"
                  fill="#ffffff"
                />
                {/* Gleam Sparkle */}
                <circle cx="-1.5" cy="-2.5" r="0.8" fill="#ffffff" opacity="0.9" />
              </g>
            </g>
          </svg>
        </div>

        {/* Action Status Pill with SVG Icon */}
        <div className="text-center mt-1">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/90 text-emerald-300 backdrop-blur-md border border-emerald-500/30 shadow transition-colors duration-500">
            {pettingLevel > 0 ? (
              <>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
                <span className="text-rose-200">Sedang Dielus</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Klik / Elus Si Gata</span>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
