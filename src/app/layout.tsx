import type { Metadata } from "next"
import { Cinzel, Geist, Geist_Mono, Graduate } from "next/font/google"

import { Providers } from "@/components/providers"
import { getSiteUrl } from "@/lib/site"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const graduate = Graduate({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-graduate",
})

const cinzel = Cinzel({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
})

const siteUrl = getSiteUrl()
const defaultTitle = "Sing2nd | The Army-Navy Football Classic"
const defaultDescription =
  "A heart-warming tribute to the Army-Navy football classic: stories, spirit videos from West Point, Annapolis, and units worldwide, a live countdown to kickoff, tickets, hotels, and restaurants."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Sing2nd",
  },
  description: defaultDescription,
  applicationName: "Sing2nd",
  category: "sports",
  keywords: [
    "Army Navy Game 2026",
    "America's Game",
    "Army-Navy Football Classic",
    "127th Army Navy Game",
    "MetLife Stadium",
    "West Point",
    "Annapolis",
    "USMA",
    "USNA",
    "Sing2nd",
  ],
  authors: [{ name: "Sing2nd" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Sing2nd",
    title: defaultTitle,
    description:
      "Stories, films, and a countdown to America's Game at MetLife Stadium on December 12, 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "Stories, films, and a countdown to America's Game at MetLife Stadium on December 12, 2026.",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${graduate.variable} ${cinzel.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
