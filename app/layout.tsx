import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CommandPaletteProvider } from "./_components/command-palette";
import { ScrollProgress } from "./_components/scroll-progress";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.domain}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.domain,
    title: site.title,
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: `${site.url}/og.png`,
        width: 1200,
        height: 630,
        alt: "Jyoti — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0e7" },
    { media: "(prefers-color-scheme: dark)", color: "#070b09" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`,
          }}
        />
      </head>

      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[95] focus:rounded focus:bg-accent-fill focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-accent-fill-ink"
        >
          skip to content
        </a>

        <CommandPaletteProvider>
          <ScrollProgress />
          <SiteHeader />

          <main id="main" className="flex-1">
            {children}
          </main>

          <SiteFooter />
        </CommandPaletteProvider>

        <div aria-hidden className="crt" />
        <div aria-hidden className="noise" />

        <div
          aria-hidden
          className="page-glow pointer-events-none fixed inset-0 -z-10"
        />
      </body>
    </html>
  );
}
