"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border-2 border-[var(--ink)] bg-[var(--ink)] px-3 py-1 font-bold text-white hover:bg-[var(--red)]"
    >
      Print / Save PDF
    </button>
  );
}
