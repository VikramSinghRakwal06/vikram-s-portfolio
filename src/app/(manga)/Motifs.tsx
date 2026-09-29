import type { CSSProperties } from "react";

type KatanaVariant = "classic" | "tanjiro" | "inosuke";

export function Katana({
  dark = false,
  variant = "classic",
  className = "",
}: {
  dark?: boolean;
  variant?: KatanaVariant;
  className?: string;
}) {
  const ink = dark ? "var(--paper)" : "var(--ink)";
  if (variant === "inosuke") {
    const teeth = Array.from({ length: 34 }, (_, k) => {
      const x = 180 + k * 12.5;
      return `L${x + 6} ${k % 2 ? 8.5 : 7}L${x + 12.5} 10`;
    }).join("");
    const teethB = Array.from({ length: 34 }, (_, k) => {
      const x = 605 - k * 12.5;
      return `L${x - 6} ${k % 2 ? 20 : 21.5}L${x - 12.5} 18`;
    }).join("");
    return (
      <svg
        viewBox="0 0 640 28"
        className={className}
        role="img"
        aria-label="Inosuke's jagged nichirin blade"
      >
        <rect
          x="4"
          y="9"
          width="160"
          height="10"
          rx="3"
          fill="#8e9aa6"
          stroke={ink}
          strokeWidth="1.5"
        />
        {Array.from({ length: 11 }, (_, k) => (
          <path
            key={k}
            d={`M${14 + k * 14} 9l6 10`}
            stroke={ink}
            strokeWidth="1.2"
          />
        ))}
        <rect
          x="164"
          y="8"
          width="12"
          height="12"
          fill="#5b6570"
          stroke={ink}
          strokeWidth="1.2"
        />
        <path
          d={`M176 10${teeth}L636 14L605 18${teethB}L176 18Z`}
          fill="#7d93a8"
          stroke={ink}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  const tanjiro = variant === "tanjiro";
  const blade = tanjiro ? "#141414" : dark ? "#2a2722" : "#fbf9f3";
  return (
    <svg
      viewBox="0 0 640 28"
      className={className}
      {...(tanjiro
        ? {
            role: "img",
            "aria-label": "Tanjiro's black Sun Breathing nichirin blade",
          }
        : { "aria-hidden": true })}
    >
      <rect x="0" y="8" width="8" height="12" rx="2" fill={ink} />
      <rect
        x="6"
        y="9"
        width="150"
        height="10"
        rx="3"
        fill={tanjiro ? "#1d1c1a" : ink}
        stroke={ink}
      />
      {Array.from({ length: 10 }, (_, k) => (
        <path
          key={k}
          d={`M${16 + k * 14} 14l5-3.5 5 3.5-5 3.5z`}
          fill={tanjiro ? "#c4211a" : dark ? "var(--ink)" : "var(--paper)"}
        />
      ))}
      {tanjiro ? (
        <g>
          <rect
            x="155"
            y="1"
            width="14"
            height="26"
            rx="3"
            fill="#1d1c1a"
            stroke={ink}
            strokeWidth="1.5"
          />
          {[5, 11, 17, 23].map((y) => (
            <rect
              key={y}
              x="159"
              y={y - 1.5}
              width="6"
              height="3"
              fill="#6f6a60"
            />
          ))}
        </g>
      ) : (
        <ellipse
          cx="162"
          cy="14"
          rx="5"
          ry="12"
          fill="var(--red)"
          stroke={ink}
          strokeWidth="1.5"
        />
      )}
      <rect
        x="169"
        y="10"
        width="8"
        height="8"
        fill="var(--gold)"
        stroke={ink}
        strokeWidth="1"
      />
      <path
        d="M177 10H600Q628 11 636 16L177 18Z"
        fill={blade}
        stroke={ink}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d={`M182 15.6${Array.from({ length: 20 }, () => "q5 -1.6 10 0t10 0").join("")}`}
        fill="none"
        stroke={tanjiro ? "#ff6a2b" : ink}
        strokeOpacity={tanjiro ? 0.9 : 0.45}
        strokeWidth={tanjiro ? 1.3 : 0.9}
      />
    </svg>
  );
}

export function KatanaDivider({
  dark = false,
  variant = "classic",
}: {
  dark?: boolean;
  variant?: KatanaVariant;
}) {
  return (
    <div className="rise flex items-center gap-4 py-2" aria-hidden>
      <span
        className={`h-0 flex-1 border-t-2 border-dashed ${dark ? "border-[rgb(244_239_228/0.25)]" : "border-[var(--ink-3)]"}`}
      />
      <Katana
        dark={dark}
        variant={variant}
        className="katana w-[min(420px,68vw)]"
      />
      <span
        className={`h-0 flex-1 border-t-2 border-dashed ${dark ? "border-[rgb(244_239_228/0.25)]" : "border-[var(--ink-3)]"}`}
      />
    </div>
  );
}

export function Shuriken({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="currentColor" />
      <circle cx="12" cy="12" r="2.2" fill="var(--paper)" />
    </svg>
  );
}

export function Headband() {
  return (
    <div className="w-32 shrink-0 self-start">
      <div className="relative py-2">
        <div className="absolute inset-x-[-14px] top-1/2 h-9 -translate-y-1/2 border-y-2 border-[var(--ink)] bg-[#24314f]" />
        <div
          className="relative mx-auto grid h-20 w-28 place-items-center rounded-md border-2 border-[var(--ink)]"
          style={{
            background:
              "linear-gradient(160deg,#f1f3f6,#bcc1c9 45%,#8f959e 56%,#dde0e5)",
          }}
        >
          {[
            "top-1.5 left-1.5",
            "top-1.5 right-1.5",
            "bottom-1.5 left-1.5",
            "bottom-1.5 right-1.5",
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute size-1.5 rounded-full bg-[#5b6068] ${pos}`}
            />
          ))}
          <span className="f-dela text-4xl text-[#4a4f57] [text-shadow:1px_1px_0_rgb(255_255_255/0.7),-1px_-1px_0_rgb(0_0_0/0.25)]">
            忍
          </span>
        </div>
      </div>
      <p className="f-bebas mt-2 text-center text-xl">V. Singh</p>
    </div>
  );
}

export function StrawHat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} aria-hidden>
      <path
        d="M8 14Q8 3 16 3T24 14Z"
        fill="#e9c46a"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <path
        d="M8.2 11.2Q16 13.4 23.8 11.2L24 14Q16 16 8 14Z"
        fill="var(--red)"
        stroke="var(--ink)"
        strokeWidth="1"
      />
      <ellipse
        cx="16"
        cy="15"
        rx="15"
        ry="4"
        fill="#e9c46a"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <path
        d="M8 15Q16 17.5 24 15"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1"
      />
    </svg>
  );
}

