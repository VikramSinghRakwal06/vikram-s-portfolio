"use client";

import { useEffect } from "react";

// Hover-only effects never fire on touch screens, so there they play when a card scrolls to mid-screen.
const targets =
  ".sfx-hover, .release, .dismantle, .hero-card, .rival, .domain, .cover-eye, .pokedex";

export function TouchEffects() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          e.target.classList.toggle("is-active", e.isIntersecting);
      },
      { rootMargin: "-35% 0px -35% 0px" },
    );
    document.querySelectorAll(targets).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
