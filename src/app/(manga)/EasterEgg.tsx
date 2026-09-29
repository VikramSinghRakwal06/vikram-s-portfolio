"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  ChibiMadara,
  CrossedSwords,
  Gunbai,
  HollowPurple,
  NimbusPole,
  PikachuTail,
  ShadowDaggers,
  SmashFist,
  SukunaFinger,
  WaterShuriken,
} from "./Figures";
import { Hanafuda, StrawHat, Zangetsu } from "./Motifs";

type Effect =
  | "slash"
  | "rings"
  | "bolts"
  | "system"
  | "bounce"
  | "beam"
  | "void"
  | "water"
  | "zoro"
  | "moon"
  | "shrine"
  | "sun";

type Technique = {
  words: string[];
  theme: string;
  effect: Effect;
  kicker: string;
  title: string;
  sub: string;
  figure: ComponentType<{ className?: string }>;
  /** Image(s) in public/characters/<face>.(png|jpg|webp); shown when present. */
  face: string | string[];
  /** Credit shown under a supplied portrait by another artist. */
  faceCredit?: string;
  /** Extra portraits placed around the screen (desktop) or in a row (phone). */
  allies?: { key: string; name: string }[];
};

export const techniques: Technique[] = [
  {
    words: ["ryoikitenkai", "domainexpansion", "malevolentshrine"],
    theme: "shrine",
    effect: "shrine",
    kicker: "Domain expansion",
    title: "MALEVOLENT SHRINE",
    sub: "Dismantle and Cleave. Every bug in range, cut to pieces.",
    figure: SukunaFinger,
    face: "sukuna",
  },
  {
    words: ["unlimitedvoid", "muryokusho"],
    theme: "void",
    effect: "void",
    kicker: "Domain expansion",
    title: "UNLIMITED VOID",
    sub: "Infinite information. Every request, checked at once.",
    figure: HollowPurple,
    face: "gojo",
  },
  {
    words: ["tsukuyomi", "infinitetsukuyomi"],
    theme: "tsukuyomi",
    effect: "moon",
    kicker: "Eye of the Moon plan",
    title: "INFINITE TSUKUYOMI",
    sub: "Everyone's dream, cast at once: a backend that never goes down.",
    figure: Gunbai,
    face: "madara",
    allies: [
      { key: "naruto", name: "Naruto" },
      { key: "sasuke", name: "Sasuke" },
      { key: "guy", name: "Might Guy" },
      { key: "sakura", name: "Sakura" },
      { key: "kakashi", name: "Kakashi" },
    ],
  },
  {
    words: ["plusultra"],
    theme: "ultra",
    effect: "bolts",
    kicker: "One For All · 100%",
    title: "PLUS ULTRA!",
    sub: "Go beyond.",
    figure: SmashFist,
    face: "deku",
    allies: [
      { key: "bakugo", name: "Bakugo" },
      { key: "allmight", name: "All Might" },
    ],
  },
  {
    words: ["arise"],
    theme: "system",
    effect: "system",
    kicker: "[ System ] Shadow extraction",
    title: "ARISE",
    sub: "The shadow army answers. Next quest: join a backend team.",
    figure: ShadowDaggers,
    face: "jinwoo",
  },
  {
    words: ["gomugomu", "gearfive", "gear5"],
    theme: "gear5",
    effect: "bounce",
    kicker: "Drums of liberation",
    title: "GEAR 5",
    sub: "Don-dotto-tto. The most ridiculous power, used for backend work.",
    figure: StrawHat,
    face: "luffy",
  },
  {
    words: ["bankai"],
    theme: "bankai",
    effect: "slash",
    kicker: "Full release",
    title: "BANKAI",
    sub: "TENSA ZANGETSU",
    figure: Zangetsu,
    face: "ichigo",
    faceCredit: "Ichigo art: Geisy Tattoo",
  },
  {
    words: ["kamehameha"],
    theme: "kame",
    effect: "beam",
    kicker: "Power level: over 9000",
    title: "KAMEHAMEHA",
    sub: "Charged up and fired straight at the bottleneck.",
    figure: NimbusPole,
    face: "kid-goku",
  },
  {
    words: ["pikachu"],
    theme: "pika",
    effect: "bolts",
    kicker: "Pikachu used Thunderbolt!",
    title: "SUPER EFFECTIVE!",
    sub: "The wild RECRUITER is paralysed. It may send an email.",
    figure: PikachuTail,
    face: "pikachu",
  },
  {
    words: ["greninja", "watershuriken"],
    theme: "water",
    effect: "water",
    kicker: "Greninja used Water Shuriken!",
    title: "WATER SHURIKEN",
    sub: "A critical hit. Ninja frog, ninja portfolio.",
    figure: WaterShuriken,
    face: "greninja",
  },
  {
    words: ["santoryu", "onigiri"],
    theme: "zoro",
    effect: "zoro",
    kicker: "Santoryu",
    title: "ONIGIRI",
    sub: "Three swords, three cuts. (He still got lost on the way here.)",
    figure: CrossedSwords,
    face: "zoro",
  },
  {
    words: ["sunbreathing", "hinokami", "hinokamikagura"],
    theme: "sun",
    effect: "sun",
    kicker: "Hinokami Kagura · Thunderclap · Beast Breathing",
    title: "SUN BREATHING",
    sub: "Tanjiro, Zenitsu and Inosuke, all at once. Dance, first form.",
    figure: Hanafuda,
    face: ["tanjiro", "zenitsu", "inosuke"],
    faceCredit: "© Koyoharu Gotouge / Shueisha, Aniplex, ufotable",
  },
];

