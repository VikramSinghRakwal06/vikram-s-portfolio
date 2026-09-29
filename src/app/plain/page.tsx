import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import type { ReactNode } from "react";
import { Shuriken } from "../(manga)/Motifs";
import {
  about,
  achievements,
  education,
  experience,
  featuredProject,
  profile,
  projects,
  skills,
} from "@/data/profile";
import { PrintButton } from "./PrintButton";
import "./plain.css";

const dela = localFont({
  src: "../(manga)/fonts/dela-gothic-one.woff2",
  variable: "--font-dela",
});
const zen = localFont({
  src: [
    { path: "../(manga)/fonts/zen-kaku-400.woff2", weight: "400" },
    { path: "../(manga)/fonts/zen-kaku-700.woff2", weight: "700" },
  ],
  variable: "--font-zen",
});

export const metadata: Metadata = {
  title: "Résumé (plain version)",
  description: `${profile.name}, ${profile.role}. Plain, printable version of the portfolio.`,
  alternates: { canonical: "/plain" },
};

function Chapter({
  no,
  title,
  jp,
  children,
}: {
  no: string;
  title: string;
  jp: string;
  children: ReactNode;
}) {
  return (
    <section className="chapter">
      <h2 className="chapter-head">
        <span className="chapter-no">{no}</span>
        <span className="chapter-title">{title}</span>
        <span className="chapter-jp" aria-hidden>
          {jp}
        </span>
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <Shuriken className="mt-[0.45em] size-3 shrink-0 text-[var(--red)]" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

const glance = [
  { v: "30%", l: "API latency cut", s: "Vartagram" },
  { v: "28%", l: "Smaller initial bundle", s: "Fitreak" },
  { v: "5", l: "Spring Boot microservices", s: "SplitExpense" },
  { v: "9.07", l: "CGPA, B.Tech CSBS", s: "BVDU" },
];

export default function PlainPage() {
  return (
    <div className={`plain ${dela.variable} ${zen.variable}`}>
      <header className="plain-bar print:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3 text-sm lg:max-w-6xl">
          <Link href="/" className="font-bold hover:text-[var(--red)]">
            ← Manga mode
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-4 hover:text-[var(--red)]"
            >
              PDF
            </a>
            <PrintButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pt-12 pb-20 lg:max-w-6xl print:p-0">
        <div className="plain-layout">
          <aside className="plain-side">
            <div className="o-id">
              <header className="flex items-start gap-5">
                <span className="hanko" aria-hidden>
                  忍
                </span>
                <div className="min-w-0">
                  <h1 className="f-dela text-4xl leading-none sm:text-5xl">
                    {profile.name}
                  </h1>
                  <p className="mt-2 text-lg font-bold">
                    {profile.role}
                    <span className="font-normal text-[var(--ink-2)]">
                      {" "}
                      · Full-Stack Developer at Fitreak
                    </span>
                  </p>
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--ink-2)]">
                    <span>
                      {profile.location} · {profile.availability}
                    </span>
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <a href={`mailto:${profile.email}`} className="plain-link">
                      {profile.email}
                    </a>
                    <a href={profile.links.github} className="plain-link">
                      github.com/VikramSinghRakwal06
                    </a>
                    <a href={profile.links.linkedin} className="plain-link">
                      LinkedIn
                    </a>
                  </p>
                </div>
              </header>
            </div>
            <div className="o-glance">
              <dl className="glance">
                {glance.map((g) => (
                  <div key={g.l}>
                    <dt className="sr-only">{g.l}</dt>
                    <dd>
                      <span className="f-dela block text-3xl leading-none text-[var(--red)]">
                        {g.v}
                      </span>
                      <span className="mt-2 block text-sm leading-snug font-bold">
                        {g.l}
                      </span>
                      <span className="block text-xs text-[var(--ink-3)]">
                        {g.s}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="o-skills">
              <Chapter no="04" title="Skills" jp="技能">
                <dl className="space-y-4">
                  {skills.map((g) => (
                    <div key={g.group} className="skill-row">
                      <dt className="font-bold">{g.group}</dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5 sm:mt-0">
                        {g.items.map((it) => (
                          <span key={it} className="chip">
                            {it}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Chapter>
            </div>
            <div className="o-edu">
              <Chapter no="05" title="Education" jp="学歴">
                <div className="space-y-4">
                  {education.map((e) => (
                    <div
                      key={e.school}
                      className="flex flex-wrap items-baseline justify-between gap-x-4"
                    >
                      <div>
                        <h3 className="font-bold">{e.school}</h3>
                        <p className="text-[var(--ink-2)]">
                          {e.degree} ·{" "}
                          <span className="font-bold text-[var(--red)]">
                            {e.detail}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-[var(--ink-3)]">{e.period}</p>
                    </div>
                  ))}
                </div>
              </Chapter>
            </div>
          </aside>
          <div className="plain-main">
            <div className="o-summary">
              <Chapter no="01" title="Summary" jp="概要">
                <p className="text-[1.0625rem]">{about[0]}</p>
                <p className="print-hide mt-3 text-[var(--ink-2)]">
                  {about[1]}
                </p>
              </Chapter>
            </div>
            <div className="o-exp">
              <Chapter no="02" title="Experience" jp="経歴">
                <div className="space-y-6">
                  {experience.map((job) => (
                    <article key={job.company} className="entry">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-lg font-bold">
                          {job.company}
                          {job.current && (
                            <span className="stamp-now">Now</span>
                          )}
                        </h3>
                        <p className="text-sm text-[var(--ink-3)]">
                          {job.period} · {job.mode}
                        </p>
                      </div>
                      <p className="font-bold text-[var(--ink-2)]">
                        {job.role}
                      </p>
                      <Bullets items={job.points} />
                      <p className="tech">{job.stack.join(" · ")}</p>
                    </article>
                  ))}
                </div>
              </Chapter>
            </div>
            <div className="o-proj">
              <Chapter no="03" title="Projects" jp="作品">
                <div className="space-y-6">
                  {[featuredProject, ...projects].map((p, i) => (
                    <article key={p.name} className="entry">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-lg font-bold">
                          <a href={p.repo} className="plain-link">
                            {p.name}
                          </a>
                          {i === 0 && (
                            <span className="stamp-now">Featured</span>
                          )}
                        </h3>
                        {p.live && (
                          <a href={p.live} className="plain-link text-sm">
                            Live demo ↗
                          </a>
                        )}
                      </div>
                      <p className="font-bold text-[var(--ink-2)]">
                        {p.tagline}
                      </p>
                      <p className="mt-2">{p.description}</p>
                      {p.points.length > 0 && <Bullets items={p.points} />}
                      <p className="tech">{p.stack.join(" · ")}</p>
                    </article>
                  ))}
                </div>
              </Chapter>
            </div>
            <div className="o-ach">
              <Chapter no="06" title="Achievements" jp="実績">
                <Bullets items={achievements} />
              </Chapter>
            </div>
          </div>
        </div>

        <footer className="mt-14 flex items-center justify-between border-t-2 border-[var(--ink)] pt-4 text-sm print:hidden">
          <span>
            <span className="f-dela mr-2 text-[var(--red)]">完</span>
            {profile.name} · {profile.email}
          </span>
          <Link href="/" className="plain-link">
            Read the manga version →
          </Link>
        </footer>
      </main>
    </div>
  );
}
