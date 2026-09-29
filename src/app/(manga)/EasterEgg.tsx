"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from "react";
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
  | "gatling"
  | "beam"
  | "void"
  | "water"
  | "zoro"
  | "moon"
  | "shrine"
  | "sun"
  | "smash"
  | "antimagic"
  | "thunder"
  | "meteor";

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
  /** A large portrait standing behind the title. */
  backdrop?: { key: string; name: string };
  /** A full-screen image behind everything (public/characters/<scene>). */
  scene?: string;
  /** Kicker shown one syllable at a time. */
  chant?: string[];
  /** How long the screen stays open, in ms. */
  duration?: number;
  /** A large image slowly spinning behind the title (public/characters/<spin>). */
  spin?: string;
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
    effect: "smash",
    kicker: "One For All · 100% · Detroit Smash",
    title: "PLUS ULTRA!",
    sub: "Go beyond. Every limit is a bottleneck waiting to be smashed.",
    duration: 3600,
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
    words: ["gomugomu", "gearfive", "gear5", "gatling"],
    theme: "gear5",
    effect: "gatling",
    kicker: "Gear 5 · Drums of liberation",
    title: "GOMU GOMU NO GATLING",
    sub: "A hundred rubber punches. Faster than a request timeout.",
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
    chant: ["KA", "ME", "HA", "ME", "HA!"],
    title: "KAMEHAMEHA",
    sub: "Ultra Instinct engaged. Charged up and fired straight at the bottleneck.",
    scene: "goku-ui",
    duration: 4000,
    figure: NimbusPole,
    face: "kid-goku",
  },
  {
    words: ["pikachu", "thunderbolt", "pikapika"],
    theme: "pika",
    effect: "thunder",
    kicker: "Pikachu used Thunderbolt!",
    chant: ["PIKA…", "PIKA…", "CHUUU!"],
    title: "SUPER EFFECTIVE!",
    sub: "Pikachu used Thunderbolt! The wild RECRUITER is paralysed. It may send an email.",
    figure: PikachuTail,
    face: "pikachu",
    scene: "pikachu-scene",
    allies: [
      { key: "bulbasaur", name: "Bulbasaur" },
      { key: "squirtle", name: "Squirtle" },
      { key: "charmander", name: "Charmander" },
    ],
    duration: 4200,
  },
  {
    words: ["greninja", "watershuriken"],
    theme: "water",
    effect: "water",
    kicker: "Bond Phenomenon · Ash-Greninja",
    title: "WATER SHURIKEN",
    sub: "A critical hit. Ninja frog, ninja portfolio.",
    figure: WaterShuriken,
    face: "greninja",
    scene: "greninja-scene",
    backdrop: { key: "ash", name: "Ash" },
    duration: 3800,
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
    backdrop: { key: "sanji", name: "Sanji" },
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
    duration: 3800,
    faceCredit: "© Koyoharu Gotouge / Shueisha, Aniplex, ufotable",
  },
  {
    words: ["antimagic", "blackclover", "blackbulls", "surpassyourlimits"],
    theme: "antimagic",
    effect: "antimagic",
    kicker: "Five-leaf grimoire · Black Bulls",
    title: "ANTI MAGIC",
    sub: "Surpass your limits. Right here, right now. No magic needed, just grit.",
    figure: BullsEmblem,
    face: "asta",
    faceCredit: "Asta art: Ztatik (@ztatikone)",
    allies: [
      { key: "yami", name: "Yami" },
      { key: "yuno", name: "Yuno" },
    ],
    scene: "yami-scene",
    spin: "clover",
    duration: 4000,
  },
  {
    words: ["charizard", "blastburn", "megaevolution", "seismictoss"],
    theme: "char",
    effect: "meteor",
    kicker: "Technical Machine #19 · Charizard",
    title: "SEISMIC TOSS",
    sub: "Charizard used Seismic Toss! Took the bug to orbit and back. It fainted.",
    figure: CharFlame,
    face: ["charizard", "charizard-x"],
    backdrop: { key: "ash-charizard", name: "Ash & Charizard" },
    scene: "charizard-scene",
    duration: 4800,
  },
];

