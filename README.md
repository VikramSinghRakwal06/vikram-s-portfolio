# Vikram Singh — Portfolio (Vol. 01)

A manga-volume portfolio: Java backend engineer, told in chapters. Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Fully static.

## Develop

```bash
npm install
npm run dev
```

## Edit content

- Copy and data: [`src/data/profile.ts`](src/data/profile.ts)
- Page and chapters: [`src/app/(manga)/page.tsx`](<src/app/(manga)/page.tsx>)
- Anime icons (kunai, Sharingan, grimoire, star orbs…): [`src/app/(manga)/Motifs.tsx`](<src/app/(manga)/Motifs.tsx>)
- Résumé: replace `public/VikramSingh_Resume.pdf`

All artwork is original SVG/CSS; anime references are labelled on the page as homages.

### Character faces in the secret techniques

Drop a square portrait into `public/characters/` named after the character, then rebuild. It appears as a round icon next to that technique's symbol:

`sukuna` · `gojo` · `madara` · `deku` · `jinwoo` · `luffy` · `ichigo` · `kid-goku` · `pikachu` · `greninja` · `zoro` · `tanjiro` · `zenitsu` · `inosuke`; allies: `naruto` · `sasuke` · `kakashi` · `sakura` · `guy` (Tsukuyomi), `bakugo` · `allmight` (Plus Ultra), `yami` · `yuno` (Anti Magic); extras: `ash`, `asta`, `sanji`, `blackbulls`, `clover`, `pikachu-run`, `squirtle` · `bulbasaur` · `charmander` (Pikachu allies), scenes `goku-ui`, `greninja-scene`, `yami-scene`, `pikachu-scene`, `charizard-scene`; Charizard: `charizard` · `charizard-x` · `charizard-mandala` · `seismic`

Any of `.png`, `.jpg`, `.webp` or `.avif` works (for example `public/characters/gojo.webp`). Missing files fall back to the symbol alone; Madara has a drawn portrait by default. Only use images you have the rights to.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the production URL (used for canonical links, Open Graph and the sitemap), then deploy to Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```