// Forgiving romanization: "ou" reads as "o" and "uu" as "u" (santouryu, ryouikitenkai…).
const normalize = (s: string) => s.replace(/ou/g, "o").replace(/uu/g, "u");

const allWords = techniques.flatMap((t) =>
  t.words.map((w) => [normalize(w), t] as const),
);

// Size the title so its longest word fits the viewport.
function titleSize(title: string) {
  const longest = Math.max(...title.split(" ").map((w) => w.length));
  return `min(${(88 / longest).toFixed(1)}vw, 10rem)`;
}

function Decoration({ effect }: { effect: Effect }) {
  switch (effect) {
    case "slash":
      return (
        <>
          <span className="egg-reiatsu" />
          <span className="egg-slash" />
          <span className="egg-slash egg-slash-2" />
          <svg className="egg-getsuga" viewBox="0 0 200 400">
            <path d="M40 0C150 60 190 140 190 200C190 260 150 340 40 400C110 320 130 260 130 200C130 140 110 80 40 0Z" />
          </svg>
          <span className="egg-flash" />
          <span className="egg-vignette" />
        </>
      );
    case "rings":
    case "void":
      return (
        <>
          {effect === "void" && <span className="egg-stars" />}
          {[0, 0.25, 0.5, 0.75].map((d) => (
            <span
              key={d}
              className="egg-ring"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </>
      );
    case "bolts":
      return (
        <svg
          className="egg-bolts"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M8 0L16 22L10 24L22 48L14 50L30 100" />
          <path d="M92 0L82 26L90 28L76 54L84 56L70 100" />
          <path d="M40 0L46 14L42 16L50 30" />
          <path d="M62 100L56 84L60 82L52 66" />
        </svg>
      );
    case "beam":
      return (
        <>
          <span className="egg-beam" />
          <span className="egg-beam-core" />
        </>
      );
    case "system":
      return (
        <>
          <span className="egg-smoke" />
          <svg
            className="egg-army"
            viewBox="0 0 1000 300"
            preserveAspectRatio="xMidYMax slice"
          >
            {[
              [60, 1.0],
              [170, 1.25],
              [290, 0.95],
              [400, 1.4],
              [500, 1.6],
              [600, 1.4],
              [710, 0.95],
              [830, 1.25],
              [940, 1.0],
            ].map(([x, sc], i) => (
              <g
                key={x}
                className="soldier"
                style={{ animationDelay: `${0.15 + Math.abs(4 - i) * 0.12}s` }}
                transform={`translate(${x} 300) scale(${sc})`}
              >
                <path
                  d="M-34 0V-70Q-34-96 -18-104L-24-128L-8-114Q0-120 8-114L24-128L18-104Q34-96 34-70V0Z"
                  fill="#07060d"
                />
                <path
                  d="M-46 0L-40-60Q-38-72 -28-74L-34 0ZM46 0L40-60Q38-72 28-74L34 0Z"
                  fill="#07060d"
                />
                <path
                  d="M-14-88h8M6-88h8"
                  stroke="#8fd6ff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>
          <span className="egg-frame" />
        </>
      );
    case "sun":
      return (
        <>
          <svg className="egg-sunring" viewBox="0 0 200 200">
            <defs>
              <radialGradient id="egg-flame" r="60%">
                <stop offset="0.55" stopColor="#ffd35c" />
                <stop offset="0.8" stopColor="#ff7a1a" />
                <stop offset="1" stopColor="#c4211a" />
              </radialGradient>
            </defs>
            {Array.from({ length: 16 }, (_, i) => (
              <path
                key={i}
                transform={`rotate(${i * 22.5} 100 100)`}
                d="M100 8C112 30 108 44 100 56C92 44 88 30 100 8Z"
                fill="url(#egg-flame)"
              />
            ))}
            <circle
              cx="100"
              cy="100"
              r="44"
              fill="none"
              stroke="#ffb347"
              strokeWidth="6"
              opacity="0.8"
            />
          </svg>
          <svg
            className="egg-thunder"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M70 0L52 38L64 40L38 100L48 56L36 54Z" />
          </svg>
          <span className="egg-fang egg-fang-0" />
          <span className="egg-fang egg-fang-1" />
        </>
      );
    case "shrine":
      return (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className="egg-dismantle"
              style={{
                top: `${8 + ((i * 37) % 84)}%`,
                rotate: `${-35 + ((i * 53) % 70)}deg`,
                animationDelay: `${0.1 + i * 0.12}s`,
              }}
            />
          ))}
          <svg
            className="egg-shrine"
            viewBox="0 0 400 160"
            preserveAspectRatio="xMidYMax meet"
          >
            <path d="M30 62L10 40L60 56H340L390 40L370 62L336 44H64Z" />
            <path d="M88 62V160M312 62V160M58 100H342L322 86H78Z" />
            <path d="M140 106H260V160H140Z" />
            <path
              className="shrine-mouth"
              d="M150 116H250V150Q200 170 150 150Z"
            />
            <path
              className="shrine-teeth"
              d="M150 116L160 130L170 116L180 130L190 116L200 130L210 116L220 130L230 116L240 130L250 116ZM150 150L160 138L170 152L180 138L190 154L200 138L210 154L220 138L230 152L240 138L250 150Z"
            />
            <path d="M190 72H210V86H190Z" />
          </svg>
        </>
      );
    case "moon":
      return (
        <>
          <span className="egg-wash" />
          <svg className="egg-moon" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="egg-moon-fill" cx="45%" cy="40%" r="60%">
                <stop offset="0" stopColor="#ff6a5a" />
                <stop offset="0.7" stopColor="#c4211a" />
                <stop offset="1" stopColor="#6e0c08" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#egg-moon-fill)" />
            <g fill="none" stroke="#1a0505" strokeWidth="1.2" opacity="0.85">
              {[10, 19, 28, 37].map((r) => (
                <circle key={r} cx="50" cy="50" r={r} />
              ))}
            </g>
            <g className="egg-moon-tomoe">
              {[10, 19, 28].flatMap((r, ring) =>
                [0, 120, 240].map((a) => (
                  <g
                    key={`${r}-${a}`}
                    transform={`rotate(${a + ring * 40} 50 50) translate(50 ${50 - r})`}
                  >
                    <circle r="2.4" fill="#1a0505" />
                    <path
                      d="M2-1.2C1.7-4.3-1.6-5.9-5-5.4C-2.3-4.6-.9-3.2-1-2Z"
                      fill="#1a0505"
                    />
                  </g>
                )),
              )}
            </g>
            <circle cx="50" cy="50" r="3.2" fill="#1a0505" />
          </svg>
          <span className="egg-clouds" />
        </>
      );
    case "zoro":
      return (
        <>
          <span className="egg-cut egg-cut-0" />
          <span className="egg-cut egg-cut-1" />
          <span className="egg-cut egg-cut-2" />
        </>
      );
    case "water":
      return (
        <>
          <svg
            className="egg-wave"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
          >
            <path
              d="M0 180Q150 90 300 170T600 150T900 170T1200 140V300H0Z"
              fill="rgb(40 140 220 / 0.55)"
            />
            <path
              d="M0 220Q200 150 400 210T800 200T1200 190V300H0Z"
              fill="rgb(20 90 180 / 0.8)"
            />
            <path
              d="M0 180Q150 90 300 170T600 150T900 170T1200 140"
              fill="none"
              stroke="#e8fbff"
              strokeWidth="4"
            />
          </svg>
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="egg-drop"
              style={{
                left: `${(i * 71) % 100}%`,
                animationDelay: `${0.3 + (i % 5) * 0.12}s`,
                scale: `${0.6 + (i % 3) * 0.3}`,
              }}
            />
          ))}
          <WaterShuriken className="egg-throw" />
        </>
      );
    case "bounce":
      return null;
  }
}

