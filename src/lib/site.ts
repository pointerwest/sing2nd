export const SITE_NAME = "Sing2nd"
export const SITE_URL = "https://sing2nd.com"

export const GAME = {
  name: "127th Army-Navy Game",
  alternateName: "America's Game",
  description:
    "The 127th meeting of Army and Navy football. Saturday, December 12, 2026, at 3:00 p.m. ET at MetLife Stadium in East Rutherford, New Jersey. Presented by USAA.",
  startDate: "2026-12-12T15:00:00-05:00",
  venue: "MetLife Stadium",
  city: "East Rutherford",
  region: "NJ",
  country: "US",
} as const

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (explicit) return explicit
  return SITE_URL
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl()
  if (path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function websiteJsonLd() {
  const url = getSiteUrl()
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url,
    description:
      "A tribute to the Army-Navy football classic: stories, spirit videos, and a countdown to America's Game.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url,
    },
  }
}

export function gameJsonLd() {
  const url = getSiteUrl()
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: GAME.name,
    alternateName: GAME.alternateName,
    description: GAME.description,
    startDate: GAME.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "American Football",
    url,
    image: absoluteUrl("/opengraph-image"),
    location: {
      "@type": "StadiumOrArena",
      name: GAME.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: GAME.city,
        addressRegion: GAME.region,
        addressCountry: GAME.country,
      },
    },
    organizer: [
      {
        "@type": "CollegeOrUniversity",
        name: "United States Military Academy",
        alternateName: "West Point",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "United States Naval Academy",
        alternateName: "Annapolis",
      },
    ],
    sponsor: {
      "@type": "Organization",
      name: "USAA",
    },
    competitor: [
      {
        "@type": "SportsTeam",
        name: "Army Black Knights",
      },
      {
        "@type": "SportsTeam",
        name: "Navy Midshipmen",
      },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Army tickets",
        url: "https://www.armygameday.com/army-navy-tickets",
        availability: "https://schema.org/PreOrder",
      },
      {
        "@type": "Offer",
        name: "Navy tickets",
        url: "https://navysports.com/sports/2024/2/9/2024-army-navy-faqs.aspx",
        availability: "https://schema.org/PreOrder",
      },
    ],
  }
}

