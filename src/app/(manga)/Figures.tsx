// Signature symbols for the secret techniques. Each is drawn from simple shapes and labelled for screen readers.

const ink = "#15130f";

export function SukunaFinger({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 160"
      className={className}
      role="img"
      aria-label="Sukuna's cursed finger"
    >
      <path
        d="M26 150V40Q26 12 40 12Q54 12 54 40V150Z"
        fill="#5a3b35"
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M31 20Q40 14 49 20L47 30Q40 26 33 30Z" fill="#2a1512" />
      {[58, 88].map((y) => (
        <path
          key={y}
          d={`M27 ${y}q13 6 26 0`}
          fill="none"
          stroke="#2a1512"
          strokeWidth="2.5"
        />
      ))}
      <g transform="rotate(-8 40 118)">
        <rect
          x="14"
          y="98"
          width="52"
          height="40"
          fill="#f3e7c4"
          stroke={ink}
          strokeWidth="2.5"
        />
        <path
          d="M24 106h32M24 114h24M24 122h30M24 130h20"
          stroke="#c4211a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function HollowPurple({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Hollow Purple"
    >
      <defs>
        <radialGradient id="hp-core" cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#ecd4ff" />
          <stop offset="0.6" stopColor="#9b4dff" />
          <stop offset="1" stopColor="#3f0a82" />
        </radialGradient>
      </defs>
      <path
        d="M12 40a40 40 0 0 1 56-28"
        fill="none"
        stroke="#ff3b3b"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M88 60a40 40 0 0 1-56 28"
        fill="none"
        stroke="#2f7bff"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="26" fill="url(#hp-core)" />
    </svg>
  );
}

export function RinneSharinganEye({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Rinne-Sharingan"
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="#c4211a"
        stroke={ink}
        strokeWidth="3"
      />
      <g fill="none" stroke="#1a0505" strokeWidth="2">
        {[12, 22, 32].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} />
        ))}
      </g>
      {[12, 22, 32].flatMap((r, ring) =>
        [0, 120, 240].map((a) => (
          <g
            key={`${r}-${a}`}
            transform={`rotate(${a + ring * 40} 50 50) translate(50 ${50 - r})`}
          >
            <circle r="3" fill="#1a0505" />
            <path
              d="M2.5-1.5C2.1-5.4-2-7.4-6.3-6.8C-2.9-5.8-1.1-4-1.3-2.5Z"
              fill="#1a0505"
            />
          </g>
        )),
      )}
      <circle cx="50" cy="50" r="4" fill="#1a0505" />
    </svg>
  );
}