export function TreasureX({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path
        d="M4 4l12 12M16 4L4 16"
        stroke="var(--red)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function star(cx: number, cy: number, r: number) {
  return Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

const starLayouts: Record<number, [number, number][]> = {
  1: [[20, 21]],
  2: [
    [14.5, 21],
    [25.5, 21],
  ],
  3: [
    [20, 15.5],
    [14, 25],
    [26, 25],
  ],
  4: [
    [14.5, 15.5],
    [25.5, 15.5],
    [14.5, 26],
    [25.5, 26],
  ],
};

export function StarOrb({
  n,
  className = "",
}: {
  n: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const id = `orb-${n}`;
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label={`${n}-star orb`}
    >
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset="0.35" stopColor="#ffb23a" />
          <stop offset="1" stopColor="#d85f00" />
        </radialGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="18"
        fill={`url(#${id})`}
        stroke="#6b3200"
        strokeWidth="1.2"
      />
      <ellipse
        cx="13"
        cy="11"
        rx="5.5"
        ry="3"
        fill="#fff"
        opacity="0.6"
        transform="rotate(-30 13 11)"
      />
      {starLayouts[n].map(([x, y]) => (
        <polygon
          key={`${x}-${y}`}
          points={star(x, y, n === 1 ? 6.5 : 4.4)}
          fill="#d7261e"
        />
      ))}
    </svg>
  );
}

const petals = [
  { left: "8%", d: "0s", t: "13s", dx: "-90px", s: 1 },
  { left: "22%", d: "4s", t: "11s", dx: "-140px", s: 0.8 },
  { left: "38%", d: "8s", t: "14s", dx: "-60px", s: 1.1 },
  { left: "55%", d: "2s", t: "12s", dx: "-120px", s: 0.9 },
  { left: "68%", d: "6.5s", t: "15s", dx: "-80px", s: 1.2 },
  { left: "82%", d: "1s", t: "12.5s", dx: "-150px", s: 0.85 },
  { left: "93%", d: "9s", t: "13.5s", dx: "-100px", s: 1 },
];

export function SakuraPetals() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => (
        <span
          key={p.left}
          className="petal"
          style={
            {
              left: p.left,
              "--d": p.d,
              "--t": p.t,
              "--dx": p.dx,
              scale: p.s,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Kunai({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 16" className={className} aria-hidden>
      <circle
        cx="5"
        cy="8"
        r="3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="9" y="6" width="15" height="4" fill="currentColor" />
      <path
        d="M12 6l2 4M16 6l2 4M20 6l2 4"
        stroke="var(--paper)"
        strokeWidth="1"
      />
      <path d="M24 8L30 3L47 8L30 13Z" fill="currentColor" />
      <path
        d="M30 8H44"
        stroke="var(--paper)"
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
}

function Tomoe({ angle, r }: { angle: number; r: number }) {
  return (
    <g transform={`rotate(${angle} 50 50) translate(50 ${50 - r})`}>
      <circle r="2.6" fill="var(--ink)" />
      <path
        d="M2.2-1.3C1.8-4.6-1.7-6.3-5.3-5.8C-2.4-4.9-.9-3.4-1.1-2.2Z"
        fill="var(--ink)"
      />
    </g>
  );
}

// Sasuke's Rinnegan: purple ripple rings with six tomoe on the inner two rings.
export function SasukeRinnegan() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden
    >
      {[10, 19, 28, 37, 45].map((r, i) => (
        <circle
          key={r}
          className="rinne-ring"
          style={{ "--i": i } as CSSProperties}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.2"
          opacity="0.8"
        />
      ))}
      {[12, 21].map((r, ring) => (
        <g
          key={r}
          className="tomoe-spin"
          style={{ animationDuration: `${8 + ring * 4}s` }}
        >
          {[0, 120, 240].map((a) => (
            <Tomoe key={a} angle={a + ring * 40} r={r} />
          ))}
        </g>
      ))}
      <circle cx="50" cy="50" r="3.4" fill="var(--ink)" />
    </svg>
  );
}

export function Hanafuda({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 28"
      className={className}
      role="img"
      aria-label="Hanafuda earring"
    >
      <rect
        x="1"
        y="1"
        width="18"
        height="26"
        rx="2"
        fill="#fffdf8"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="5.5" fill="#d7261e" />
      <path
        d="M10 26L2.5 17M10 26L6 16.5M10 26V16.5M10 26L14 16.5M10 26L17.5 17"
        stroke="var(--ink)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NineTails({ className = "" }: { className?: string }) {
  const tails = Array.from({ length: 9 }, (_, i) => {
    const a = ((-168 + i * 19.5) * Math.PI) / 180;
    const bx = 60,
      by = 70,
      len = 50;
    const tx = bx + len * Math.cos(a),
      ty = by + len * Math.sin(a);
    const px = -Math.sin(a) * 9,
      py = Math.cos(a) * 9;
    const mx = bx + len * 0.55 * Math.cos(a),
      my = by + len * 0.55 * Math.sin(a);
    return `M${bx} ${by}Q${(mx + px).toFixed(1)} ${(my + py).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}Q${(mx - px).toFixed(1)} ${(my - py).toFixed(1)} ${bx} ${by}Z`;
  });
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      role="img"
      aria-label="Nine-tailed fox"
    >
      {tails.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="#f07a1a"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      ))}
      <ellipse
        cx="60"
        cy="80"
        rx="15"
        ry="17"
        fill="#f07a1a"
        stroke="var(--ink)"
        strokeWidth="1.8"
      />
      <path
        d="M47 58L42 40L53 50Q60 47 67 50L78 40L73 58Q60 73 47 58Z"
        fill="#f07a1a"
        stroke="var(--ink)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M51 56l5 2M69 56l-5 2"
        stroke="var(--red-deep)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M58 63h4"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const leafPath =
  "M0 0C-7-4-9-13-3-15C0-16 0-13 0-12C0-13 0-16 3-15C9-13 7-4 0 0Z";

export function Grimoire({
  className = "",
  leaves = 5,
  cover = "#1b1916",
}: {
  className?: string;
  leaves?: 3 | 4 | 5;
  cover?: string;
}) {
  const anti = leaves === 5;
  return (
    <svg
      viewBox="0 0 60 72"
      className={className}
      role="img"
      aria-label={`${leaves}-leaf grimoire`}
    >
      <rect
        x="6"
        y="3"
        width="50"
        height="66"
        rx="4"
        fill={cover}
        stroke="var(--paper)"
        strokeWidth="1.5"
      />
      <rect x="6" y="3" width="8" height="66" rx="3" fill="rgb(0 0 0 / 0.35)" />
      {[
        [16, 7],
        [50, 7],
        [16, 63],
        [50, 63],
      ].map(([x, y]) => (
        <path
          key={`${x}${y}`}
          d={`M${x - 3} ${y}h6M${x} ${y - 3}v6`}
          stroke="var(--gold)"
          strokeWidth="1.5"
        />
      ))}
      <g transform="translate(33 36)">
        {Array.from({ length: leaves }, (_, k) => (
          <path
            key={k}
            transform={`rotate(${(360 / leaves) * k})`}
            d={leafPath}
            fill={anti ? "#0a0908" : "#f4efe4"}
            stroke={anti ? "var(--red)" : "var(--ink)"}
            strokeWidth="1.3"
          />
        ))}
        <circle r="2" fill={anti ? "var(--red)" : "var(--gold)"} />
      </g>
    </svg>
  );
}

export function WingsOfFreedom({ className = "" }: { className?: string }) {
  const feathers = (fill: string) => (
    <g fill={fill} stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M50 76C56 58 70 40 92 30C88 44 80 54 70 62C80 60 88 58 94 54C88 66 76 74 62 78C70 80 78 80 84 78C76 88 62 90 50 84Z" />
    </g>
  );
  return (
    <svg
      viewBox="0 0 100 110"
      className={className}
      role="img"
      aria-label="Wings of Freedom emblem"
    >
      <path
        d="M8 8H92V58C92 84 72 100 50 108C28 100 8 84 8 58Z"
        fill="#6b4a2b"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <path
        d="M14 14H86V58C86 80 69 94 50 101C31 94 14 80 14 58Z"
        fill="#f4efe4"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      {feathers("#2b4c9b")}
      <g transform="translate(100 0) scale(-1 1)">{feathers("#ffffff")}</g>
    </svg>
  );
}

export function TransmutationCircle({
  className = "",
}: {
  className?: string;
}) {
  const ring = "var(--ink)";
  const tri = (rot: number) =>
    [0, 120, 240]
      .map((a) => {
        const r = ((a + rot - 90) * Math.PI) / 180;
        return `${(100 + 70 * Math.cos(r)).toFixed(1)},${(100 + 70 * Math.sin(r)).toFixed(1)}`;
      })
      .join(" ");
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g fill="none" stroke={ring}>
        <circle cx="100" cy="100" r="96" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="86" strokeWidth="1.2" />
        <polygon points={tri(0)} strokeWidth="1.8" />
        <polygon points={tri(60)} strokeWidth="1.8" />
        <circle cx="100" cy="100" r="35" strokeWidth="1.5" />
        <rect
          x="75"
          y="75"
          width="50"
          height="50"
          transform="rotate(45 100 100)"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="100" r="12" strokeWidth="1.5" />
        {Array.from({ length: 6 }, (_, k) => {
          const a = ((k * 60 - 90) * Math.PI) / 180;
          return (
            <circle
              key={k}
              cx={100 + 70 * Math.cos(a)}
              cy={100 + 70 * Math.sin(a)}
              r="7"
              strokeWidth="1.3"
            />
          );
        })}
        {Array.from({ length: 24 }, (_, k) => {
          const a = (k * 15 * Math.PI) / 180;
          return (
            <path
              key={k}
              d={`M${100 + 86 * Math.cos(a)} ${100 + 86 * Math.sin(a)}L${100 + 96 * Math.cos(a)} ${100 + 96 * Math.sin(a)}`}
              strokeWidth="1"
            />
          );
        })}
      </g>
    </svg>
  );
}

export type NenStat = {
  type: string;
  jp: string;
  skill: string;
  value: number;
};

export function NenHexagon({
  stats,
  className = "",
}: {
  stats: NenStat[];
  className?: string;
}) {
  const c = 160;
  const R = 92;
  const pt = (i: number, r: number) => {
    const a = ((i * 60 - 90) * Math.PI) / 180;
    return [c + r * Math.cos(a), 150 + r * Math.sin(a)] as const;
  };
  const poly = (r: (i: number) => number) =>
    stats
      .map((_, i) =>
        pt(i, r(i))
          .map((n) => n.toFixed(1))
          .join(","),
      )
      .join(" ");
  return (
    <svg
      viewBox="0 0 320 300"
      className={className}
      role="img"
      aria-label={`Nen chart: ${stats.map((s) => `${s.type} (${s.skill}) ${s.value}%`).join(", ")}`}
    >
      {[1, 0.75, 0.5, 0.25].map((f) => (
        <polygon
          key={f}
          points={poly(() => R * f)}
          fill="none"
          stroke="var(--ink-3)"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}
      {stats.map((_, i) => {
        const [x, y] = pt(i, R);
        return (
          <path
            key={i}
            d={`M${c} 150L${x} ${y}`}
            stroke="var(--ink-3)"
            strokeWidth="1"
            opacity="0.6"
          />
        );
      })}
      <polygon
        className="nen-aura"
        points={poly((i) => (R * stats[i].value) / 100)}
        fill="rgb(196 33 26 / 0.3)"
        stroke="var(--red)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {stats.map((st, i) => {
        const [x, y] = pt(i, R + 28);
        return (
          <g key={st.type}>
            <text
              x={x}
              y={y - 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--ink)"
            >
              {st.jp} {st.type}
            </text>
            <text
              x={x}
              y={y + 10}
              textAnchor="middle"
              fontSize="10"
              fill="var(--ink-2)"
            >
              {st.skill}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function PokeBall({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Poké Ball"
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="#fffdf8"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <path
        d="M2 20a18 18 0 0 1 36 0Z"
        fill="#e3350d"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <ellipse
        cx="12"
        cy="10"
        rx="4"
        ry="2.2"
        fill="#fff"
        opacity="0.55"
        transform="rotate(-30 12 10)"
      />
      <path d="M2 20h36" stroke="var(--ink)" strokeWidth="3" />
      <circle
        cx="20"
        cy="20"
        r="6"
        fill="#fffdf8"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <circle
        cx="20"
        cy="20"
        r="2.6"
        fill="#fffdf8"
        stroke="var(--ink)"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function Zangetsu({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 70"
      className={className}
      role="img"
      aria-label="Zangetsu, Ichigo's cleaver zanpakutō"
    >
      <path
        d="M8 38c-6 10-4 22 4 28M14 36c-2 12 4 22 12 26"
        stroke="#e9e3d4"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="10"
        y="26"
        width="62"
        height="16"
        rx="3"
        fill="#1d1c1a"
        stroke="var(--paper)"
        strokeWidth="1.5"
      />
      {Array.from({ length: 7 }, (_, k) => (
        <path
          key={k}
          d={`M${16 + k * 8} 26l6 16`}
          stroke="#e9e3d4"
          strokeWidth="2.2"
        />
      ))}
      <rect
        x="72"
        y="24"
        width="10"
        height="20"
        fill="#3a3630"
        stroke="var(--paper)"
        strokeWidth="1.5"
      />
      <path
        d="M82 8H292L316 34L292 62H82Z"
        fill="#0d0d0f"
        stroke="var(--paper)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M82 14H290L310 34L290 56H82"
        fill="none"
        stroke="#c9ccd2"
        strokeWidth="1.2"
        opacity="0.8"
      />
      <path d="M92 35H286" stroke="#c9ccd2" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}

export function BlackFlash({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      role="img"
      aria-label="Black Flash"
    >
      <path
        className="bf-glow"
        d="M70 4L28 78H56L36 156L96 62H64L86 4Z"
        fill="#050505"
        stroke="#ff2a2a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M72 14L40 72H64L50 126"
        fill="none"
        stroke="#ff6b6b"
        strokeWidth="1.5"
        opacity="0.7"
      />
      {[
        [18, 40],
        [104, 34],
        [14, 112],
        [108, 118],
        [60, 150],
      ].map(([x, y]) => (
        <path
          key={`${x}${y}`}
          d={`M${x} ${y - 7}L${x + 2} ${y - 2}L${x + 7} ${y}L${x + 2} ${y + 2}L${x} ${y + 7}L${x - 2} ${y + 2}L${x - 7} ${y}L${x - 2} ${y - 2}Z`}
          fill="#ff2a2a"
        />
      ))}
    </svg>
  );
}

function UniformCollar({ trim }: { trim: string }) {
  const ink = "var(--ink)";
  return (
    <>
      <path
        d="M26 116Q60 132 94 116L100 150H20Z"
        fill="#1c1a2e"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M34 112Q60 126 86 112L88 128Q60 142 32 128Z"
        fill="#26233d"
        stroke={ink}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M60 128V150" stroke={trim} strokeWidth="1.5" />
      <circle
        cx="60"
        cy="140"
        r="4.5"
        fill="#d9b24c"
        stroke={ink}
        strokeWidth="1.5"
      />
      <path
        d="M58 140a2 2 0 1 1 2 2"
        fill="none"
        stroke={ink}
        strokeWidth="1"
      />
    </>
  );
}

const face = "M30 80Q30 114 60 124Q90 114 90 80Z";

export function ChibiGojo({ className = "" }: { className?: string }) {
  const ink = "var(--ink)";
  const hair =
    "M20 76L8 60L19 58L6 40L24 44L17 21L36 31L37 8L52 25L61 1L69 23L85 6L85 29L103 16L97 39L115 35L101 53L111 60L98 72Q60 60 20 76Z";
  return (
    <svg
      viewBox="0 0 120 150"
      className={className}
      role="img"
      aria-label="Chibi Gojo"
    >
      <defs>
        <radialGradient id="gojo-eye" cx="40%" cy="40%" r="60%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#b8f4ff" />
          <stop offset="0.7" stopColor="#3aa0ff" />
          <stop offset="1" stopColor="#1554d6" />
        </radialGradient>
        <linearGradient id="gojo-hair" x1="0" y1="1" x2="0.5" y2="0">
          <stop offset="0" stopColor="#c7bde6" />
          <stop offset="0.5" stopColor="#efebfb" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <UniformCollar trim="#3a3656" />
      <circle
        cx="29"
        cy="94"
        r="7"
        fill="#ffe1cc"
        stroke={ink}
        strokeWidth="2.2"
      />
      <circle
        cx="91"
        cy="94"
        r="7"
        fill="#ffe1cc"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path
        d={face}
        fill="#ffe1cc"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g className="gojo-eyes">
        {[46, 74].map((x) => (
          <g key={x}>
            <ellipse
              cx={x}
              cy="88"
              rx="7.5"
              ry="7"
              fill="url(#gojo-eye)"
              stroke={ink}
              strokeWidth="1.6"
            />
            <circle cx={x - 2.5} cy="85.5" r="2" fill="#fff" />
            <path
              d={`M${x - 8} 82q8-5 16 0`}
              fill="none"
              stroke="#f4f1fd"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>
      <ellipse cx="40" cy="104" rx="5" ry="2.5" fill="#ffb3a6" opacity="0.7" />
      <ellipse cx="80" cy="104" rx="5" ry="2.5" fill="#ffb3a6" opacity="0.7" />
      <path
        d="M53 108q7 6 14 0"
        fill="none"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <g className="gojo-blindfold">
        <path
          d="M23 70Q60 62 97 70L95 99Q60 93 25 99Z"
          fill="#1c1a2e"
          stroke={ink}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M30 76Q60 70 90 76"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.18"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M32 88Q60 83 88 88"
          fill="none"
          stroke="#3a3656"
          strokeWidth="1.5"
        />
        <path
          d="M95 78l16 3-12 5 10 6-15-2"
          fill="#1c1a2e"
          stroke={ink}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <path d={hair} transform="translate(3 3)" fill="#b3a8d8" />
      <path
        d={hair}
        fill="url(#gojo-hair)"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M30 52L40 64M50 30L54 56M66 26L66 52M82 32L78 56M96 44L88 62"
        stroke="#b9afe0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M57 68C51 60 59 49 69 53C77 57 73 69 65 67C61 66 62 61 66 61"
        fill="none"
        stroke={ink}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M57 68C51 60 59 49 69 53C77 57 73 69 65 67C61 66 62 61 66 61"
        fill="none"
        stroke="#f4f1fd"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChibiSukuna({ className = "" }: { className?: string }) {
  const ink = "var(--ink)";
  const hair =
    "M24 74L20 56L30 58L24 38L40 44L40 24L54 36L60 16L68 36L82 24L82 44L98 38L92 58L102 56L98 74Q60 62 24 74Z";
  return (
    <svg
      viewBox="0 0 120 150"
      className={className}
      role="img"
      aria-label="Chibi Sukuna"
    >
      <UniformCollar trim="#c4211a" />
      <circle
        cx="29"
        cy="94"
        r="7"
        fill="#ffe1cc"
        stroke={ink}
        strokeWidth="2.2"
      />
      <circle
        cx="91"
        cy="94"
        r="7"
        fill="#ffe1cc"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path
        d={face}
        fill="#ffe1cc"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* undercut sides */}
      <path d="M30 80Q29 70 36 66L38 80Z" fill="#3a1f24" />
      <path d="M90 80Q91 70 84 66L82 80Z" fill="#3a1f24" />
      {/* forehead marking */}
      <path d="M52 70L60 64L68 70L60 76Z" fill={ink} />
      {/* cheek bands */}
      <path
        d="M31 100h12M31 104h10M89 100H77M89 104H79"
        stroke={ink}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {[44, 76].map((x, k) => (
        <g key={x}>
          <path
            d={
              k === 0
                ? `M${x - 9} 87Q${x} 78 ${x + 8} 89Q${x} 92 ${x - 9} 87Z`
                : `M${x - 8} 89Q${x} 78 ${x + 9} 87Q${x} 92 ${x - 8} 89Z`
            }
            fill="#fff"
            stroke={ink}
            strokeWidth="1.8"
          />
          <ellipse cx={x} cy="87" rx="3.6" ry="3.8" fill="#d4201a" />
          <ellipse cx={x} cy="87" rx="1" ry="3" fill="#1a0505" />
          <path
            d={k === 0 ? `M${x - 11} 80l19 4` : `M${x + 11} 80l-19 4`}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* second eyes: shut slits that open on hover */}
          <path
            d={`M${x - 7} 96q7 3 14 0`}
            fill="none"
            stroke={ink}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <g className="sukuna-eyes">
            <path
              d={`M${x - 7} 96Q${x} 90 ${x + 7} 96Q${x} 100 ${x - 7} 96Z`}
              fill="#fff"
              stroke={ink}
              strokeWidth="1.5"
            />
            <circle cx={x} cy="95.6" r="2" fill="#d4201a" />
          </g>
        </g>
      ))}
      {/* wide grin with teeth */}
      <path
        d="M44 106Q60 122 76 106Q60 112 44 106Z"
        fill="#3a0a0a"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M47 108L50 112L53 109L56 113L59 110L62 113L65 109L68 112L71 109L73 108Q60 112 47 108Z"
        fill="#fff"
      />
      {/* raised hand with black nails */}
      <g transform="translate(88 110) rotate(-14)">
        <path
          d="M0 26V8Q0 4 4 4Q8 4 8 8V0Q8-4 12-4Q16-4 16 0V2Q16-2 20-2Q24-2 24 2V8Q24 4 28 4Q32 4 32 8V26Q16 34 0 26Z"
          fill="#ffe1cc"
          stroke={ink}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {[4, 12, 20, 28].map((x, k) => (
          <path
            key={x}
            d={`M${x - 3} ${k === 1 ? -3 : k === 2 ? -1 : 5}h6l-3 -4z`}
            fill={ink}
          />
        ))}
      </g>
      <path d={hair} transform="translate(3 3)" fill="#c9606c" />
      <path
        d={hair}
        fill="#f2a0a8"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M40 52L46 66M58 36L60 60M76 44L72 64"
        stroke="#d9737e"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SantoryuSwords({ className = "" }: { className?: string }) {
  const swords = [
    { angle: -5, handle: "#f4efe4", blade: "#fbf9f3", name: "Wado Ichimonji" },
    { angle: 0, handle: "#c4211a", blade: "#e8e4dc", name: "Sandai Kitetsu" },
    { angle: 5, handle: "#1d1c1a", blade: "#2a2722", name: "Shusui" },
  ];
  return (
    <svg
      viewBox="0 0 640 120"
      className={className}
      role="img"
      aria-label="Zoro's three swords: Wado Ichimonji, Sandai Kitetsu and Shusui"
    >
      {swords.map((s) => (
        <g key={s.name} transform={`rotate(${s.angle} 170 60)`}>
          <rect
            x="16"
            y="54"
            width="140"
            height="12"
            rx="4"
            fill={s.handle}
            stroke="var(--ink)"
            strokeWidth="2"
          />
          {Array.from({ length: 9 }, (_, k) => (
            <path
              key={k}
              d={`M${26 + k * 14} 60l5-4 5 4-5 4z`}
              fill="var(--ink)"
              opacity="0.6"
            />
          ))}
          <ellipse
            cx="160"
            cy="60"
            rx="5"
            ry="13"
            fill="var(--gold)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M165 55H590Q622 56 632 61L165 65Z"
            fill={s.blade}
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}
