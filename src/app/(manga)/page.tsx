import { readdirSync } from "node:fs";
import { join } from "node:path";
import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import {
  about,
  achievements,
  education,
  experience,
  featuredProject,
  nen,
  profile,
  projects,
  skills,
} from "@/data/profile";
import {
  Grimoire,
  Hanafuda,
  Headband,
  Katana,
  KatanaDivider,
  Kunai,
  NineTails,
  PokeBall,
  SakuraPetals,
  SasukeRinnegan,
  Shuriken,
  StarOrb,
  StrawHat,
  TransmutationCircle,
  BlackFlash,
  TreasureX,
  WingsOfFreedom,
  NenHexagon,
  Zangetsu,
  ChibiGojo,
  ChibiSukuna,
  SantoryuSwords,
} from "./Motifs";
import { PowerLevels } from "./PowerLevels";
import { ReadingProgress, type Chapter } from "./ReadingProgress";
import { EasterEgg } from "./EasterEgg";
import { Manual } from "./Manual";
import { TouchEffects } from "./TouchEffects";
import "./anime.css";

// Japanese-capable fonts are subset to the glyphs this page uses: `npm run fonts`.
const dela = localFont({
  src: "./fonts/dela-gothic-one.woff2",
  weight: "400",
  variable: "--font-dela",
});
const zen = localFont({
  src: [
    { path: "./fonts/zen-kaku-400.woff2", weight: "400" },
    { path: "./fonts/zen-kaku-700.woff2", weight: "700" },
  ],
  variable: "--font-zen",
});
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});
const rye = localFont({
  src: "./fonts/rye.woff2",
  variable: "--font-rye",
  preload: false,
});
const fell = localFont({
  src: "./fonts/fell.woff2",
  variable: "--font-fell",
  preload: false,
});
const pixel = localFont({
  src: "./fonts/pixel.woff2",
  variable: "--font-pixel",
  preload: false,
});
const fraktur = localFont({
  src: "./fonts/fraktur.woff2",
  variable: "--font-fraktur",
  preload: false,
});

const chapters = [
  {
    id: "origin",
    no: "01",
    en: "Origin",
    jp: "始まり",
    plain: "About",
    blurb: "who I am and how I work",
  },
  {
    id: "voyage",
    no: "02",
    en: "Voyage log",
    jp: "航海日誌",
    plain: "Experience",
    blurb: "where I've worked",
  },
  {
    id: "bounties",
    no: "03",
    en: "Bounties",
    jp: "手配書",
    plain: "Projects",
    blurb: "what I've built",
  },
  {
    id: "bankai",
    no: "04",
    en: "Bankai",
    jp: "バンカイ",
    plain: "Skills",
    blurb: "the tools I use",
  },
  {
    id: "power",
    no: "05",
    en: "Power levels",
    jp: "戦闘力",
    plain: "Stats & awards",
    blurb: "numbers, wins and education",
  },
];

const trackedChapters: Chapter[] = [
  { id: "recap", no: "00", en: "Previously on…", plain: "30-second summary" },
  ...chapters.map(({ id, no, en, plain }) => ({ id, no, en, plain })),
  { id: "finale", no: "06", en: "Final chapter", plain: "Contact" },
];

const emblems: Record<string, ReactNode> = {
  "01": <NineTails className="w-24" />,
  "02": <StrawHat className="w-20" />,
  "03": <Kunai className="w-20 -rotate-45 text-[var(--ink)]" />,
  "04": <Grimoire className="anti-aura w-12" />,
  "05": <StarOrb n={4} className="w-14" />,
};

function ChapterHead({ no, dark }: { no: string; dark?: boolean }) {
  const { en, jp, plain, blurb } = chapters.find((c) => c.no === no)!;
  return (
    <div className="rise mb-12 flex flex-wrap items-end gap-x-6 gap-y-3 sm:mb-16">
      <span className="emblem basis-full sm:basis-auto">{emblems[no]}</span>
      <span
        className={`f-bebas px-3 pt-1 text-2xl ${dark ? "bg-[var(--paper)] text-[var(--ink)]" : "bg-[var(--ink)] text-[var(--paper)]"}`}
      >
        第{Number(no)}話 · CH.{no}
      </span>
      <h2 className="f-dela text-5xl leading-none sm:text-7xl">{en}</h2>
      <span
        className={`f-dela text-2xl sm:text-3xl ${dark ? "text-[var(--red)]" : "text-[var(--red)]"}`}
      >
        {jp}
      </span>
      <p
        className={`basis-full text-lg sm:text-xl ${dark ? "text-[#cfc8b8]" : "text-[var(--ink-2)]"}`}
      >
        <span
          className={`marker font-bold ${dark ? "text-[var(--paper)] [background:none] underline decoration-[var(--red)] decoration-[3px] underline-offset-4" : "text-[var(--ink)]"}`}
        >
          {plain}
        </span>{" "}
        — {blurb}.
      </p>
    </div>
  );
}

function Nod({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`note mt-4 ${dark ? "text-[#8a8374]" : ""}`}>※ {children}</p>
  );
}