export function OneForAll({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="One For All"
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="#1f7a4d"
        stroke={ink}
        strokeWidth="3"
      />
      <circle
        cx="50"
        cy="50"
        r="36"
        fill="none"
        stroke="#ffe08a"
        strokeWidth="3"
      />
      <path
        d="M58 12L30 56H48L40 88L72 40H54Z"
        fill="#7dff9b"
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SystemAlert({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="System alert"
    >
      <rect
        x="8"
        y="14"
        width="84"
        height="72"
        fill="#0a1830"
        stroke="#6fd6ff"
        strokeWidth="3"
      />
      <path
        d="M4 10h14M4 10v14M96 90H82M96 90V76"
        stroke="#bff0ff"
        strokeWidth="4"
      />
      <circle
        cx="50"
        cy="50"
        r="22"
        fill="none"
        stroke="#bff0ff"
        strokeWidth="3.5"
      />
      <path
        d="M50 36V54"
        stroke="#bff0ff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="62" r="3.2" fill="#bff0ff" />
    </svg>
  );
}

const blade = "M50 50C44 36 40 20 50 2C54 16 60 30 62 44C58 46 54 48 50 50Z";

export function WaterShuriken({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Water Shuriken"
    >
      <defs>
        <linearGradient id="ws-blade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8fbff" />
          <stop offset="0.45" stopColor="#6fd3ff" />
          <stop offset="1" stopColor="#1a73c9" />
        </linearGradient>
        <radialGradient id="ws-core" r="60%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#8fe3ff" />
          <stop offset="1" stopColor="#0a4f9e" />
        </radialGradient>
      </defs>
      <g className="ws-spin">
        {[0, 90, 180, 270].map((a) => (
          <g key={a} transform={`rotate(${a} 50 50)`}>
            <path
              d={blade}
              fill="url(#ws-blade)"
              stroke="#e8fbff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M50 44C47 34 46 22 50 10"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity="0.7"
            />
          </g>
        ))}
        <circle
          cx="50"
          cy="50"
          r="13"
          fill="url(#ws-core)"
          stroke="#e8fbff"
          strokeWidth="2"
        />
        <path
          d="M44 50a6 6 0 1 1 6 6a3.5 3.5 0 1 1 3.5-3.5"
          fill="none"
          stroke="#0a4f9e"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function ShadowDaggers({ className }: { className?: string }) {
  const dagger = (
    <g>
      <path
        d="M50 4L56 14L54 58H46L44 14Z"
        fill="#1b1830"
        stroke="#b98cff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M50 10V54" stroke="#e2ccff" strokeWidth="1.2" opacity="0.8" />
      <path
        d="M36 58H64L60 64H40Z"
        fill="#2a2440"
        stroke="#b98cff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="46"
        y="64"
        width="8"
        height="24"
        rx="2"
        fill="#141222"
        stroke="#b98cff"
        strokeWidth="1.8"
      />
      <path d="M46 70h8M46 76h8M46 82h8" stroke="#6d5aa8" strokeWidth="1.2" />
      <circle
        cx="50"
        cy="92"
        r="4"
        fill="#8a5cff"
        stroke="#e2ccff"
        strokeWidth="1.2"
      />
    </g>
  );
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Sung Jinwoo's twin daggers"
    >
      <g transform="rotate(-35 50 50)">{dagger}</g>
      <g transform="rotate(35 50 50)">{dagger}</g>
    </svg>
  );
}

export function SmashFist({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="One For All smash"
    >
      <g stroke={ink} strokeWidth="3" strokeLinejoin="round">
        <path
          d="M26 44Q26 30 36 30Q40 22 50 24Q56 18 64 22Q74 20 76 30Q86 32 84 46V70Q84 86 66 88H44Q26 86 26 70Z"
          fill="#ffe1cc"
        />
        <path d="M36 30V48M50 24V48M64 22V48" fill="none" />
        <path d="M26 52Q40 46 56 52Q58 62 48 64Q36 64 26 60" fill="#ffd1b5" />
        <path d="M30 88V98H80V88" fill="#1f7a4d" />
      </g>
      <g
        className="ofa-crackle"
        fill="none"
        stroke="#7dff9b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 34L46 44L40 50L48 58" />
        <path d="M70 32L64 42L72 48L66 60" />
        <path d="M58 68L52 76L60 80" />
        <path d="M14 30L22 40L16 46L26 52" />
        <path d="M92 20L84 32L92 38L86 50" />
      </g>
    </svg>
  );
}

export function NimbusPole({ className }: { className?: string }) {
  const puffs: [number, number, number][] = [
    [30, 70, 18],
    [52, 60, 22],
    [78, 58, 22],
    [102, 62, 20],
    [124, 70, 16],
    [44, 78, 16],
    [70, 80, 18],
    [96, 80, 18],
    [118, 80, 14],
  ];
  return (
    <svg
      viewBox="0 0 160 110"
      className={className}
      role="img"
      aria-label="Flying Nimbus and Power Pole"
    >
      <path
        d="M8 88Q30 96 40 86"
        fill="none"
        stroke="#ffd35c"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M2 74Q18 80 24 72"
        fill="none"
        stroke="#ffd35c"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
      />
      {puffs.map(([cx, cy, r]) => (
        <circle key={`o${cx}${cy}`} cx={cx} cy={cy} r={r + 2} fill={ink} />
      ))}
      {puffs.map(([cx, cy, r]) => (
        <circle key={`f${cx}${cy}`} cx={cx} cy={cy} r={r} fill="#ffd93b" />
      ))}
      {puffs.slice(0, 5).map(([cx, cy, r]) => (
        <circle
          key={`h${cx}${cy}`}
          cx={cx - r * 0.3}
          cy={cy - r * 0.35}
          r={r * 0.45}
          fill="#fff3a8"
        />
      ))}
      <g transform="rotate(-18 80 40)">
        <rect
          x="6"
          y="34"
          width="148"
          height="9"
          rx="4"
          fill="#d4201a"
          stroke={ink}
          strokeWidth="2.5"
        />
        <rect
          x="6"
          y="34"
          width="12"
          height="9"
          rx="3"
          fill="#e8b93c"
          stroke={ink}
          strokeWidth="2"
        />
        <rect
          x="142"
          y="34"
          width="12"
          height="9"
          rx="3"
          fill="#e8b93c"
          stroke={ink}
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

export function CrossedSwords({ className }: { className?: string }) {
  const sword = (angle: number, handle: string, blade: string) => (
    <g transform={`rotate(${angle} 80 128)`}>
      <path
        d="M76 20L80 8L84 20V96H76Z"
        fill={blade}
        stroke={ink}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M80 14V94" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <ellipse
        cx="80"
        cy="100"
        rx="12"
        ry="4"
        fill="#e8b93c"
        stroke={ink}
        strokeWidth="2"
      />
      <rect
        x="75"
        y="104"
        width="10"
        height="34"
        rx="2"
        fill={handle}
        stroke={ink}
        strokeWidth="2"
      />
      {[110, 118, 126].map((y) => (
        <path
          key={y}
          d={`M75 ${y}l10 5`}
          stroke={ink}
          strokeWidth="1.2"
          opacity="0.6"
        />
      ))}
    </g>
  );
  return (
    <svg
      viewBox="0 0 160 150"
      className={className}
      role="img"
      aria-label="Zoro's three swords, crossed"
    >
      {sword(-32, "#f4efe4", "#fbf9f3")}
      {sword(32, "#1d1c1a", "#2a2722")}
      {sword(0, "#c4211a", "#e8e4dc")}
      <path
        d="M60 118Q80 108 100 118L104 130Q80 122 56 130Z"
        fill="#1f7a4d"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M96 126L118 144L108 132L124 138L102 122Z"
        fill="#1f7a4d"
        stroke={ink}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PikachuTail({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Pikachu's tail and ears"
    >
      <path
        d="M22 8L44 44L34 48Z"
        fill="#ffd93b"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M22 8L30 22L36 20Z" fill={ink} />
      <path
        d="M52 4L62 42L50 44Z"
        fill="#ffd93b"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M52 4L55 18L60 16Z" fill={ink} />
      <path
        d="M40 114L50 96L42 92L64 70L54 64L88 30L80 22L116 6L100 40L108 44L78 70L86 76L62 96L68 100Z"
        fill="#ffd93b"
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M40 114L50 96L60 101L62 96L68 100Z"
        fill="#8a5a2b"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Gunbai({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      role="img"
      aria-label="Madara's gunbai war fan"
    >
      <rect
        x="55"
        y="92"
        width="10"
        height="62"
        rx="3"
        fill="#6b4a2b"
        stroke={ink}
        strokeWidth="2.5"
      />
      <path
        d="M52 100h16M52 112h16M52 124h16"
        stroke="#3a2715"
        strokeWidth="2"
      />
      <path
        d="M60 154q18 4 24-8"
        fill="none"
        stroke="#9a9a9a"
        strokeWidth="2.5"
        strokeDasharray="4 3"
      />
      <path
        d="M60 4C92 4 112 26 112 52C112 76 94 94 60 98C26 94 8 76 8 52C8 26 28 4 60 4Z"
        fill="#f1ead8"
        stroke={ink}
        strokeWidth="3"
      />
      <path d="M60 10C88 10 106 30 106 52C106 74 90 90 60 92Z" fill="#c4211a" />
      <path d="M60 4V98" stroke={ink} strokeWidth="2.5" />
      <path
        d="M60 14C84 14 100 30 100 52C100 72 86 86 60 88C34 86 20 72 20 52C20 30 36 14 60 14Z"
        fill="none"
        stroke={ink}
        strokeWidth="1.5"
        opacity="0.6"
      />
      {[
        [40, 36],
        [40, 68],
        [80, 52],
      ].map(([x, y]) => (
        <circle
          key={`${x}${y}`}
          cx={x}
          cy={y}
          r="7"
          fill="none"
          stroke={ink}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export function ChibiMadara({ className }: { className?: string }) {
  const hairBack =
    "M8 150L2 118L12 112L0 92L14 88L4 64L22 64L14 36L34 44L34 16L50 32L60 6L70 32L86 16L86 44L106 36L98 64L116 64L106 88L120 92L108 112L118 118L112 150Z";
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      role="img"
      aria-label="Chibi Madara"
    >
      <path d={hairBack} transform="translate(3 3)" fill="#000" opacity="0.5" />
      <path
        d={hairBack}
        fill="#17161c"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M22 60L30 80M42 36L46 62M78 36L74 62M98 60L90 80"
        stroke="#34323f"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* armor */}
      <path
        d="M18 128Q60 144 102 128L110 160H10Z"
        fill="#8e2a1f"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {[134, 144, 154].map((y) => (
        <path
          key={y}
          d={`M${20 - (y - 134) / 4} ${y}Q60 ${y + 12} ${100 + (y - 134) / 4} ${y}`}
          fill="none"
          stroke="#5a150f"
          strokeWidth="2.2"
        />
      ))}
      <path
        d="M34 122Q60 134 86 122L88 132Q60 144 32 132Z"
        fill="#1d1c22"
        stroke={ink}
        strokeWidth="2"
      />
      {/* face */}
      <path
        d="M32 82Q32 122 60 130Q88 122 88 82Z"
        fill="#ffe1cc"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M44 104l-2 6M76 104l2 6"
        stroke="#d9b39c"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* rinnegan eye */}
      <ellipse
        cx="70"
        cy="96"
        rx="7.5"
        ry="7"
        fill="#b9a3e6"
        stroke={ink}
        strokeWidth="1.8"
      />
      <circle
        cx="70"
        cy="96"
        r="4.6"
        fill="none"
        stroke={ink}
        strokeWidth="1"
      />
      <circle cx="70" cy="96" r="2" fill={ink} />
      <path
        d="M60 86l18-3"
        stroke={ink}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path d="M62 91q8-4 16 0" fill="none" stroke={ink} strokeWidth="1.4" />
      {/* stern mouth */}
      <path
        d="M52 116q8 2 16-1"
        fill="none"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* bangs, long over the left eye */}
      <path
        d="M30 94L28 70L38 76L42 58L50 74L58 56L64 72L72 58L78 74L86 64L90 92L84 80L80 88L74 74Q52 70 44 80L50 124L36 110Z"
        fill="#17161c"
        stroke={ink}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
