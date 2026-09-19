"use client";

import React, { useRef, useState, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const calculateTilt = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Angle calculations with smooth limit
    const rotateX = Math.max(-12, Math.min(12, ((y - centerY) / centerY) * -10));
    const rotateY = Math.max(-12, Math.min(12, ((x - centerX) / centerX) * 10));

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`
    );
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
    setIsInteracting(true);
  }, []);

  const resetTilt = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    setIsInteracting(false);
  }, []);

  // Desktop Mouse Events
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    calculateTilt(e.clientX, e.clientY);
  };

  // Mobile Touch Events
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      calculateTilt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchStart={(e) => {
        if (e.touches.length > 0) calculateTilt(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
      onTouchCancel={resetTilt}
      style={{
        transform,
        transition: isInteracting ? "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden group ${className}`}
    >
      {children}

      {/* Holographic dynamic glare */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(52, 211, 153, 0.35) 0%, rgba(255, 255, 255, 0.15) 35%, transparent 70%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Subtle 3D neon edge glow on active hover/touch */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl border-2 transition-opacity duration-300 z-20 ${
          isInteracting ? "border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] opacity-100" : "border-transparent opacity-0"
        }`}
      />
    </div>
  );
}
