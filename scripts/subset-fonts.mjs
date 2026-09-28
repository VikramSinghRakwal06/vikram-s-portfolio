// Subsets the Japanese-capable fonts to only the glyphs the site uses.
// Re-run (`npm run fonts`) whenever Japanese text in src/ changes.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import subsetFont from "subset-font";

const OUT = "src/app/(manga)/fonts";
const CACHE = "node_modules/.cache/font-sources";

// Full source fonts are cached so re-runs work offline.
async function sourceFont(family, weight) {
  const cached = join(CACHE, `${family.replace(/ /g, "-")}-${weight}.ttf`);
  try {
    return await readFile(cached);
  } catch {}
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
    )
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) throw new Error(`No TTF source for ${family} ${weight}`);
  const ttf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await mkdir(CACHE, { recursive: true });
  await writeFile(cached, ttf);
  return ttf;
}
const fonts = [
  { family: "Dela Gothic One", weight: 400, file: "dela-gothic-one.woff2" },
  { family: "Zen Kaku Gothic New", weight: 400, file: "zen-kaku-400.woff2" },
  { family: "Zen Kaku Gothic New", weight: 700, file: "zen-kaku-700.woff2" },
  // Decorative fonts only ever render these words.
  { family: "Rye", weight: 400, file: "rye.woff2", text: "WANTED" },
  {
    family: "UnifrakturMaguntia",
    weight: 400,
    file: "fraktur.woff2",
    text: "Backend Note",
  },
  {
    family: "Press Start 2P",
    weight: 400,
    file: "pixel.woff2",
    text: " !\"#'()*+,-./0123456789:;?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzéÉ▶▼×·",
  },
  {
    family: "IM Fell English SC",
    weight: 400,
    file: "fell.woff2",
    text: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz -.",
  },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(tsx?|css)$/.test(entry.name)) yield path;
  }
}

const chars = new Set();
for (let c = 0x20; c <= 0x7e; c++) chars.add(String.fromCharCode(c));
for (const c of "’‘“”—–·…★✦✕→↗↓▶⏱•°é") chars.add(c);
for await (const file of walk("src")) {
  for (const ch of await readFile(file, "utf8"))
    if (ch.codePointAt(0) > 0x7e) chars.add(ch);
}
const text = [...chars].join("");

for (const { family, weight, file, text: only } of fonts) {
  const ttf = await sourceFont(family, weight);
  const woff2 = await subsetFont(ttf, only ?? text, { targetFormat: "woff2" });
  await writeFile(join(OUT, file), woff2);
  console.log(
    `${file}: ${(ttf.length / 1024).toFixed(0)} KB → ${(woff2.length / 1024).toFixed(1)} KB`,
  );
}
console.log(`${chars.size} glyphs kept`);
