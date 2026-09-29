import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./not-found.css";

const dela = localFont({
  src: "./(manga)/fonts/dela-gothic-one.woff2",
  variable: "--font-dela",
});

export const metadata: Metadata = {
  title: "404 · Different world line",
};

const reading = "0.404404";

export default function NotFound() {
  return (
    <main className={`worldline ${dela.variable}`}>
      <p className="wl-label">Divergence meter</p>
      <div className="nixie" role="img" aria-label={`Divergence ${reading}`}>
        {reading.split("").map((ch, i) => (
          <span key={i} className={ch === "." ? "tube tube-dot" : "tube"}>
            <span className="glow">{ch}</span>
          </span>
        ))}
      </div>
      <h1 className="wl-title">
        You&apos;ve drifted to a different world line.
      </h1>
      <p className="wl-body">
        The page you were looking for doesn&apos;t exist on this one. It may
        have moved, or the link was mistyped.
      </p>
      <Link href="/" className="wl-btn">
        Return to the Steins;Gate world line →
      </Link>
      <p className="wl-note">
        ※ the divergence meter and world lines are a nod to Steins;Gate. El Psy
        Kongroo.
        <br />※ If Zoro can find his way back, so can you.
      </p>
    </main>
  );
}
