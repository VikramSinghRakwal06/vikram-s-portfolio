"use client";

import { useRef } from "react";
import { techniques } from "./EasterEgg";

const guide = [
  {
    no: "1",
    title: "Getting around",
    items: [
      "Read top to bottom, like a chapter-by-chapter volume. Every chapter has a plain-English subtitle.",
      "Jump to any chapter from the header. The red line under it shows how far you've read.",
      "The badge in the bottom-left corner shows your current chapter. Click it to jump to that chapter's start.",
    ],
  },
  {
    no: "2",
    title: "Things that react",
    items: [
      "Hover cards, panels and posters to see effects. On a phone, they play as you scroll past.",
      "Hover the Squad Roster scrolls to unroll them.",
      "Hover the domain expansion to lift Gojo's blindfold, and the Fitreak title for Gear 5.",
    ],
  },
  {
    no: "3",
    title: "Prefer it plain?",
    items: [
      "Plain mode (top right) shows the same content as a simple résumé that prints cleanly to PDF.",
    ],
  },
  {
    no: "4",
    title: "The ※ notes",
    items: [
      "Every anime reference has a small ※ note saying which series it's from. All artwork is original.",
    ],
  },
];

export function Manual() {
  const dialog = useRef<HTMLDialogElement>(null);

  const cast = (word: string) => {
    dialog.current?.close();
    window.dispatchEvent(new CustomEvent("cast-technique", { detail: word }));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="f-bebas border-2 border-[var(--ink)] px-3 pt-1 pb-0.5 text-lg transition-colors hover:bg-[var(--gold)]"
        aria-haspopup="dialog"
      >
        <span className="sm:hidden" aria-hidden>
          ?
        </span>
        <span className="sr-only sm:not-sr-only">How to read</span>
      </button>

      <dialog
        ref={dialog}
        className="manual"
        aria-labelledby="manual-title"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <div className="manual-head">
          <div>
            <p className="f-dela text-lg text-[var(--red)]">取扱説明書</p>
            <h2
              id="manual-title"
              className="f-dela text-3xl leading-none sm:text-4xl"
            >
              How to read this volume
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="f-bebas shrink-0 border-2 border-[var(--ink)] px-3 pt-1 pb-0.5 text-lg whitespace-nowrap hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            autoFocus
          >
            Close ✕
          </button>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
          {guide.map((g) => (
            <section key={g.no} className="manual-panel">
              <h3 className="f-bebas flex items-center gap-2 text-2xl leading-none">
                <span className="grid size-7 place-items-center bg-[var(--red)] pt-0.5 text-base text-white">
                  {g.no}
                </span>
                {g.title}
              </h3>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </section>
          ))}

          <section className="manual-panel manual-secret sm:col-span-2">
            <h3 className="f-bebas flex items-center gap-2 text-2xl leading-none">
              <span className="grid size-7 place-items-center bg-[var(--gold)] pt-0.5 text-base text-[var(--ink)]">
                5
              </span>
              Secret techniques
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed">
              Type a technique&apos;s name anywhere on the page, or tap the 忍
              logo five times for a random one. Or just click one below.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {techniques.map((t) => (
                <li key={t.words[0]}>
                  <button
                    type="button"
                    onClick={() => cast(t.words[0])}
                    className="technique-chip"
                  >
                    <span className="font-mono text-[13px]">{t.words[0]}</span>
                    <span className="text-[12px] opacity-75">{t.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </dialog>
    </>
  );
}
