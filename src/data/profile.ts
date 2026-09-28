export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const profile = {
  name: "Vikram Singh",
  role: "Java Backend Engineer",
  headline: "I build backend systems that stay correct under load.",
  intro:
    "Java and Spring Boot engineer building REST APIs and event-driven microservices on PostgreSQL, Kafka, and Redis. Currently a Full-Stack Developer at Fitreak.",
  location: "Pune, India",
  availability: "Open to Bengaluru, Mumbai, or remote",
  email: "vikramrakwal9682@gmail.com",
  resume: "/VikramSingh_Resume.pdf",
  links: {
    github: "https://github.com/VikramSinghRakwal06",
    linkedin: "https://www.linkedin.com/in/vikram-singh-9384b5250",
    linktree: "https://linktree-three-gray.vercel.app",
  },
};

export const about = [
  "I work mostly in Java and Spring Boot. Most of what I build is REST APIs and microservices on PostgreSQL, with Spring Security for auth, Kafka for service-to-service events, and Docker Compose to bring the whole thing up with one command.",
  "I care about the parts of backend work that don't show up in a demo: indexes that match real query patterns, removing N+1 queries, keeping slow work like notifications off the request path, and schemas that won't need rewriting in six months.",
  "When a service needs a frontend, I build that too, in React and Next.js.",
];

export const stats = [
  { value: "5", label: "Spring Boot microservices in SplitExpense" },
  { value: "30%", label: "API latency cut at Vartagram" },
  { value: "9.07", label: "CGPA, B.Tech CSBS" },
  { value: "500+", label: "DSA problems solved" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  mode: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Fitreak",
    role: "Full-Stack Developer",
    period: "Jun 2026 – Present",
    mode: "Remote",
    current: true,
    points: [
      "Integrated the storefront with a Java and Spring Boot commerce backend on MySQL and Redis, consuming its REST endpoints and configuring service-to-service networking across Docker Compose containers.",
      "Leading frontend development of the storefront in Next.js.",
      "Contributing to the storefront migration from Shopify to a custom Next.js 14 app, rebuilding catalog, cart, and checkout to remove platform lock-in.",
      "Cut initial bundle size by 28% with route-based code splitting and image optimization, improving Core Web Vitals on the highest-traffic pages.",
      "Owned the product redesign in Figma and built a reusable component library now used across the storefront.",
    ],
    stack: ["Spring Boot", "MySQL", "Redis", "Docker Compose", "Next.js"],
  },
  {
    company: "Vartagram",
    role: "Software Development Engineer Intern, Full-Stack",
    period: "Jun 2025 – Sep 2025",
    mode: "Remote",
    points: [
      "Optimized 3 high-traffic PostgreSQL endpoints with composite indexes and by eliminating N+1 queries, reducing API latency by 30%.",
      "Fixed 2 REST API performance bottlenecks found during code review.",
      "Shipped 6 mobile-first PWA features in React and Next.js across 3 Agile sprints.",
    ],
    stack: ["PostgreSQL", "REST", "React", "Next.js"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  points: string[];
  stack: string[];
  repo: string;
  live?: string;
};

export const featuredProject: Project = {
  name: "SplitExpense",
  tagline: "Expense-sharing platform built as Java microservices",
  description:
    "A Splitwise-style app split into 5 Spring Boot services, each with its own PostgreSQL database, behind a single Spring Cloud Gateway.",
  points: [
    "Spring Cloud Gateway is the only public entry point. It handles JWT validation, routing, and Redis-backed rate limiting, and auth-service issues access and refresh tokens.",
    "Equal, exact, percentage, and weighted splits, plus settle-up with partial payments. Every balance change is published to Kafka as a domain event.",
    "Notifications run in a separate Kafka consumer service, so they stay out of the request path. Balance reads are cached in Redis.",
    "One-command Docker Compose bring-up with Flyway migrations and Swagger docs for every service.",
  ],
  stack: [
    "Java 21",
    "Spring Boot",
    "Spring Cloud Gateway",
    "Spring Security (JWT)",
    "Spring Data JPA",
    "Apache Kafka",
    "PostgreSQL",
    "Redis",
    "Flyway",
    "Docker Compose",
    "Next.js",
  ],
  repo: "https://github.com/VikramSinghRakwal06/split-expense",
};

export const projects: Project[] = [
  {
    name: "Synapse",
    tagline: "Real-time chat and video platform",
    description:
      "Real-time messaging over Socket.io and peer-to-peer video calls over WebRTC, using STUN/TURN servers for NAT traversal.",
    points: [
      "Sessions secured with JWT.",
      "Deployment automated through a GitHub Actions pipeline.",
    ],
    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "WebRTC",
      "JWT",
      "Docker",
    ],
    repo: "https://github.com/VikramSinghRakwal06/synapse",
    live: "https://synapse-phi-one.vercel.app",
  },
  {
    name: "Expense Tracker",
    tagline: "Spend analytics dashboard",
    description:
      "APIs built on MongoDB aggregation pipelines that power category-wise spend analytics, budgeting, and charts over a normalized transaction model.",
    points: [],
    stack: ["React", "Node.js", "MongoDB", "Recharts"],
    repo: "https://github.com/VikramSinghRakwal06/ExpenseTracker",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Java (8–21)", "SQL", "JavaScript", "TypeScript", "C++"],
  },
  {
    group: "Spring",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security (JWT)",
      "Spring Data JPA",
      "Hibernate",
      "Spring Cloud Gateway",
      "Spring Kafka",
      "Bean Validation",
      "Flyway",
      "Maven",
      "JUnit 5",
      "Mockito",
    ],
  },
  {
    group: "Backend",
    items: [
      "REST APIs",
      "Microservices",
      "Event-Driven Architecture",
      "Apache Kafka",
      "API Gateway",
      "Caching",
      "Rate Limiting",
      "System Design",
      "Node.js",
      "Express.js",
    ],
  },
  {
    group: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Schema design",
      "Indexing",
      "Transactions",
      "Query optimization",
    ],
  },
  {
    group: "Core Java",
    items: [
      "OOP",
      "Collections",
      "Generics",
      "Streams & Lambdas",
      "Multithreading & Concurrency",
      "JVM Internals",
      "Garbage Collection",
      "SOLID",
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, RDS, IAM, CloudWatch)",
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "CI/CD",
      "Linux",
    ],
  },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js (App Router)",
      "Redux Toolkit",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    group: "Practices",
    items: [
      "Agile/Scrum",
      "TDD",
      "Code Review",
      "Git",
      "Postman",
      "OpenAPI/Swagger",
    ],
  },
];

