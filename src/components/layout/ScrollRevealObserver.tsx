"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      try {
        const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

        // 1. Select all reveal elements
        const revealTargets = document.querySelectorAll(
          ".reveal-up:not(.revealed), .reveal-down:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-zoom:not(.revealed)"
        );

        // On mobile, reveal everything immediately with 0 delay and zero jank
        if (isMobile) {
          revealTargets.forEach((el) => el.classList.add("revealed"));
          return;
        }

        if (revealTargets.length === 0) return;

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
              rootMargin: "0px 0px 120px 0px", // Reveal 120px in advance so user never sees blank pop-in
              threshold: 0.01,
            }
          );
        }

        revealTargets.forEach((el) => observer!.observe(el));
      } catch (err) {
        console.warn("Scroll reveal observer setup:", err);
      }
    };

    // Run on mount with staggered ticks
    const t1 = setTimeout(setupObserver, 60);
    const t2 = setTimeout(setupObserver, 350);

    // Also re-run on custom CMS updates
    window.addEventListener("skagata_cms_updated", setupObserver);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("skagata_cms_updated", setupObserver);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  return null;
}
