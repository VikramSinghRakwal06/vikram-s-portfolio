type BoxProps = {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  accent?: boolean;
  tag?: string;
};

function Box({ x, y, w, h = 56, title, sub, accent, tag }: BoxProps) {
  const cx = x + w / 2;
  return (
    <g>
      {tag && (
        <text
          x={x + 8}
          y={y - 5}
          fontSize={9}
          fontWeight={700}
          letterSpacing="0.08em"
          fill="var(--accent)"
          stroke="var(--bg-raised)"
          strokeWidth={4}
          paintOrder="stroke"
        >
          {tag}
        </text>
      )}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={accent ? "var(--accent-soft)" : "var(--bg-raised)"}
        stroke={accent ? "var(--accent)" : "var(--line-strong)"}
        strokeWidth={1}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={12.5}
        fontWeight={600}
        fill="var(--fg)"
      >
        {title}
      </text>
      {sub && (
        <text
          x={cx}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fontSize={10}
          fill="var(--fg-muted)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Db({
  x,
  y,
  w,
  label,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <path
        d={`M${x} ${y + 6} v26 a${w / 2} 6 0 0 0 ${w} 0 v-26`}
        fill="var(--bg-sunken)"
        stroke="var(--line-strong)"
      />
      <ellipse
        cx={cx}
        cy={y + 6}
        rx={w / 2}
        ry={6}
        fill="var(--bg-raised)"
        stroke="var(--line-strong)"
      />
      <text
        x={cx}
        y={y + 29}
        textAnchor="middle"
        fontSize={10}
        fill="var(--fg-muted)"
      >
        {label}
      </text>
    </g>
  );
}

const line = { stroke: "var(--line-strong)", strokeWidth: 1.25, fill: "none" };
const flow = { stroke: "var(--accent)", strokeWidth: 1.5, fill: "none" };

const codenames: Record<string, string> = {
  "Next.js client": "THE VILLAGE",
  "Spring Cloud Gateway": "GATEKEEPER",
  Redis: "SHADOW CLONES",
  "auth-service": "BARRIER CORPS",
  "group-service": "SQUAD REGISTRY",
  "expense-service": "QUARTERMASTER",
  Kafka: "KASUGAI CROWS",
  notification: "MESSENGER",
};

export function ArchitectureDiagram({ anime = false }: { anime?: boolean }) {
  const tag = (t: string) => (anime ? codenames[t] : undefined);
  const services = [
    { x: 20, title: "auth-service", sub: "access + refresh JWT" },
    { x: 165, title: "group-service", sub: "groups · members" },
    { x: 310, title: "expense-service", sub: "splits · settle-up" },
  ];
  const databases = [
    ...services.map((s) => ({
      x: s.x,
      w: 130,
      label: s.title.replace("-service", "_db"),
    })),
    { x: 596, w: 104, label: "notification_db" },
  ];

  return (
    <figure className="overflow-x-auto">
      <svg
        viewBox="0 0 720 330"
        role="img"
        aria-labelledby="arch-title arch-desc"
        className="min-w-[640px] font-mono"
      >
        <title id="arch-title">SplitExpense architecture</title>
        <desc id="arch-desc">
          A Next.js client calls Spring Cloud Gateway, which validates JWTs,
          rate limits with Redis, and routes to auth, group, and expense
          services. Each service has its own PostgreSQL database. The expense
          service publishes balance events to Kafka, which the notification
          service consumes.
        </desc>
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 10 5 0 10z" fill="var(--line-strong)" />
          </marker>
          <marker
            id="arrow-accent"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 10 5 0 10z" fill="var(--accent)" />
          </marker>
        </defs>

        <path d="M170 52 H244" {...line} markerEnd="url(#arrow)" />
        <path
          d="M470 52 H544"
          {...line}
          markerEnd="url(#arrow)"
          markerStart="url(#arrow)"
        />
        <text
          x={507}
          y={44}
          textAnchor="middle"
          fontSize={9}
          fill="var(--fg-subtle)"
        >
          rate limit
        </text>
        <text
          x={207}
          y={44}
          textAnchor="middle"
          fontSize={9}
          fill="var(--fg-subtle)"
        >
          HTTPS
        </text>

        <path d="M360 80 V112 M85 112 H375" {...line} />
        {services.map((s) => (
          <path
            key={s.title}
            d={`M${s.x + 65} 112 V146`}
            {...line}
            markerEnd="url(#arrow)"
          />
        ))}

        {databases.map((d) => (
          <path
            key={d.label}
            d={`M${d.x + d.w / 2} 206 V240`}
            {...line}
            markerEnd="url(#arrow)"
          />
        ))}

        <path
          d="M440 178 H470"
          {...flow}
          className="flow"
          markerEnd="url(#arrow-accent)"
        />
        <path
          d="M582 178 H592"
          {...flow}
          className="flow"
          markerEnd="url(#arrow-accent)"
        />

        <Box
          x={20}
          y={24}
          w={150}
          title="Next.js client"
          tag={tag("Next.js client")}
          sub="web frontend"
        />
        <Box
          x={250}
          y={24}
          w={220}
          title="Spring Cloud Gateway"
          tag={tag("Spring Cloud Gateway")}
          sub="JWT · routing · rate limits"
          accent
        />
        <Box
          x={550}
          y={24}
          w={150}
          title="Redis"
          tag={tag("Redis")}
          sub="limits · balance cache"
        />

        {services.map((s) => (
          <Box
            key={s.title}
            x={s.x}
            y={150}
            w={130}
            title={s.title}
            sub={s.sub}
            tag={tag(s.title)}
          />
        ))}
        <Box
          x={474}
          y={150}
          w={108}
          title="Kafka"
          tag={tag("Kafka")}
          sub="balance events"
          accent
        />
        <Box
          x={596}
          y={150}
          w={104}
          title="notification"
          tag={tag("notification")}
          sub="consumer"
        />

        {databases.map((d) => (
          <Db key={d.label} x={d.x} y={244} w={d.w} label={d.label} />
        ))}

        <text
          x={360}
          y={318}
          textAnchor="middle"
          fontSize={10}
          fill="var(--fg-subtle)"
        >
          {anime
            ? "PostgreSQL · every squad guards its own scroll · Flyway migrations"
            : "PostgreSQL · one database per service · Flyway migrations"}
        </text>
      </svg>
    </figure>
  );
}
