"use client";

import { useEffect, useRef, useState } from "react";
import { StarOrb } from "./Motifs";

const readings = [
  {
    to: 500,
    suffix: "+",
    decimals: 0,
    label: "DSA problems solved",
    tag: "LeetCode · NeetCode · GfG",
  },
  {
    to: 30,
    suffix: "%",
    decimals: 0,
    label: "API latency cut",
    tag: "Vartagram · PostgreSQL",
  },
  {
    to: 28,
    suffix: "%",
    decimals: 0,
    label: "Initial bundle cut",
    tag: "Fitreak · Next.js",
  },
  {
    to: 9.07,
    suffix: "",
    decimals: 2,
    label: "CGPA — it's over 9!",
    tag: "B.Tech CSBS · BVDU",
  },
];

export function PowerLevels() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setScanning(true);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1800, 1);
          setP(1 - Math.pow(1 - t, 4));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setScanning(false);
        };
        setP(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="scouter relative overflow-hidden rounded-[2.5rem] border-[3px] border-[var(--ink)] p-6 shadow-[6px_6px_0_var(--ink)] sm:p-10"
    >
      <div className="mb-8 flex items-center justify-between text-xs tracking-[0.2em]">
        <span>SCOUTER v2.6 · TARGET: VIKRAM SINGH</span>
        <span className={scanning ? "blink" : ""}>
          {scanning ? "● SCANNING" : "● LOCKED"}
        </span>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        {readings.map((r, i) => (
          <div key={r.label} className="relative flex gap-4 pl-6">
            <span className="absolute top-1 left-0 h-[calc(100%-0.5rem)] w-3 border-y-2 border-l-2 border-current" />
            <StarOrb
              n={(i + 1) as 1 | 2 | 3 | 4}
              className="mt-1 size-10 shrink-0 drop-shadow-[0_0_10px_rgb(255_170_40/0.55)]"
            />
            <div>
              <p className="text-5xl font-bold tabular-nums sm:text-6xl">
                {(r.to * p).toFixed(r.decimals)}
                {r.suffix}
              </p>
              <p className="mt-2 text-sm tracking-wide">{r.label}</p>
              <p className="text-[11px] opacity-60">{r.tag}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full border-2 border-current opacity-30" />
      <div className="pointer-events-none absolute -top-6 -right-6 size-32 rounded-full border border-current opacity-30" />
    </div>
  );
}
