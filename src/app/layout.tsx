import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { profile, siteUrl } from "@/data/profile";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  preload: false,
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Java backend engineer building REST APIs and event-driven microservices with Spring Boot, Kafka, PostgreSQL, and Redis.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  keywords: [
    "Vikram Singh",
    "Java Backend Engineer",
    "Spring Boot",
    "Microservices",
    "Apache Kafka",
    "PostgreSQL",
    "REST APIs",
    "Software Engineer Pune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4efe4",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressCountry: "IN",
  },
  worksFor: { "@type": "Organization", name: "Fitreak" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bharati Vidyapeeth Deemed University",
  },
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Microservices",
    "Apache Kafka",
    "PostgreSQL",
    "Redis",
    "Docker",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
