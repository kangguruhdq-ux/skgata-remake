"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let setupFrame: number | null = null;

    const setupObserver = () => {
      try {
        const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

        // Select all reveal elements
        const revealTargets = document.querySelectorAll<HTMLElement>(
          ".reveal-up:not(.revealed), .reveal-down:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-zoom:not(.revealed), .reveal-pop:not(.revealed)"
        );

        if (revealTargets.length === 0) return;

        // Fallback for browsers without IntersectionObserver
        if (!("IntersectionObserver" in window)) {
          revealTargets.forEach((el) => el.classList.add("revealed"));
          return;
        }

        if (!observer) {
          observer = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("revealed");
                  obs.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              // On mobile: -20px bottom margin triggers fluid reveal as element enters screen
              // On desktop: -40px bottom margin
              rootMargin: isMobile ? "0px 0px -20px 0px" : "0px 0px -40px 0px",
              threshold: 0.04,
            }
          );
        }

        revealTargets.forEach((el) => {
          observer!.observe(el);
        });
      } catch (err) {
        console.warn("Scroll reveal observer setup:", err);
      }
    };

    const scheduleSetup = () => {
      if (setupFrame !== null) return;
      setupFrame = window.requestAnimationFrame(() => {
        setupFrame = null;
        setupObserver();
      });
    };

    // Staggered ticks to capture initial hydration without layout thrashing
    const t1 = setTimeout(scheduleSetup, 150);
    const t2 = setTimeout(scheduleSetup, 800);

    // Also re-run on custom CMS updates
    window.addEventListener("skagata_cms_updated", scheduleSetup);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("skagata_cms_updated", scheduleSetup);
      if (setupFrame !== null) window.cancelAnimationFrame(setupFrame);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  return null;
}