export const education = [
  {
    school: "Bharati Vidyapeeth Deemed University, Pune",
    degree: "B.Tech, Computer Science and Business Systems",
    detail: "CGPA 9.07 / 10.0",
    period: "Jun 2026",
  },
  {
    school: "Ajanta Higher Secondary School",
    degree: "HSC, Physics, Chemistry, Mathematics",
    detail: "95.6%",
    period: "2022",
  },
];

export const achievements = [
  "1st place, Smart India Hackathon 2024 college round (50+ teams)",
  "1st place, Zero Errors Zone debugging competition",
  "500+ data structures and algorithms problems solved on LeetCode, NeetCode, and GeeksforGeeks",
  "Deputy Joint Secretary, CSBS Student Association, BVDU. Led logistics for 2 events with 500+ participants",
  "Documentation fixes merged into awesome-react and awesome-nodejs (50k+ stars each)",
];

// Self-assessed strengths shown on the Nen chart (0–100). Edit freely.
export const nen = [
  { type: "Enhancer", jp: "強化", skill: "Core Java & Spring", value: 95 },
  { type: "Emitter", jp: "放出", skill: "REST APIs & Kafka", value: 85 },
  { type: "Manipulator", jp: "操作", skill: "Docker & CI/CD", value: 60 },
  { type: "Specialist", jp: "特質", skill: "System design", value: 70 },
  { type: "Conjurer", jp: "具現化", skill: "React & Next.js", value: 65 },
  { type: "Transmuter", jp: "変化", skill: "SQL & data modeling", value: 80 },
];
