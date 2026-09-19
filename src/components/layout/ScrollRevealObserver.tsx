"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      try {
        // 1. Tag any un-tagged interactive sections or cards
        const autoTargets = document.querySelectorAll(
          "article:not(.reveal-up):not(.reveal-left):not(.reveal-right):not(.reveal-zoom):not(.revealed), " +
          ".interactive-card:not(.reveal-up):not(.reveal-left):not(.reveal-right):not(.reveal-zoom):not(.revealed), " +
          ".timeline-item:not(.reveal-up):not(.revealed)"
        );

        autoTargets.forEach((el, index) => {
          el.classList.add("reveal-up");
          const delayNum = (index % 4) + 1;
          el.classList.add(`delay-${delayNum}`);
        });

        // 2. Select all reveal elements across the page
        const revealTargets = document.querySelectorAll(
          ".reveal-up:not(.revealed), .reveal-down:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-zoom:not(.revealed)"
        );

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
              rootMargin: "0px 0px -40px 0px",
              threshold: 0.08,
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