// Forgiving romanization: "ou" reads as "o" and "uu" as "u" (santouryu, ryouikitenkai…).
const normalize = (s: string) => s.replace(/ou/g, "o").replace(/uu/g, "u");

const allWords = techniques.flatMap((t) =>
  t.words.map((w) => [normalize(w), t] as const),
);

// Size the title so its longest word fits the viewport.
function titleSize(title: string) {
  const words = title.split(" ");
  const longest = Math.max(
    ...words.map((w) => w.length),
    words.length > 2 ? Math.ceil(title.length / 2) : 0,
  );
  return `min(${(88 / longest).toFixed(1)}vw, 10rem)`;
}

// Rubber arms: side, vertical position (%), tilt, delay (s), reach (vw).
const punches = [
  { side: "left", y: 8, r: -6, d: 0, w: 40 },
  { side: "right", y: 24, r: 5, d: 0.12, w: 36 },
  { side: "left", y: 44, r: 3, d: 0.22, w: 30 },
  { side: "right", y: 62, r: -4, d: 0.08, w: 32 },
  { side: "left", y: 78, r: 6, d: 0.3, w: 42 },
  { side: "right", y: 88, r: -6, d: 0.18, w: 38 },
];

// Impact bursts sit where each fist lands.
const bursts = punches.map((p) => [
  p.side === "left" ? p.w : 100 - p.w,
  p.y + 3,
  p.d + 0.2,
]);

function BullsEmblem({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- supplied emblem image
    <img
      src="/characters/blackbulls.png"
      alt="Black Bulls emblem"
      className={className}
    />
  );
}

function CharFlame({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- supplied emblem art
    <img
      src="/characters/char-flame.png"
      alt="Charmander line in flames"
      className={`${className} char-flame`}
    />
  );
}

