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

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the production URL (used for canonical links, Open Graph and the sitemap), then deploy to Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```