/* ---------- poster art (original line drawings) ---------- */
const stroke = {
  stroke: "var(--sepia)",
  strokeWidth: 3,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ArtServices() {
  return (
    <svg viewBox="0 0 240 180" className="size-full" aria-hidden>
      <rect x="85" y="18" width="70" height="32" rx="6" {...stroke} />
      <path d="M120 50v22M40 72h160M40 72v18M120 72v18M200 72v18" {...stroke} />
      {[10, 90, 170].map((x) => (
        <g key={x}>
          <rect x={x} y="92" width="60" height="30" rx="6" {...stroke} />
          <ellipse cx={x + 30} cy="150" rx="22" ry="6" {...stroke} />
          <path
            d={`M${x + 8} 150v14a22 6 0 0 0 44 0v-14M${x + 30} 122v22`}
            {...stroke}
          />
        </g>
      ))}
      <path d="M103 34h34" {...stroke} strokeDasharray="2 6" />
    </svg>
  );
}

function ArtRealtime() {
  return (
    <svg viewBox="0 0 240 180" className="size-full" aria-hidden>
      <path
        d="M22 30h110a14 14 0 0 1 14 14v34a14 14 0 0 1-14 14H62l-22 18v-18H22A14 14 0 0 1 8 78V44a14 14 0 0 1 14-14Z"
        {...stroke}
      />
      <path
        d="M108 96h108a14 14 0 0 1 14 14v30a14 14 0 0 1-14 14h-14v18l-22-18h-72a14 14 0 0 1-14-14v-30a14 14 0 0 1 14-14Z"
        {...stroke}
      />
      <path d="M30 56h82M30 70h52M124 118h52M124 132h82" {...stroke} />
      <path d="M170 38h28l14-10v36l-14-10h-28z" {...stroke} />
    </svg>
  );
}

function ArtAnalytics() {
  return (
    <svg viewBox="0 0 240 180" className="size-full" aria-hidden>
      <path d="M16 160h208" {...stroke} />
      {[
        [26, 90],
        [62, 60],
        [98, 110],
        [134, 40],
      ].map(([x, h]) => (
        <rect key={x} x={x} y={160 - h} width="24" height={h} {...stroke} />
      ))}
      <circle cx="194" cy="62" r="34" {...stroke} />
      <path d="M194 62V28M194 62l28 20" {...stroke} />
    </svg>
  );
}

const posters = [
  {
    p: featuredProject,
    art: <ArtServices />,
    bounty: "5 MICROSERVICES",
    tilt: -2.2,
  },
  {
    p: projects[0],
    art: <ArtRealtime />,
    bounty: "REAL-TIME · WEBRTC",
    tilt: 1.6,
  },
  {
    p: projects[1],
    art: <ArtAnalytics />,
    bounty: "MONGODB PIPELINES",
    tilt: -1.1,
  },
];

/* ---------- bankai kanji ---------- */
// Black Clover grimoires: most are three-leaf, four-leaf is rare, five-leaf holds anti-magic.
const grimoireFor: Record<
  string,
  { leaves: 3 | 4 | 5; cover: string; note: string }
> = {
  Languages: { leaves: 3, cover: "#2b4c9b", note: "three-leaf" },
  Spring: { leaves: 4, cover: "#2e7d3c", note: "four-leaf, rare" },
  Backend: { leaves: 5, cover: "#1b1916", note: "five-leaf, anti-magic" },
  Databases: { leaves: 3, cover: "#7a4420", note: "three-leaf" },
  "Core Java": { leaves: 4, cover: "#8e2a1f", note: "four-leaf, rare" },
  "Cloud & DevOps": { leaves: 3, cover: "#3b6ea5", note: "three-leaf" },
  Frontend: { leaves: 3, cover: "#6b3fa0", note: "three-leaf" },
  Practices: { leaves: 3, cover: "#8a6d1f", note: "three-leaf" },
};

// Release commands in the style of Bleach zanpakutō, one Gotei division per skill group.
const releaseFor: Record<string, [string, string]> = {
  Languages: ["一", "Compile, Kotoba"],
  Spring: ["二", "Bloom, Harukaze"],
  Backend: ["三", "Hold the gate, Uramon"],
  Databases: ["四", "Remember all, Kura"],
  "Core Java": ["五", "Run anywhere, Kaku"],
  "Cloud & DevOps": ["六", "Scatter, Kumo"],
  Frontend: ["七", "Show your face, Omote"],
  Practices: ["八", "Walk the path, Michi"],
};
const maxSkills = Math.max(...skills.map((g) => g.items.length));

const rules = [
  "Indexes must match the query patterns that actually run.",
  "An N+1 query, once found, shall not survive code review.",
  "Slow work, such as notifications, must never sit on the request path.",
  "A schema should not need rewriting six months after it is written.",
];

// Character portraits dropped into public/characters/ are picked up at build time.
function characterFaces() {
  try {
    return Object.fromEntries(
      readdirSync(join(process.cwd(), "public/characters"))
        .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
        .map((f) => [
          f.replace(/\.[^.]+$/, "").toLowerCase(),
          `/characters/${f}`,
        ]),
    );
  } catch {
    return {};
  }
}

export default function AnimePage() {
  const [vartagram, fitreak] = [...experience].reverse();
  const arcs = [vartagram, fitreak];

  return (
    <div
      className={`manga min-h-dvh overflow-x-clip ${dela.variable} ${zen.variable} ${bebas.variable} ${rye.variable} ${fell.variable} ${fraktur.variable} ${pixel.variable}`}
    >
      <div className="paper-grain" aria-hidden />
      <TouchEffects />
      <EasterEgg faces={characterFaces()} />

      {/* header */}
      <header className="sticky top-0 z-50 border-b-[3px] border-[var(--ink)] bg-[var(--paper)]">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#cover" data-egg-logo className="flex items-center gap-3">
            <span className="grid size-9 place-items-center bg-[var(--red)] text-xl leading-none font-bold text-white">
              忍
            </span>
            <span className="f-bebas text-xl leading-none whitespace-nowrap">
              Vikram Singh<span className="hidden sm:inline"> · Vol. 01</span>
            </span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {chapters.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="f-bebas px-3 py-1 text-lg transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                >
                  <span className="text-[var(--red)]">{c.no}</span> {c.plain}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 sm:gap-3">
            <Manual />
            <Link
              href="/plain"
              className="f-bebas hidden border-2 border-[var(--ink)] px-3 pt-1 pb-0.5 text-lg transition-colors hover:bg-[var(--gold)] sm:inline-block"
              title="A plain, printable version of this page"
            >
              Plain mode
            </Link>
            <a
              href="#finale"
              className="f-bebas bg-[var(--ink)] px-4 pt-1.5 pb-1 text-lg text-[var(--paper)] transition-colors hover:bg-[var(--red)]"
            >
              Contact
              <Kunai className="ml-2 hidden w-8 text-[var(--red)] sm:inline" />
            </a>
          </div>
        </nav>
        <ReadingProgress chapters={trackedChapters} />
      </header>

      <main>
        {/* ================= COVER ================= */}
        <section
          id="cover"
          className="relative overflow-hidden border-b-[3px] border-[var(--ink)]"
        >
          <SakuraPetals />
          <div className="halftone pointer-events-none absolute -top-10 -left-10 h-72 w-96 opacity-25 [mask-image:radial-gradient(ellipse_at_top_left,#000,transparent_70%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-10 sm:px-6 lg:grid-cols-12 lg:items-center lg:pt-16">
            <div className="relative z-10 lg:col-span-7">
              <div className="impact flex flex-wrap items-center gap-3">
                <span className="f-bebas bg-[var(--red)] px-3 pt-1 text-xl text-white">
                  Vol. 01
                </span>
                <span className="f-dela text-lg">週刊バックエンド</span>
                <span className="note">weekly backend · 2026 edition</span>
              </div>

              <h1
                className="f-dela mt-8 leading-[0.88]"
                aria-label={profile.name}
              >
                <span
                  className="impact block text-[clamp(4rem,12vw,10.5rem)]"
                  style={{ animationDelay: "120ms" }}
                >
                  VIKRAM
                </span>
                <span
                  className="impact outline-ink block text-[clamp(4rem,12vw,10.5rem)]"
                  style={{ animationDelay: "260ms" }}
                >
                  SINGH
                </span>
              </h1>

              <div
                className="pop mt-12 max-w-xl"
                style={{ animationDelay: "650ms" }}
              >
                <div className="bubble px-7 py-5 sm:px-9 sm:py-6">
                  <p className="text-xl leading-snug font-bold sm:text-2xl">
                    &ldquo;I build backend systems that{" "}
                    <span className="text-[var(--red)]">
                      stay correct under load.
                    </span>
                    &rdquo;
                  </p>
                </div>
              </div>

              <div
                className="pop mt-12 flex flex-wrap gap-2"
                style={{ animationDelay: "800ms" }}
              >
                <span className="caption">JAVA BACKEND ENGINEER</span>
                <span className="caption">
                  SPRING BOOT · KAFKA · POSTGRESQL · REDIS
                </span>
                <span className="caption">FULL-STACK DEV @ FITREAK</span>
              </div>

              <div
                className="pop mt-8 flex flex-wrap gap-3"
                style={{ animationDelay: "950ms" }}
              >
                <a
                  href="#recap"
                  className="f-bebas inline-flex h-14 items-center bg-[var(--ink)] px-7 pt-1 text-2xl text-[var(--paper)] shadow-[5px_5px_0_var(--red)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--red)]"
                >
                  Start reading
                  <Kunai className="ml-3 w-9 rotate-90" />
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener"
                  className="f-bebas inline-flex h-14 items-center border-[3px] border-[var(--ink)] bg-white px-7 pt-1 text-2xl transition-colors hover:bg-[var(--gold)]"
                >
                  Résumé ↗
                </a>
              </div>
            </div>

            {/* cover art */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto aspect-square w-full max-w-[520px]">
                <div
                  className="speedlines absolute -inset-[45%] opacity-80"
                  aria-hidden
                />
                <div
                  className="cover-eye impact absolute inset-[8%] rounded-full border-[4px] border-[var(--ink)] bg-[#a58ee0] shadow-[10px_10px_0_var(--ink)]"
                  style={{ animationDelay: "380ms" }}
                >
                  <div className="halftone absolute inset-0 rounded-full opacity-20 [mask-image:linear-gradient(135deg,transparent_40%,#000)]" />
                  <SasukeRinnegan />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-5">
                    <span className="f-dela vertical text-[clamp(0.85rem,1.9vw,1.2rem)] tracking-[0.2em] text-[var(--ink)]">
                      バックエンドエンジニア
                    </span>
                    <span className="f-dela vertical text-[clamp(1.9rem,4.6vw,3.1rem)] leading-none text-white [text-shadow:4px_4px_0_var(--ink)]">
                      ヴィクラム・シン
                    </span>
                  </div>
                </div>
                {[
                  {
                    t: "ゴ",
                    c: "top-[2%] right-[6%] text-6xl sm:text-7xl",
                    r: "-10deg",
                    d: "0s",
                  },
                  {
                    t: "ゴ",
                    c: "top-[16%] -right-[2%] text-5xl sm:text-6xl",
                    r: "8deg",
                    d: ".4s",
                  },
                  {
                    t: "ゴ",
                    c: "bottom-[14%] -left-[2%] text-6xl sm:text-7xl",
                    r: "-6deg",
                    d: ".9s",
                  },
                  {
                    t: "ゴ",
                    c: "bottom-[2%] left-[14%] text-5xl",
                    r: "12deg",
                    d: "1.3s",
                  },
                ].map((s, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={`sfx menace absolute ${s.c}`}
                    style={{ "--r": s.r, animationDelay: s.d } as CSSProperties}
                  >
                    {s.t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* back-cover strip */}
          <div className="relative z-10 border-t-[3px] border-[var(--ink)] bg-[var(--paper-2)]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-4">
                <div className="barcode h-9 w-28" aria-hidden />
                <span className="f-bebas text-lg">¥0 · Free to read</span>
                <span className="note hidden md:inline">
                  ※ the eye on the cover is Sasuke&apos;s Rinnegan (Naruto)
                </span>
              </div>
              <span className="f-bebas text-lg">
                {profile.location} ·{" "}
                <span className="text-[var(--red)]">
                  ● Open to backend roles
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* ================= RECAP ================= */}
        <section
          id="recap"
          className="mx-auto max-w-7xl scroll-mt-16 px-4 pt-20 pb-4 sm:px-6 sm:pt-28"
        >
          <div className="rise flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="f-dela text-2xl text-[var(--red)]">
                前回のあらすじ
              </p>
              <h2 className="f-dela mt-2 text-4xl leading-none sm:text-6xl">
                Previously on…
              </h2>
            </div>
            <p className="caption">⏱ 30-SECOND READ · THE SHORT VERSION</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                k: "Who",
                v: "Java backend engineer",
                d: "Spring Boot, Kafka, PostgreSQL and Redis. Based in Pune, India.",
              },
              {
                k: "Now",
                v: "Full-Stack Developer at Fitreak",
                d: "Leading the Next.js frontend and wiring it to a Spring Boot commerce backend.",
              },
              {
                k: "Best work",
                v: "SplitExpense",
                d: "5 Spring Boot microservices behind one gateway, with Kafka events between them.",
                href: "#bounties",
              },
              {
                k: "Looking for",
                v: "Backend roles",
                d: "In Bengaluru, Mumbai or remote. Java, Spring Boot, distributed systems.",
                href: "#finale",
              },
            ].map((f, i) => (
              <div
                key={f.k}
                className="recap-card sfx-hover rise p-6"
                data-icon="pokeball"
              >
                <p className="f-bebas flex items-center gap-2 text-lg text-[var(--ink-3)]">
                  <span className="grid size-6 place-items-center bg-[var(--red)] pt-0.5 text-sm text-white">
                    {i + 1}
                  </span>
                  {f.k}
                </p>
                <p className="mt-3 text-2xl leading-tight font-bold">
                  {f.href ? (
                    <a
                      href={f.href}
                      className="underline decoration-[var(--red)] decoration-[3px] underline-offset-4 hover:text-[var(--red)]"
                    >
                      {f.v}
                    </a>
                  ) : (
                    f.v
                  )}
                </p>
                <p className="mt-3 pb-8 text-base leading-relaxed text-[var(--ink-2)]">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
          <div className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="f-bebas inline-flex h-12 items-center bg-[var(--red)] px-6 pt-1 text-xl text-white shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              Email me
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="f-bebas text-xl underline decoration-2 underline-offset-4 hover:text-[var(--red)]"
            >
              Download résumé ↗
            </a>
            <Link
              href="/plain"
              className="f-bebas text-xl underline decoration-2 underline-offset-4 hover:text-[var(--red)]"
            >
              Prefer it plain? Plain version
            </Link>
            <a
              href="#origin"
              className="f-bebas text-xl text-[var(--ink-3)] hover:text-[var(--ink)]"
            >
              Or read the full story
              <Kunai className="ml-2 inline w-8 rotate-90" />
            </a>
          </div>
          <div className="mt-20">
            <div className="rise flex items-center gap-4" aria-hidden>
              <span className="h-0 flex-1 border-t-2 border-dashed border-[var(--ink-3)]" />
              <SantoryuSwords className="santoryu w-[min(460px,72vw)]" />
              <span className="h-0 flex-1 border-t-2 border-dashed border-[var(--ink-3)]" />
            </div>
            <p className="note mt-2 text-center">
              ※ three swords: a nod to Zoro&apos;s Santoryu (One Piece)
            </p>
          </div>
        </section>

        {/* ================= CH1 ORIGIN ================= */}
        <section
          id="origin"
          className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 sm:px-6 sm:py-32"
        >
          <ChapterHead no="01" />
          <div className="grid gap-5 lg:grid-cols-12">
            {/* narration */}
            <div
              className="panel draw sfx-hover overflow-hidden p-7 sm:p-10 lg:col-span-7"
              data-icon="shuriken"
            >
              <div className="halftone-red pointer-events-none absolute -right-8 -bottom-8 size-56 rounded-full opacity-30" />
              <span className="caption">NARRATOR</span>
              <p className="relative mt-6 text-xl leading-relaxed font-medium sm:text-2xl">
                {about[0]}
              </p>
            </div>

            {/* ninja card */}
            <div
              className="panel draw sfx-hover overflow-hidden lg:col-span-5"
              data-icon="kunai"
            >
              <div className="flex items-center justify-between bg-[var(--red)] px-5 py-2.5 text-white">
                <span className="f-dela flex items-center gap-2 text-xl">
                  <Shuriken className="shuriken-spin size-5 text-white" />
                  忍者登録
                </span>
                <span className="f-bebas text-lg tracking-widest">
                  Ninja registration
                </span>
              </div>
              <div className="flex gap-5 p-5 sm:p-6">
                <Headband />
                <dl className="min-w-0 flex-1 space-y-2.5 text-[15px]">
                  {[
                    ["Village", profile.location],
                    ["Affiliation", "Fitreak"],
                    ["Rank", "Full-Stack Developer"],
                    ["Chakra nature", "Java · Spring Boot"],
                    ["Signature jutsu", "Event-driven microservices"],
                    ["Missions", "500+ DSA problems"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="group border-b border-dashed border-[var(--ink-3)] pb-1.5"
                    >
                      <dt className="f-bebas flex items-center gap-1.5 text-base leading-none text-[var(--ink-3)]">
                        <Shuriken className="shuriken-hover size-2.5 text-[var(--red)]" />
                        {k}
                      </dt>
                      <dd className="font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="note px-6 pb-4">
                ※ the ninja card, forehead plate and shuriken are a nod to
                Naruto
              </p>
            </div>

            {/* backend note */}
            <div
              className="panel panel-dark draw sfx-hover p-7 sm:p-9 lg:col-span-5"
              data-icon="apple"
            >
              <p className="f-fraktur text-5xl leading-none">Backend Note</p>
              <p className="f-bebas mt-1 text-lg tracking-[0.2em] text-[#8a8374]">
                How to use it
              </p>
              <ol className="mt-6 space-y-4">
                {rules.map((r, i) => (
                  <li
                    key={r}
                    className="flex gap-4 text-[15px] leading-relaxed text-[#e9e3d4]"
                  >
                    <span className="f-fell text-xl text-[var(--red)]">
                      {["I", "II", "III", "IV"][i]}
                    </span>
                    {r}
                  </li>
                ))}
              </ol>
              <Nod dark>
                the rules I work by, written like Death Note&apos;s
              </Nod>
            </div>

            {/* frontend panel */}
            <div className="panel draw overflow-hidden p-7 sm:p-10 lg:col-span-7">
              <span
                aria-hidden
                className="sfx absolute top-4 right-6 rotate-[-12deg] text-6xl sm:text-7xl"
              >
                シュッ
              </span>
              <span className="caption">MEANWHILE, AT FITREAK…</span>
              <div className="bubble mt-8 max-w-lg px-7 py-5">
                <p className="text-lg leading-snug font-bold">{about[2]}</p>
              </div>
              <p className="mt-12 max-w-lg text-[15px] leading-relaxed text-[var(--fg-muted)]">
                {about[1]}
              </p>
            </div>
            {/* pro hero profile */}
            <div className="hero-card draw relative overflow-hidden lg:col-span-12">
              <div className="grid md:grid-cols-12">
                <div className="hero-side relative flex flex-col justify-between gap-6 p-6 sm:p-8 md:col-span-4">
                  <div>
                    <p className="f-bebas text-sm tracking-[0.3em] text-[#ffe08a]">
                      Pro hero profile
                    </p>
                    <p className="f-dela mt-2 text-4xl leading-none text-white [text-shadow:3px_3px_0_var(--ink)]">
                      INDEX
                    </p>
                    <p className="mt-1 text-sm text-white/85">Hero name</p>
                  </div>
                  <p className="plus-ultra f-dela -rotate-6 text-3xl leading-none sm:text-4xl">
                    PLUS
                    <br />
                    ULTRA!
                  </p>
                  <svg
                    viewBox="0 0 60 60"
                    className="ofa-sparks pointer-events-none absolute inset-0 size-full"
                    aria-hidden
                  >
                    <path
                      d="M8 12l6 4-3 2 7 6M50 8l-4 7 3 1-5 8M46 50l-6-3 1 4-8-3M10 48l5-6 1 3 6-5"
                      fill="none"
                      stroke="#7dff9b"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <dl className="grid gap-x-8 gap-y-4 p-6 text-[15px] sm:grid-cols-2 sm:p-8 md:col-span-8">
                  {[
                    [
                      "Quirk",
                      "Query Sight",
                      "Spots slow queries and N+1 loops at a glance. Used at Vartagram to cut API latency by 30%.",
                    ],
                    [
                      "Special move",
                      "Composite Index Smash",
                      "Rewrites a hot endpoint's queries until the index does the work.",
                    ],
                    [
                      "Hero agency",
                      "Fitreak",
                      "Full-Stack Developer, leading the Next.js frontend.",
                    ],
                    [
                      "Weakness",
                      "Unfinished TODOs",
                      "Physically cannot leave one in a pull request.",
                    ],
                  ].map(([k, title, body]) => (
                    <div key={k}>
                      <dt className="f-bebas text-base tracking-[0.12em] text-[var(--ink-3)]">
                        {k}
                      </dt>
                      <dd>
                        <p className="font-bold">{title}</p>
                        <p className="text-[14px] leading-relaxed text-[var(--ink-2)]">
                          {body}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rival">
                <svg viewBox="0 0 100 100" className="boom" aria-hidden>
                  <path
                    d="M50 2L60 30L88 14L72 42L98 50L72 58L88 86L60 70L50 98L40 70L12 86L28 58L2 50L28 42L12 14L40 30Z"
                    fill="#ff8a1f"
                    stroke="var(--ink)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M50 22L56 40L74 32L64 48L80 54L62 58L68 76L52 64L44 80L42 62L24 66L36 52L22 40L42 42Z"
                    fill="#ffe08a"
                  />
                </svg>
                <div className="min-w-0">
                  <p className="f-bebas text-sm tracking-[0.25em] text-[#ffb35c]">
                    Rival mode · Explosion Quirk
                  </p>
                  <p className="mt-0.5 font-bold text-white">
                    Howitzer Impact: initial bundle blown down by 28% at
                    Fitreak.
                  </p>
                  <p className="text-[13px] text-[#e8d9c7]">
                    Route-based code splitting and image optimization. Fastest
                    page in the storefront, and it knows it.
                  </p>
                </div>
                <span className="boom-text f-dela" aria-hidden>
                  BOOM!
                </span>
              </div>
              <p className="note px-6 pb-4 sm:px-8">
                ※ the pro hero profile, Quirk, &ldquo;Plus Ultra&rdquo;, One For
                All sparks and Bakugo&apos;s explosive rival mode (hover it) are
                a nod to My Hero Academia
              </p>
            </div>

            {/* pokédex entry */}
            <div className="pokedex draw group p-4 sm:p-6 lg:col-span-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="size-11 rounded-full border-[3px] border-[var(--ink)] bg-[radial-gradient(circle_at_35%_35%,#bfe9ff,#2a9df4_55%,#0a5c9e)] shadow-[inset_0_0_0_3px_#fff]" />
                <span className="size-3.5 rounded-full border-2 border-[var(--ink)] bg-[#ff6b6b]" />
                <span className="size-3.5 rounded-full border-2 border-[var(--ink)] bg-[#ffd84d]" />
                <span className="size-3.5 rounded-full border-2 border-[var(--ink)] bg-[#5fd068]" />
                <span className="f-pixel ml-auto text-[10px] text-white sm:text-xs">
                  POKéDEX
                </span>
              </div>
              <div className="pokedex-screen grid gap-6 p-5 sm:p-7 md:grid-cols-12">
                <div className="flex items-center gap-4 md:col-span-4 md:flex-col md:items-start">
                  <PokeBall className="pokeball w-16 shrink-0 sm:w-20" />
                  <div>
                    <p className="f-pixel text-[11px] text-[var(--ink-3)]">
                      No. 2026
                    </p>
                    <p className="f-pixel mt-2 text-xl sm:text-2xl">VIKRAM</p>
                    <p className="mt-2 text-sm font-bold">
                      The Backend Pokémon
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="type-chip bg-[#e07b24]">JAVA</span>
                      <span className="type-chip bg-[#3f9d4f]">SPRING</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8">
                  <p className="text-[15px] leading-relaxed">
                    It builds REST APIs and event-driven microservices on
                    PostgreSQL. Known to hunt down N+1 queries and keep slow
                    work like notifications off the request path.
                  </p>
                  <dl className="mt-5 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="f-bebas text-base text-[var(--ink-3)]">
                        Evolution
                      </dt>
                      <dd className="font-bold">
                        Intern → Full-Stack Developer → ?
                      </dd>
                    </div>
                    <div>
                      <dt className="f-bebas text-base text-[var(--ink-3)]">
                        Hidden ability
                      </dt>
                      <dd className="font-bold">Stay Correct Under Load</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="f-bebas text-base text-[var(--ink-3)]">
                        Partner Pokémon
                      </dt>
                      <dd className="mt-1 flex items-center gap-3">
                        <svg
                          viewBox="0 0 100 100"
                          className="water-shuriken size-10 shrink-0"
                          aria-hidden
                        >
                          <path
                            d="M50 2C58 30 70 42 98 50C70 58 58 70 50 98C42 70 30 58 2 50C30 42 42 30 50 2Z"
                            fill="#5cc8f0"
                            stroke="var(--ink)"
                            strokeWidth="4"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="9"
                            fill="#0a4f9e"
                            stroke="var(--ink)"
                            strokeWidth="3"
                          />
                        </svg>
                        <span>
                          <b>Greninja</b> · Water / Dark · signature move{" "}
                          <b>Water Shuriken</b>. The ninja frog, naturally.
                        </span>
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="f-bebas text-base text-[var(--ink-3)]">
                        Moveset
                      </dt>
                      <dd className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {[
                          ["Spring Boot", "#2e7d3c"],
                          ["Kafka Stream", "#2b2b2b"],
                          ["Composite Index", "#3a6fc4"],
                          ["Docker Compose", "#156ea8"],
                        ].map(([m, c]) => (
                          <span
                            key={m}
                            className="rounded-md border-2 border-[var(--ink)] px-2 py-1.5 text-center text-[13px] font-bold text-white"
                            style={{ background: c }}
                          >
                            {m}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <p className="note mt-3 !text-white">
                ※ the Pokédex entry, Poké Balls and wild-recruiter battle are a
                nod to Pokémon
              </p>
            </div>
          </div>
        </section>

        {/* ================= CH2 VOYAGE ================= */}
        <section
          id="voyage"
          className="relative scroll-mt-16 overflow-hidden border-y-[3px] border-[var(--ink)] bg-[var(--paper-2)]"
        >
          <div
            aria-hidden
            className="seigaiha pointer-events-none absolute inset-x-0 bottom-0 h-40 [mask-image:linear-gradient(transparent,#000_70%)]"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
            <ChapterHead no="02" />
            <ol className="relative ml-4 sm:ml-8">
              <span
                aria-hidden
                className="absolute top-2 bottom-2 left-0 w-0 border-l-[3px] border-dashed border-[var(--ink)]"
              />
              {arcs.map((job, i) => (
                <li
                  key={job.company}
                  className="rise relative pb-14 pl-10 sm:pl-16"
                >
                  <span
                    aria-hidden
                    className={`absolute grid place-items-center rounded-full border-[3px] border-[var(--ink)] ${
                      job.current
                        ? "top-0 -left-[23px] size-11 bg-[var(--paper)] shadow-[0_0_0_5px_rgb(215_38_30/0.25)]"
                        : "top-1 -left-[15px] size-8 bg-[var(--paper)]"
                    }`}
                  >
                    {job.current && <StrawHat className="bob w-8" />}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="f-bebas text-xl text-[var(--ink-3)]">
                      Arc {i + 1} · {job.period}
                    </span>
                    <span
                      className={`stamp text-xl ${job.current ? "text-[var(--red)]" : "text-[var(--ink-2)]"}`}
                    >
                      {job.current ? "Ongoing" : "Complete"}
                    </span>
                  </div>
                  <h3 className="f-dela mt-3 text-4xl sm:text-6xl">
                    <span
                      className={job.current ? "gear5 sfx-hover relative" : ""}
                      data-icon={job.current ? "sun" : undefined}
                    >
                      {job.company}{" "}
                      <span className="text-[var(--red)]">arc</span>
                    </span>
                  </h3>
                  {job.current && (
                    <p className="note mt-1">
                      ※ hover the title to activate Gear 5
                    </p>
                  )}
                  <p className="mt-2 text-lg font-bold">{job.role}</p>
                  <div
                    className="panel sfx-hover mt-6 max-w-3xl p-5 pb-12 sm:p-7 sm:pb-12"
                    data-icon="strawhat"
                  >
                    <ul className="space-y-3">
                      {job.points.map((p, j) => (
                        <li
                          key={p}
                          className="flex gap-4 text-[15px] leading-relaxed"
                        >
                          <span className="f-bebas shrink-0 text-lg text-[var(--red)]">
                            Log {String(j + 1).padStart(2, "0")}
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li className="rise relative pl-10 sm:pl-16">
                <span
                  aria-hidden
                  className="absolute top-1 -left-[15px] grid size-8 place-items-center rounded-full border-[3px] border-dashed border-[var(--ink)] bg-[var(--paper-2)]"
                >
                  <TreasureX className="size-4" />
                </span>
                <span className="f-bebas text-xl text-[var(--ink-3)]">
                  Arc 3 · Uncharted · X marks the spot
                </span>
                <h3 className="f-dela mt-3 text-4xl sm:text-5xl">
                  Next island:{" "}
                  <a
                    href="#finale"
                    className="text-[var(--red)] underline decoration-[3px] underline-offset-8 hover:no-underline"
                  >
                    your team?
                  </a>
                </h3>

                <div
                  className="system mt-8 max-w-2xl"
                  role="group"
                  aria-label="System window"
                >
                  <p className="system-title">
                    <span aria-hidden>!</span> System
                  </p>
                  <ol className="mt-4 space-y-2.5 text-[14px] sm:text-[15px]">
                    {[
                      ["Quest complete", "B.Tech CSBS · CGPA 9.07"],
                      [
                        "Daily quest complete",
                        "Solve DSA problems · 500 / 500",
                      ],
                      ["Level up!", "Intern → Full-Stack Developer"],
                      ["Skill acquired", "Spring Cloud Gateway · Apache Kafka"],
                      ["Title earned", "The One Who Hunts N+1 Queries"],
                    ].map(([k, v]) => (
                      <li key={k} className="sys-line">
                        <span className="text-[#8fdcff]">[{k}]</span> {v}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 border-t border-[rgb(111_214_255/0.3)] pt-5">
                    <p className="system-title !text-base">New quest</p>
                    <p className="mt-2 text-lg font-bold text-white">
                      Join a backend engineering team.
                    </p>
                    <p className="mt-1 text-sm text-[#b9d3e6]">
                      Reward: systems that stay correct under load.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <a
                        href={`mailto:${profile.email}`}
                        className="system-btn"
                      >
                        Accept
                      </a>
                      <span className="text-xs text-[#9fb6c8]">
                        Declining is not an option.
                      </span>
                    </div>
                  </div>
                </div>
                <p className="note mt-3">
                  ※ the System window is a nod to Solo Leveling
                </p>
              </li>
            </ol>
            <Nod>
              the story arcs, straw hat, Gear 5 and treasure-map X are a nod to
              One Piece; the wave pattern is traditional Japanese seigaiha
            </Nod>
          </div>
        </section>

        {/* ================= CH3 BOUNTIES ================= */}
        <section
          id="bounties"
          className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 sm:px-6 sm:py-32"
        >
          <ChapterHead no="03" />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {posters.map(({ p, art, bounty, tilt }) => (
              <a
                key={p.name}
                href={p.live ?? p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="poster sfx-hover rise block px-6 pt-7 pb-6 text-center"
                data-icon="jollyroger"
                style={{ transform: `rotate(${tilt}deg)` }}
              >
                <span className="pin" aria-hidden />
                <p className="f-rye text-5xl leading-none">WANTED</p>
                <div className="mx-auto mt-5 aspect-[4/3] border-[3px] border-[var(--sepia)] bg-[#f3e9d2] p-4 shadow-[inset_0_0_24px_rgb(120_80_30/0.25)]">
                  {art}
                </div>
                <p className="f-fell mt-5 text-4xl leading-none">{p.name}</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="h-px flex-1 bg-[var(--sepia)]" />
                  <span className="f-bebas text-base tracking-[0.18em]">
                    {p.live ? "Live & on GitHub" : "Shipped on GitHub"}
                  </span>
                  <span className="h-px flex-1 bg-[var(--sepia)]" />
                </div>
                <p className="f-bebas mt-3 text-3xl">
                  <span className="mr-2 inline-block rounded-sm border-2 border-[var(--sepia)] px-1.5 leading-tight">
                    B
                  </span>
                  {bounty}
                </p>
                <p className="mt-3 text-[15px] leading-snug">{p.tagline}</p>
                <p className="f-bebas mt-4 text-base tracking-[0.14em] opacity-75">
                  {p.stack.slice(0, 4).join(" · ")}
                </p>
              </a>
            ))}
          </div>
          <Nod>wanted posters are a nod to One Piece</Nod>

          {/* mission scroll */}
          <div className="panel draw mt-16 overflow-hidden">
            <div className="relative flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-[var(--ink)] bg-[var(--ink)] px-5 py-4 text-[var(--paper)] sm:px-8">
              <div className="flex items-center gap-4">
                <span
                  className="f-dela grid size-14 shrink-0 -rotate-6 place-items-center rounded-full border-[3px] border-[var(--red)] text-3xl text-[var(--red)]"
                  aria-label="S-rank mission"
                >
                  S
                </span>
                <div>
                  <p className="f-bebas text-3xl leading-none tracking-wider">
                    S-rank mission · {featuredProject.name}
                  </p>
                  <p className="mt-1 text-sm text-[#cfc8b8]">
                    Client: every group of friends who has ever argued over who
                    owes whom.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="stamp text-xl text-[#ff5b4f]">Cleared</span>
                <a
                  href={featuredProject.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f-bebas text-xl text-[var(--gold)] hover:underline"
                >
                  Source ↗
                </a>
              </div>
            </div>

            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="f-bebas mb-3 text-lg text-[var(--ink-3)]">
                  Battle formation · the real architecture, with codenames
                </p>
                <p className="note mb-2 sm:hidden">swipe the diagram →</p>
                <ArchitectureDiagram anime />
              </div>
              <div className="lg:col-span-4">
                <p className="f-bebas mb-3 text-lg text-[var(--ink-3)]">
                  Mission objectives
                </p>
                <ol className="space-y-4">
                  {featuredProject.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-3 text-[15px] leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-1 grid size-5 shrink-0 place-items-center border-2 border-[var(--ink)] bg-[var(--red)] text-xs font-bold text-white"
                      >
                        ✓
                      </span>
                      {pt}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="border-t-[3px] border-[var(--ink)] bg-[var(--paper-2)] p-5 sm:p-8">
              <p className="f-bebas mb-4 text-lg text-[var(--ink-3)]">
                Squad roster · why each piece is there
              </p>
              <ul className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    code: "The Gatekeeper",
                    jp: "門番",
                    tech: "Spring Cloud Gateway",
                    why: "The only way in. Checks every JWT and rate-limits before anything reaches a service.",
                    nod: "gate guards, Bleach",
                  },
                  {
                    code: "Shadow Clones",
                    jp: "影分身",
                    tech: "Redis",
                    why: "Fast copies of balances and rate-limit counters, so hot reads never hit Postgres.",
                    nod: "Naruto",
                  },
                  {
                    code: "Kasugai Crows",
                    jp: "鎹鴉",
                    tech: "Kafka + notifications",
                    why: "Every balance change flies out as an event; notifications happen off the request path.",
                    nod: "Demon Slayer",
                  },
                  {
                    code: "Sealed Scrolls",
                    jp: "巻物",
                    tech: "PostgreSQL per service",
                    why: "Each service owns its own database. No one reads another squad's scroll directly.",
                    nod: "Naruto",
                  },
                ].map((m) => (
                  <li
                    key={m.code}
                    className="nscroll sfx-hover"
                    data-icon="sharingan"
                    tabIndex={0}
                  >
                    <span className="rod" aria-hidden />
                    <div className="paper">
                      <span className="seal" aria-hidden />
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="f-bebas text-2xl leading-none">
                          {m.code}
                        </p>
                        <p className="f-dela text-lg text-[var(--red)]">
                          {m.jp}
                        </p>
                      </div>
                      <p className="mt-2 inline-block bg-[var(--ink)] px-2 py-0.5 font-mono text-xs text-[var(--paper)]">
                        {m.tech}
                      </p>
                      <div className="unroll">
                        <div>
                          <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-2)]">
                            {m.why}
                          </p>
                          <p className="note mt-3 pb-8">※ {m.nod}</p>
                        </div>
                      </div>
                      <p className="unroll-hint" aria-hidden>
                        ↓ hover to unroll
                      </p>
                    </div>
                    <span className="rod" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t-[3px] border-[var(--ink)] p-5 sm:p-8">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-4">
                    <WingsOfFreedom className="wings w-16 shrink-0" />
                    <div>
                      <p className="f-bebas text-lg text-[var(--ink-3)]">
                        Defense in depth
                      </p>
                      <p className="f-dela text-3xl leading-none">
                        The three walls
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">
                    A request has to get through three walls before it touches
                    any data, and the innermost wall is on every service, not
                    just the gateway.
                  </p>
                </div>
                <ol className="walls lg:col-span-8">
                  {[
                    [
                      "Wall Maria",
                      "Outer",
                      "Redis-backed rate limiting at the gateway turns away floods before any work is done.",
                    ],
                    [
                      "Wall Rose",
                      "Middle",
                      "The gateway validates every JWT and routes only authenticated requests inward.",
                    ],
                    [
                      "Wall Sina",
                      "Inner",
                      "Each service re-validates the token itself and guards its own database.",
                    ],
                  ].map(([name, ring, body], i) => (
                    <li
                      key={name}
                      className="wall"
                      style={{ "--w": i } as CSSProperties}
                    >
                      <p className="f-bebas text-2xl leading-none">
                        {name}
                        <span className="ml-2 text-base text-[var(--ink-3)]">
                          · {ring}
                        </span>
                      </p>
                      <p className="mt-1 text-[14px] leading-relaxed text-[var(--ink-2)]">
                        {body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <Nod>
                the walls and the Wings of Freedom are a nod to Attack on Titan
              </Nod>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <KatanaDivider />
        </div>

        {/* ================= CH4 BANKAI ================= */}
        <section
          id="bankai"
          className="relative scroll-mt-16 overflow-hidden border-y-[3px] border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
        >
          <div
            className="speedlines-light pointer-events-none absolute -inset-1/2 opacity-[0.07]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
            <ChapterHead no="04" dark />
            <div className="rise mb-16 grid items-end gap-8 lg:grid-cols-12">
              <p className="f-dela bankai-glow text-[clamp(4rem,14vw,11rem)] leading-[0.9] lg:col-span-7">
                バンカイ
              </p>
              <div className="lg:col-span-5">
                <Zangetsu className="zangetsu mb-6 w-full max-w-md" />
                <p className="text-lg leading-relaxed text-[#cfc8b8]">
                  Eight divisions, eight zanpakutō, one per skill group. Each
                  has its release command and a reiatsu meter showing how many
                  tools it holds. Hover a card for Getsuga Tenshō.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((g) => {
                const book = grimoireFor[g.group] ?? {
                  leaves: 3,
                  cover: "#1b1916",
                  note: "three-leaf",
                };
                const [div, command] = releaseFor[g.group] ?? ["九", "Awaken"];
                return (
                  <div
                    key={g.group}
                    className="release mask-hover rise flex flex-col p-6"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="division f-bebas text-sm tracking-[0.18em]">
                        <span className="f-dela mr-1 text-base text-[#ff5b4f]">
                          {div}
                        </span>
                        番隊 · Division{" "}
                        {Number("一二三四五六七八".indexOf(div)) + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Grimoire
                        leaves={book.leaves}
                        cover={book.cover}
                        className="grimoire w-12 shrink-0"
                      />
                      <div>
                        <h3 className="f-bebas text-3xl leading-none tracking-wider">
                          {g.group}
                        </h3>
                        <p className="mt-1 text-xs text-[#9c9584]">
                          Grimoire · {book.note}
                        </p>
                      </div>
                    </div>
                    <p className="f-fell mt-4 text-lg text-[#e9e3d4] italic">
                      「{command}」
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {g.items.map((it) => (
                        <li
                          key={it}
                          className="border border-[rgb(244_239_228/0.16)] px-2 py-0.5 text-[13px] text-[#e2dccd]"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-5">
                      <div className="f-bebas flex justify-between text-xs tracking-[0.18em] text-[#a39c8c]">
                        <span>Reiatsu</span>
                        <span>{g.items.length} tools</span>
                      </div>
                      <div className="mt-1 h-1.5 bg-[rgb(244_239_228/0.12)]">
                        <div
                          className="reiatsu h-full"
                          style={{
                            width: `${(g.items.length / maxSkills) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Nod dark>
              bankai, Zangetsu, Getsuga Tenshō, the Gotei 13 divisions, release
              commands, reiatsu and the hollow mask are nods to Bleach; the
              grimoires (three-, four- and five-leaf) are a nod to Black Clover
            </Nod>

            {/* domain expansion */}
            <div className="domain rise relative mt-20 overflow-hidden border border-[rgb(244_239_228/0.18)] px-5 py-16 sm:px-10 sm:py-24">
              <div
                className="stars pointer-events-none absolute inset-0"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                {[0, 1.2, 2.4, 3.6].map((d) => (
                  <span
                    key={d}
                    className="domain-ring size-[30rem]"
                    style={{ animationDelay: `${d}s` }}
                  />
                ))}
              </div>
              <div className="relative text-center">
                <div className="mb-4 flex items-end justify-center gap-4 sm:gap-8">
                  <ChibiGojo className="gojo w-24 sm:w-28" />
                  <span
                    className="f-dela pb-8 text-2xl text-[#9fb4ff] sm:text-3xl"
                    aria-hidden
                  >
                    VS
                  </span>
                  <ChibiSukuna className="sukuna w-24 sm:w-28" />
                </div>
                <p className="f-bebas text-lg tracking-[0.3em] text-[#9fb4ff]">
                  Barrier deployed
                </p>
                <p className="f-dela bankai-glow mt-3 text-5xl text-[var(--red)] sm:text-7xl">
                  領域展開
                </p>
                <p className="f-bebas mt-3 text-4xl tracking-wider sm:text-6xl">
                  Domain expansion: distributed systems
                </p>
                <p className="mt-3 text-base text-[#b8c6ff] italic">
                  &ldquo;Throughout heaven and earth, I alone am the honored
                  one.&rdquo;
                </p>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#cfc8b8]">
                  A domain&apos;s technique is guaranteed to hit anyone inside
                  it. Inside SplitExpense, these six things are guaranteed for
                  every request:
                </p>
              </div>
              <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  [
                    "必中",
                    "Every request is checked",
                    "Spring Cloud Gateway validates the JWT before anything reaches a service.",
                  ],
                  [
                    "制限",
                    "No one floods the domain",
                    "Redis-backed rate limits per user, or per IP before login.",
                  ],
                  [
                    "一撃",
                    "Retries never double-charge",
                    "Expense writes carry an Idempotency-Key, so a replay returns the first result.",
                  ],
                  [
                    "均衡",
                    "Splits always add up",
                    "Shares are rounded down, then the remainder is handed out so they sum to the total exactly.",
                  ],
                  [
                    "遠隔",
                    "Nobody waits on notifications",
                    "Balance changes go out as Kafka events to a separate consumer.",
                  ],
                  [
                    "結界",
                    "Every squad is sealed off",
                    "Each service owns its own PostgreSQL database; no shared tables.",
                  ],
                ].map(([k, title, body], n) => (
                  <li
                    key={title}
                    data-icon="hollowpurple"
                    className="sure-hit dismantle sfx-hover relative overflow-hidden border border-[rgb(159_180_255/0.25)] bg-[rgb(10_10_20/0.6)] p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="f-dela text-2xl text-[#9fb4ff]"
                        aria-hidden
                      >
                        {k}
                      </span>
                      <span className="f-bebas text-sm tracking-[0.2em] text-[#a39c8c]">
                        Sure-hit 0{n + 1}
                      </span>
                    </div>
                    <p className="f-bebas mt-2 text-2xl leading-tight tracking-wide">
                      {title}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#cfc8b8]">
                      {body}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="black-flash relative mt-10 grid items-center gap-8 border border-[rgb(255_42_42/0.35)] bg-[rgb(0_0_0/0.55)] p-6 sm:p-8 md:grid-cols-12">
                <div className="flex items-center gap-5 md:col-span-6">
                  <BlackFlash className="w-16 shrink-0 sm:w-20" />
                  <div>
                    <p className="f-dela text-3xl leading-none text-[#ff5b4f]">
                      黒閃
                    </p>
                    <p className="f-bebas mt-1 text-3xl tracking-wide">
                      Black Flash
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#cfc8b8]">
                      Yuji&apos;s Black Flash lands with 2.5× the force of a
                      normal hit. These are the hits that landed hardest.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-6">
                  {[
                    [
                      "30%",
                      "API latency cut",
                      "Vartagram · PostgreSQL indexes, N+1 removed",
                    ],
                    [
                      "28%",
                      "Initial bundle cut",
                      "Fitreak · code splitting, image optimization",
                    ],
                  ].map(([v, l, d]) => (
                    <div key={l} className="border-l-4 border-[#ff2a2a] pl-4">
                      <p className="f-dela text-5xl leading-none text-white [text-shadow:0_0_18px_rgb(255_42_42/0.7)]">
                        {v}
                      </p>
                      <p className="mt-2 text-sm font-bold">{l}</p>
                      <p className="mt-1 text-xs text-[#a39c8c]">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative text-center">
                <Nod dark>
                  domain expansion, the Unlimited Void starfield, little Gojo
                  and Sukuna (hover to lift the blindfold and open his second
                  eyes), Hollow Purple, Sukuna&apos;s Dismantle slashes (hover a
                  card) and Yuji&apos;s Black Flash are nods to Jujutsu Kaisen
                </Nod>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CH5 POWER ================= */}
        <section
          id="power"
          className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 sm:px-6 sm:py-32"
        >
          <ChapterHead no="05" />
          <PowerLevels />
          <Nod>the scouter and the 1–4 star orbs are a nod to Dragon Ball</Nod>

          <div className="mt-16 grid gap-5 lg:grid-cols-12">
            <div className="panel draw p-6 sm:p-8 lg:col-span-7">
              <div className="flex items-baseline justify-between">
                <p className="f-bebas text-3xl">Nen type</p>
                <p className="f-dela text-2xl text-[var(--red)]">念</p>
              </div>
              <p className="mt-1 text-[15px] text-[var(--ink-2)]">
                Result of the water divination: <b>Enhancer</b>. Strongest at
                the core — Java and Spring — with range into data and messaging.
              </p>
              <NenHexagon
                stats={nen}
                className="mx-auto mt-2 w-full max-w-md"
              />
              <p className="note">
                ※ self-assessed; the Nen chart is a nod to Hunter x Hunter
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="hunter-license draw p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="f-bebas text-sm tracking-[0.3em] text-[#c9b27a]">
                      Hunter Association
                    </p>
                    <p className="f-dela mt-1 text-4xl leading-none">HUNTER</p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-full border-2 border-[#c9b27a] text-[#c9b27a]">
                    ★
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
                  <span className="text-[#a39c8c]">Name</span>
                  <span className="font-bold">{profile.name}</span>
                  <span className="text-[#a39c8c]">License No.</span>
                  <span className="font-mono">2026-0907</span>
                  <span className="text-[#a39c8c]">Rank</span>
                  <span className="font-bold">★ Single-star Hunter</span>
                  <span className="text-[#a39c8c]">Awarded for</span>
                  <span>
                    1st place, Smart India Hackathon 2024 (college round)
                  </span>
                  <span className="text-[#a39c8c]">Specialty</span>
                  <span>Backend Hunter · bugs, bottlenecks, N+1 queries</span>
                </div>
                <div
                  className="barcode mt-6 h-8 w-40 opacity-80 [filter:invert(1)]"
                  aria-hidden
                />
              </div>
              <p className="note mt-3">
                ※ the Hunter License and star ranks are a nod to Hunter x Hunter
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <div
              className="panel draw sfx-hover p-7 sm:p-9"
              data-icon="dragonball"
            >
              <div className="flex items-baseline justify-between">
                <p className="f-bebas text-3xl">Tournament arc</p>
                <p className="f-dela text-2xl text-[var(--red)]">大会</p>
              </div>
              <ul className="mt-6 space-y-4">
                {achievements.map((a, i) => (
                  <li
                    key={a}
                    className="flex items-start gap-4 text-[15px] leading-relaxed"
                  >
                    {i < 2 ? (
                      <span className="stamp shrink-0 text-lg text-[var(--red)]">
                        1st
                      </span>
                    ) : (
                      <span className="f-bebas w-12 shrink-0 text-center text-lg text-[var(--ink-3)]">
                        ✦
                      </span>
                    )}
                    <span>
                      {a}
                      {a.includes("Zero Errors Zone") && (
                        <span className="ml-2 inline-flex translate-y-[-1px] items-center gap-1.5 bg-[var(--ink)] px-2 py-0.5 align-middle text-xs font-bold tracking-wider text-[var(--paper)]">
                          <span className="text-sm font-bold text-[#ff5b4f]">
                            滅
                          </span>
                          BUG SLAYER CORPS
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="panel draw sfx-hover p-7 sm:p-9"
              data-icon="hanafuda"
            >
              <div
                aria-hidden
                className="ichimatsu -mx-7 -mt-7 mb-7 h-5 border-b-[3px] border-[var(--ink)] sm:-mx-9 sm:-mt-9"
              />
              <div className="flex items-baseline justify-between">
                <p className="f-bebas text-3xl">Training arc</p>
                <p className="f-dela flex items-center gap-3 text-2xl text-[var(--red)]">
                  <Hanafuda className="w-6" />
                  修行
                </p>
              </div>
              <ol className="mt-6 space-y-6">
                {education.map((e) => (
                  <li
                    key={e.school}
                    className="border-l-[3px] border-[var(--ink)] pl-5"
                  >
                    <p className="f-bebas text-lg text-[var(--ink-3)]">
                      {e.period}
                    </p>
                    <p className="text-lg font-bold">{e.school}</p>
                    <p className="text-[15px] text-[var(--fg-muted)]">
                      {e.degree}
                    </p>
                    <p className="caption mt-3">{e.detail}</p>
                  </li>
                ))}
              </ol>
              <Nod>
                the checkered band, hanafuda earring and 滅 Bug Slayer badge are
                nods to Demon Slayer
              </Nod>
            </div>
          </div>

          {/* demon slayer corps rank */}
          <div className="panel draw mt-5 overflow-hidden">
            <div
              aria-hidden
              className="ichimatsu h-6 border-b-[3px] border-[var(--ink)]"
            />
            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-4">
                  <Hanafuda className="w-10 shrink-0" />
                  <div>
                    <p className="f-dela text-3xl leading-none text-[var(--red)]">
                      鬼殺隊
                    </p>
                    <p className="f-bebas mt-1 text-2xl leading-none">
                      Demon Slayer Corps rank
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">
                  The corps has ten ranks before Hashira. The demons here are
                  bugs, slow queries and flaky deploys.
                </p>
              </div>
              <div className="lg:col-span-8">
                <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
                  {[
                    ["癸", "Mizunoto"],
                    ["壬", "Mizunoe"],
                    ["辛", "Kanoto"],
                    ["庚", "Kanoe"],
                    ["己", "Tsuchinoto"],
                    ["戊", "Tsuchinoe"],
                    ["丁", "Hinoto"],
                    ["丙", "Hinoe"],
                    ["乙", "Kinoto"],
                    ["甲", "Kinoe"],
                    ["柱", "Hashira"],
                  ].map(([k, name], idx) => {
                    const state =
                      idx < 7
                        ? "done"
                        : idx === 7
                          ? "now"
                          : idx === 10
                            ? "goal"
                            : "next";
                    return (
                      <li
                        key={name}
                        title={name}
                        className={`relative grid aspect-square place-items-center border-2 border-[var(--ink)] text-lg font-bold ${
                          state === "done"
                            ? "bg-[#2d7a58] text-white"
                            : state === "now"
                              ? "bg-[var(--red)] text-white shadow-[3px_3px_0_var(--ink)]"
                              : state === "goal"
                                ? "border-dashed bg-[var(--gold)]"
                                : "bg-[var(--bg-raised)] text-[var(--ink-3)]"
                        }`}
                      >
                        <span aria-hidden>{k}</span>
                        <span className="sr-only">
                          {name}
                          {state === "now"
                            ? " (current rank)"
                            : state === "goal"
                              ? " (goal)"
                              : ""}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                  <p>
                    <span className="mr-2 inline-block size-3 border-2 border-[var(--ink)] bg-[#2d7a58] align-middle" />
                    <b>Cleared:</b> 500+ DSA problems, Vartagram internship
                  </p>
                  <p>
                    <span className="mr-2 inline-block size-3 border-2 border-[var(--ink)] bg-[var(--red)] align-middle" />
                    <b>Now · Hinoe:</b> Full-Stack Developer at Fitreak
                  </p>
                  <p>
                    <span className="mr-2 inline-block size-3 border-2 border-dashed border-[var(--ink)] bg-[var(--gold)] align-middle" />
                    <b>Goal · Hashira:</b> senior backend engineer
                  </p>
                </div>
                <div className="mt-6">
                  <div className="space-y-3">
                    <Katana variant="tanjiro" className="w-full max-w-md" />
                    <Katana variant="inosuke" className="w-full max-w-md" />
                  </div>
                </div>
              </div>
            </div>
            <p className="note px-6 pb-4 sm:px-9">
              ※ corps ranks, the checkered haori, hanafuda earring,
              Tanjiro&apos;s black Sun Breathing blade and Inosuke&apos;s jagged
              blade are a nod to Demon Slayer
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <KatanaDivider variant="tanjiro" />
        </div>

        {/* ================= FINALE ================= */}
        <section
          id="finale"
          className="relative scroll-mt-16 overflow-hidden border-t-[3px] border-[var(--ink)]"
        >
          <div
            className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent_35%,#000_85%)]"
            aria-hidden
          >
            <div className="speedlines absolute -inset-1/2 opacity-[0.25]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 sm:pt-32">
            <TransmutationCircle className="transmute pointer-events-none absolute top-20 right-0 hidden w-[26rem] opacity-25 lg:block" />
            <div className="rise flex flex-wrap items-end gap-x-6 gap-y-3">
              <span className="f-bebas bg-[var(--red)] px-3 pt-1 text-2xl text-white">
                最終話 · Final chapter
              </span>
            </div>
            <h2 className="f-dela rise mt-8 max-w-5xl text-[clamp(2.8rem,8vw,7rem)] leading-[0.95]">
              Your team could be the{" "}
              <span className="text-[var(--red)]">next arc.</span>
            </h2>
            <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)]">
              I&apos;m looking for backend roles in Java, Spring Boot and
              distributed systems. Email is the fastest way to reach me:{" "}
              <a
                href={`mailto:${profile.email}`}
                className="font-bold text-[var(--ink)] underline decoration-[var(--red)] decoration-[3px] underline-offset-4"
              >
                {profile.email}
              </a>
            </p>
            <blockquote className="rise mt-8 max-w-xl border-l-4 border-[var(--red)] pl-5">
              <p className="f-bebas text-sm tracking-[0.25em] text-[var(--ink-3)]">
                等価交換 · Equivalent exchange
              </p>
              <p className="mt-1 text-lg font-bold">
                You bring the hard backend problems. I bring systems that stay
                correct under load.
              </p>
              <p className="note mt-2">
                ※ equivalent exchange and the transmutation circle are a nod to
                Fullmetal Alchemist
              </p>
            </blockquote>

            <div className="battle rise relative mt-12 max-w-3xl p-5 sm:p-7">
              <PokeBall className="pokeball absolute -top-6 -right-4 w-12 rotate-12" />
              <div className="grid gap-6 sm:grid-cols-[1.3fr_1fr] sm:items-center">
                <p className="f-pixel text-[13px] leading-[2] sm:text-sm">
                  A wild RECRUITER appeared!
                  <br />
                  What will you do?{" "}
                  <span className="blink-arrow text-[var(--red)]">▼</span>
                </p>
                <nav
                  aria-label="Contact options"
                  className="f-pixel grid grid-cols-2 gap-x-4 gap-y-4 border-t-4 border-[var(--ink)] pt-5 text-[12px] sm:border-t-0 sm:border-l-4 sm:pt-0 sm:pl-6"
                >
                  <a
                    className="battle-opt hover:text-[var(--red)]"
                    href={`mailto:${profile.email}`}
                  >
                    EMAIL
                  </a>
                  <a
                    className="battle-opt hover:text-[var(--red)]"
                    href={profile.resume}
                    target="_blank"
                    rel="noopener"
                  >
                    RESUME
                  </a>
                  <a
                    className="battle-opt hover:text-[var(--red)]"
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LINKEDIN
                  </a>
                  <a
                    className="battle-opt hover:text-[var(--red)]"
                    href="#cover"
                  >
                    RUN
                  </a>
                </nav>
              </div>
            </div>

            <div className="relative mt-14">
              <div className="tbc-wrap inline-block">
                <a
                  href={`mailto:${profile.email}`}
                  className="tbc text-3xl sm:text-4xl"
                >
                  To be continued
                  <span aria-hidden className="text-2xl">
                    ▶
                  </span>
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-6">
                {[
                  ["LinkedIn", profile.links.linkedin],
                  ["GitHub", profile.links.github],
                  ["Résumé", profile.resume],
                ].map(([l, h]) => (
                  <a
                    key={l}
                    href={h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="f-bebas text-2xl underline decoration-2 underline-offset-4 hover:text-[var(--red)]"
                  >
                    {l} ↗
                  </a>
                ))}
              </div>
              <Nod>the arrow is a nod to JoJo&apos;s Bizarre Adventure</Nod>
            </div>
          </div>
          <footer className="relative border-t-[3px] border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6">
              <span className="f-bebas text-xl tracking-wider">
                <span className="f-dela mr-2 text-2xl text-[var(--red)]">
                  完
                </span>{" "}
                End of volume 1
              </span>
              <span className="note text-[#8a8374]">
                © {new Date().getFullYear()} {profile.name} · original artwork,
                no characters were harmed
              </span>
              <span className="note basis-full text-[#a39c8c]">
                ※ This volume hides secret techniques. Open &ldquo;How to
                read&rdquo; (top right) to find them all.
              </span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
