import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const lines = Array.from({ length: 72 }, (_, i) => (i * 360) / 72);
const tagline = "Java backend · Spring Boot";
const text = [...new Set(`VOL. 01 WEEKLY BACKEND VIKRAM SINGH VS ${tagline}`)].join("");

async function loadFont() {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Dela+Gothic+One&text=${encodeURIComponent(text)}`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error("Could not load Dela Gothic One for the OG image");
  return (await fetch(url)).arrayBuffer();
}

export default async function OpengraphImage() {
  const dela = await loadFont();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#f4efe4",
        color: "#15130f",
        fontFamily: "Dela",
        overflow: "hidden",
        border: "12px solid #15130f",
      }}
    >
      <div
        style={{ position: "absolute", left: 870, top: 315, display: "flex" }}
      >
        {lines.map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute",
              width: 900,
              height: 3,
              background: "#15130f",
              opacity: 0.55,
              transformOrigin: "0 50%",
              transform: `rotate(${deg}deg) translateX(210px)`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 690,
          top: 135,
          width: 360,
          height: 360,
          borderRadius: 999,
          background: "#d7261e",
          border: "8px solid #15130f",
          boxShadow: "14px 14px 0 #15130f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f4efe4",
          fontSize: 150,
          fontWeight: 900,
          letterSpacing: -6,
        }}
      >
        VS
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 70px",
          width: 680,
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              background: "#d7261e",
              color: "#fff",
              fontSize: 28,
              fontWeight: 800,
              padding: "4px 14px",
            }}
          >
            VOL. 01
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#6f695d" }}>
            WEEKLY BACKEND
          </div>
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            lineHeight: 0.9,
            marginTop: 28,
            letterSpacing: -4,
          }}
        >
          VIKRAM
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            lineHeight: 0.9,
            color: "#d7261e",
            letterSpacing: -4,
          }}
        >
          SINGH
        </div>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            background: "#fff",
            border: "4px solid #15130f",
            borderRadius: 40,
            padding: "16px 28px",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          {tagline}
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Dela", data: dela, weight: 400, style: "normal" }] },
  );
}