// Faces without an image file: only Madara has a drawn portrait.
const drawnFaces: Record<string, ComponentType<{ className?: string }>> = {
  madara: ChibiMadara,
};

export function EasterEgg({ faces = {} }: { faces?: Record<string, string> }) {
  const [active, setActive] = useState<Technique | null>(null);
  const buffer = useRef("");
  const taps = useRef<number[]>([]);

  useEffect(() => {
    const fire = (t: Technique) => {
      setActive(t);
      document.documentElement.classList.add("egg-shake");
      setTimeout(
        () => document.documentElement.classList.remove("egg-shake"),
        600,
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setActive(null);
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]") || e.key.length !== 1)
        return;
      if (!/[a-z0-9]/i.test(e.key)) return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-16);
      const typed = normalize(buffer.current);
      const hit = allWords.find(([w]) => typed.endsWith(w));
      if (hit) {
        buffer.current = "";
        fire(hit[1]);
      }
    };

    // No keyboard needed: five quick taps on the header logo fire a random technique.
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-egg-logo]")) return;
      const now = Date.now();
      taps.current = [...taps.current.filter((x) => now - x < 2000), now];
      if (taps.current.length >= 5) {
        taps.current = [];
        e.preventDefault();
        fire(techniques[Math.floor(Math.random() * techniques.length)]);
      }
    };

    // The manual's technique buttons dispatch this event.
    const onCast = (e: Event) => {
      const t = techniques.find(
        (x) => x.words[0] === (e as CustomEvent<string>).detail,
      );
      if (t) fire(t);
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("cast-technique", onCast);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("cast-technique", onCast);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setActive(null), 3000);
    return () => clearTimeout(id);
  }, [active]);

  const portraits = active ? [active.face].flat() : [];

  return (
    <div aria-live="polite">
      {active && (
        <div
          className={`egg egg-${active.theme}`}
          onClick={() => setActive(null)}
        >
          <div className="egg-deco" aria-hidden>
            <Decoration effect={active.effect} />
          </div>
          {active.allies?.some((a) => faces[a.key]) && (
            <ul className="egg-allies" aria-label="Allies">
              {active.allies
                .filter((a) => faces[a.key])
                .map((a, i) => (
                  <li
                    key={a.key}
                    className={`egg-ally egg-ally-${i}`}
                    style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- user-supplied portraits */}
                    <img src={faces[a.key]} alt="" />
                    <span>{a.name}</span>
                  </li>
                ))}
            </ul>
          )}
          <div className="egg-text">
            <div className="egg-figures">
              {portraits.map((key) =>
                faces[key] ? (
                  // eslint-disable-next-line @next/next/no-img-element -- user-supplied portraits of unknown size
                  <img key={key} src={faces[key]} alt="" className="egg-face" />
                ) : (
                  drawnFaces[key] &&
                  (() => {
                    const Drawn = drawnFaces[key];
                    return (
                      <Drawn key={key} className="egg-face egg-face-drawn" />
                    );
                  })()
                ),
              )}
              <active.figure className="egg-figure" />
            </div>
            {active.faceCredit && portraits.some((k) => faces[k]) && (
              <p className="egg-credit">{active.faceCredit}</p>
            )}
            <p className="egg-kicker f-bebas">{active.kicker}</p>
            <p
              className="f-dela egg-title"
              style={{ fontSize: titleSize(active.title) }}
            >
              {active.title}
            </p>
            <p className="egg-sub">{active.sub}</p>
            <p className="note mt-6 !text-[#a39c8c]">
              click or press Esc to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