function Fist({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 60" className={className} aria-hidden>
      <path
        d="M6 16Q6 6 16 6H48Q62 6 64 18Q68 20 68 30Q68 40 64 42Q62 54 48 54H16Q6 54 6 44Z"
        fill="#f6c9a0"
        stroke="#15130f"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M50 6V54M50 18H66M50 30H68M50 42H66"
        fill="none"
        stroke="#15130f"
        strokeWidth="3"
      />
      <path
        d="M14 38Q28 30 40 38"
        fill="none"
        stroke="#15130f"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
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
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="ki-spark"
              style={
                {
                  "--a": `${i * 25.7}deg`,
                  animationDelay: `${0.15 + (i % 7) * 0.1}s`,
                } as CSSProperties
              }
            />
          ))}
          <span className="ki-orb" />
          <span className="egg-beam" />
          <span className="egg-beam-core" />
          <span className="ki-flash" />
        </>
      );
    case "thunder":
      return (
        <>
          <span className="pk-flicker" />
          <svg
            className="pk-strikes"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            {[
              "M180 0L150 120L200 130L140 260L190 270L120 420",
              "M820 0L850 110L800 125L870 250L815 265L880 400",
              "M500 0L470 90L530 100L480 210",
              "M320 0L340 70L300 80L330 170",
              "M680 0L660 80L700 90L665 180",
            ].map((d, i) => (
              <path
                key={i}
                className="pk-bolt"
                pathLength="1"
                d={d}
                style={{
                  animationDelay: `${[0.05, 0.25, 0.45, 0.6, 0.7][i]}s`,
                }}
              />
            ))}
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element -- supplied sprite */}
          <img src="/characters/pikachu-run.png" alt="" className="pk-dash" />
          <span className="pk-trail" />
        </>
      );
    case "meteor": {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const spiral =
        "M" +
        Array.from({ length: 61 }, (_, i) => {
          const t = i / 60;
          const x =
            W / 2 + W * 0.26 * (1 - 0.55 * t) * Math.sin(t * Math.PI * 4);
          const y = H * 0.92 - t * H * 0.86;
          return `${x.toFixed(1)} ${y.toFixed(1)}`;
        }).join("L");
      return (
        <div className="toss">
          <span className="toss-sky" />
          <svg className="toss-trail" viewBox={`0 0 ${W} ${H}`}>
            <path d={spiral} pathLength="1" />
          </svg>
          <span
            className="toss-ball"
            style={{ offsetPath: `path("${spiral}")` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- supplied portrait */}
            <img src="/characters/charizard.png" alt="" />
          </span>
          <span className="toss-speed" />
          {/* eslint-disable-next-line @next/next/no-img-element -- supplied poster art */}
          <img src="/characters/seismic.png" alt="" className="toss-meteor" />
          <span className="cz-flash" />
          <span className="toss-dust" />
          <svg
            className="toss-cracks"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            {[
              "M500 600L450 570L470 555L400 535L420 520L330 505",
              "M500 600L555 565L540 550L620 530L605 515L700 495",
              "M500 600L485 565L505 545L480 515",
              "M500 600L390 590L340 600",
              "M500 600L620 588L680 600",
              "M500 600L520 570L580 560L610 535",
            ].map((d, i) => (
              <path key={i} pathLength="1" d={d} />
            ))}
          </svg>
          <span className="cz-wave" />
          {[
            [-34, -40, 220],
            [-22, -58, -160],
            [-10, -70, 300],
            [8, -64, -240],
            [20, -52, 180],
            [32, -38, -300],
            [-40, -20, 120],
            [40, -22, -140],
          ].map(([dx, dy, r], i) => (
            <span
              key={i}
              className="toss-rock"
              style={
                {
                  "--dx": `${dx}vw`,
                  "--dy": `${dy}vh`,
                  "--r": `${r}deg`,
                } as CSSProperties
              }
            />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <span
              key={i}
              className="am-ember cz-ember"
              style={{
                left: `${30 + ((i * 37) % 40)}%`,
                animationDelay: `${1.6 + (i % 6) * 0.18}s`,
              }}
            />
          ))}
        </div>
      );
    }
    case "antimagic":
      return (
        <>
          <svg
            className="am-cracks"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            {[
              "M0 80L120 130L160 110L260 190L300 170L380 240",
              "M0 520L110 470L150 500L250 420L290 440L380 370",
              "M1000 60L880 120L840 100L740 180L700 160L620 230",
              "M1000 540L890 480L850 510L750 430L710 450L620 380",
              "M500 0L480 90L520 120L490 200",
              "M500 600L520 520L480 490L510 410",
            ].map((d, i) => (
              <path
                key={i}
                className="am-crack"
                pathLength="1"
                d={d}
                style={{ animationDelay: `${0.1 + (i % 3) * 0.12}s` }}
              />
            ))}
          </svg>
          {Array.from({ length: 16 }, (_, i) => (
            <span
              key={i}
              className="am-ember"
              style={{
                left: `${(i * 61) % 100}%`,
                animationDelay: `${(i % 6) * 0.25}s`,
              }}
            />
          ))}
        </>
      );
    case "smash":
      return (
        <>
          <span className="smash-lines" />
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
          {[0, 0.15, 0.3].map((d) => (
            <span
              key={d}
              className="smash-ring"
              style={{ animationDelay: `${0.6 + d}s` }}
            />
          ))}
          <SmashFist className="smash-fist" />
          <span className="smash-flash" />
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
            className="ds-slashes"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="ds-sun" x1="0" x2="1">
                <stop offset="0" stopColor="#c4211a" stopOpacity="0" />
                <stop offset="0.3" stopColor="#ff4a1a" />
                <stop offset="0.7" stopColor="#ffb347" />
                <stop offset="1" stopColor="#fff3c2" />
              </linearGradient>
            </defs>
            {/* Sun: Tanjiro's flaming arc */}
            <path
              className="ds-cut ds-sun"
              pathLength="1"
              d="M-20 520Q420 40 1020 180"
            />
            <path
              className="ds-cut ds-sun-core"
              pathLength="1"
              d="M-20 520Q420 40 1020 180"
            />
            {/* Thunder: Zenitsu's zig-zag flash */}
            <path
              className="ds-cut ds-thunder"
              pathLength="1"
              d="M-20 90L240 170L200 230L470 300L430 360L720 430L680 490L1020 560"
            />
            {/* Beast: Inosuke's jagged twin blades */}
            <path
              className="ds-cut ds-beast"
              pathLength="1"
              d="M1020 40L880 80L900 110L740 150L760 185L600 225L620 260L460 300L480 335L320 375"
            />
            <path
              className="ds-cut ds-beast ds-beast-2"
              pathLength="1"
              d="M1020 90L880 130L900 160L740 200L760 235L600 275L620 310L460 350L480 385L320 425"
            />
          </svg>
          <p className="ds-labels" aria-hidden>
            <span className="ds-l-sun">日の呼吸 · Sun</span>
            <span className="ds-l-thunder">雷の呼吸 · Thunder</span>
            <span className="ds-l-beast">獣の呼吸 · Beast</span>
          </p>
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
    case "gatling":
      return (
        <>
          {punches.map((p, i) => (
            <span
              key={i}
              className={`punch punch-${p.side}`}
              style={
                {
                  top: `${p.y}%`,
                  width: `${p.w}vw`,
                  rotate: `${p.r}deg`,
                  "--d": `${p.d}s`,
                } as CSSProperties
              }
            >
              <span className="punch-arm" />
              <Fist className="punch-fist" />
            </span>
          ))}
          {bursts.map(([x, y, d], i) => (
            <svg
              key={i}
              className="punch-burst"
              viewBox="0 0 100 100"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}
            >
              <path d="M50 0L60 32L92 18L72 46L100 58L66 64L76 98L50 74L24 98L34 64L0 58L28 46L8 18L40 32Z" />
              <text x="50" y="58" textAnchor="middle">
                DON!
              </text>
            </svg>
          ))}
        </>
      );
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
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    // The logo is a real link to #cover, so a normal single click still needs to
    // scroll home — but we delay that scroll briefly so a burst of taps isn't
    // derailed by the page moving out from under the reader's finger.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("[data-egg-logo]");
      if (!link) return;
      e.preventDefault();
      if (scrollTimer.current) clearTimeout(scrollTimer.current);

      const now = Date.now();
      taps.current = [...taps.current.filter((x) => now - x < 2000), now];
      if (taps.current.length >= 5) {
        taps.current = [];
        fire(techniques[Math.floor(Math.random() * techniques.length)]);
        return;
      }

      const targetId = link.getAttribute("href")?.slice(1);
      scrollTimer.current = setTimeout(() => {
        document
          .getElementById(targetId ?? "cover")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 260);
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
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setActive(null), active.duration ?? 3000);
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
          {active.scene && faces[active.scene] && (
            // eslint-disable-next-line @next/next/no-img-element -- user-supplied scene
            <img src={faces[active.scene]} alt="" className="egg-scene" />
          )}
          {active.spin && faces[active.spin] && (
            // eslint-disable-next-line @next/next/no-img-element -- supplied emblem image
            <img src={faces[active.spin]} alt="" className="egg-spin" />
          )}
          {active.backdrop && faces[active.backdrop.key] && (
            <figure className="egg-backdrop">
              {/* eslint-disable-next-line @next/next/no-img-element -- user-supplied portraits */}
              <img src={faces[active.backdrop.key]} alt="" />
              <figcaption>{active.backdrop.name}</figcaption>
            </figure>
          )}
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
            {active.chant ? (
              <p
                className="egg-kicker egg-chant f-bebas"
                aria-label={active.chant.join(" ")}
              >
                {active.chant.map((s, i) => (
                  <span
                    key={i}
                    aria-hidden
                    style={{ animationDelay: `${0.1 + i * 0.18}s` }}
                  >
                    {s}
                  </span>
                ))}
              </p>
            ) : (
              <p className="egg-kicker f-bebas">{active.kicker}</p>
            )}
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
