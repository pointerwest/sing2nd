export const AFFILIATIONS = [
  { value: "west-point", label: "West Point — USMA", filter: "west-point" },
  { value: "annapolis", label: "Annapolis — USNA", filter: "annapolis" },
  { value: "army", label: "U.S. Army unit", filter: "worldwide" },
  { value: "navy", label: "U.S. Navy unit", filter: "worldwide" },
  { value: "marines", label: "U.S. Marine Corps", filter: "worldwide" },
  { value: "air-force", label: "U.S. Air Force", filter: "worldwide" },
  { value: "space-force", label: "U.S. Space Force", filter: "worldwide" },
  { value: "coast-guard", label: "U.S. Coast Guard", filter: "worldwide" },
  { value: "allied", label: "Allied / partner nation", filter: "worldwide" },
  { value: "other", label: "Other military unit", filter: "worldwide" },
] as const

export type Affiliation = (typeof AFFILIATIONS)[number]["value"]
export type SpiritFilter = "all" | "west-point" | "annapolis" | "worldwide"

export type VideoSource =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "dvids"; id: string }
  | { kind: "file"; src: string }

export type SpiritSpot = {
  id: string
  title: string
  unitName: string
  affiliation: Affiliation
  location: string
  message?: string
  source: VideoSource
  official: boolean
  createdAt: string
}

export type StoredSpiritSpot = SpiritSpot & { email: string }

const AFFILIATION_VALUES = new Set(AFFILIATIONS.map((item) => item.value))

export function isAffiliation(value: string): value is Affiliation {
  return AFFILIATION_VALUES.has(value as Affiliation)
}

export function affiliationLabel(value: Affiliation) {
  return AFFILIATIONS.find((item) => item.value === value)?.label ?? value
}

export function affiliationFilter(value: Affiliation): Exclude<SpiritFilter, "all"> {
  return value === "west-point" || value === "annapolis" ? value : "worldwide"
}

export function parseVideoUrl(raw: string): VideoSource | null {
  let url: URL
  try {
    url = new URL(raw.trim())
  } catch {
    return null
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return null
  }

  const host = url.hostname.replace(/^www\./, "")

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0]
    return id ? { kind: "youtube", id } : null
  }

  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    const id =
      url.searchParams.get("v") ||
      url.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)?.[1]
    return id ? { kind: "youtube", id } : null
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean).pop()
    return id && /^\d+$/.test(id) ? { kind: "vimeo", id } : null
  }

  if (host === "dvidshub.net") {
    const id = url.pathname.match(/\/video\/(?:embed\/)?(\d+)/)?.[1]
    return id ? { kind: "dvids", id } : null
  }

  return null
}

export function embedSrc(source: VideoSource) {
  switch (source.kind) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${source.id}`
    case "vimeo":
      return `https://player.vimeo.com/video/${source.id}`
    case "dvids":
      return `https://www.dvidshub.net/video/embed/${source.id}`
    case "file":
      return source.src
  }
}

export function isSafeFileSrc(src: string) {
  return /^\/uploads\/spirit-spots\/[a-z0-9-]+\.(mp4|webm|mov)$/i.test(src)
}
