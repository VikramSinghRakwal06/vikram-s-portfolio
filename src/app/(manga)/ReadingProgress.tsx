"use client";

import { useEffect, useRef, useState } from "react";

export type Chapter = { id: string; no: string; en: string; plain: string };

export function ReadingProgress({ chapters }: { chapters: Chapter[] }) {
  const bar = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<Chapter | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (bar.current)
        bar.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setCurrent(chapters.find((c) => c.id === e.target.id) ?? null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const cover = document.getElementById("cover");
    if (cover) io.observe(cover);
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [chapters]);

  return (
    <>
      <div className="absolute inset-x-0 -bottom-[3px] h-[3px]" aria-hidden>
        <div
          ref={bar}
          className="h-full origin-left bg-[var(--red)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      {current && (
        <a
          key={current.id}
          href={`#${current.id}`}
          className="pop fixed bottom-5 left-5 z-50 hidden items-center gap-3 border-[3px] border-[var(--ink)] bg-[var(--paper)] py-1.5 pr-4 pl-1.5 shadow-[4px_4px_0_var(--ink)] sm:flex"
          aria-label={`Current chapter: ${current.plain}`}
        >
          <span className="f-bebas bg-[var(--ink)] px-2 pt-0.5 text-lg text-[var(--paper)]">
            {current.no === "00" ? "Recap" : `Ch.${current.no}`}
          </span>
          <span className="leading-tight">
            <span className="f-bebas block text-lg">{current.en}</span>
            <span className="block text-xs text-[var(--ink-3)]">
              {current.plain}
            </span>
          </span>
        </a>
      )}
    </>
  );
}
