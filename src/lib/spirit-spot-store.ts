import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import {
  type Affiliation,
  type SpiritSpot,
  type StoredSpiritSpot,
  type VideoSource,
} from "@/lib/spirit-spot-types"

const DATA_PATH = path.join(process.cwd(), "data", "spirit-spots.json")
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "spirit-spots")

const OFFICIAL_SPOTS: SpiritSpot[] = [
  {
    id: "official-usff-2024",
    title: "Fleet Forces Command spirit spot",
    unitName: "U.S. Fleet Forces Command",
    affiliation: "navy",
    location: "Virginia, United States",
    message:
      "A Navy command spot for the 125th meeting — the kind of film units still send home.",
    source: { kind: "dvids", id: "946116" },
    official: true,
    createdAt: "2024-12-10T00:00:00.000Z",
  },
  {
    id: "official-west-point-2025",
    title: "Go Army Beat Navy 2025",
    unitName: "United States Military Academy",
    affiliation: "west-point",
    location: "West Point, New York",
    message:
      "West Point channels 250 years of grit before America's Game.",
    source: { kind: "dvids", id: "989459" },
    official: true,
    createdAt: "2025-12-09T00:00:00.000Z",
  },
  {
    id: "official-fort-knox-2025",
    title: "Army Navy 2025 spirit video",
    unitName: "Fort Knox",
    affiliation: "army",
    location: "Fort Knox, Kentucky",
    message: "A post greeting from the field for the 126th meeting.",
    source: { kind: "dvids", id: "988537" },
    official: true,
    createdAt: "2025-12-03T00:00:00.000Z",
  },
  {
    id: "official-secnav-2025",
    title: "SECNAV spirit spot",
    unitName: "Office of the Secretary of the Navy",
    affiliation: "navy",
    location: "United States",
    message: "The Secretary of the Navy's 2025 Army-Navy spirit spot.",
    source: { kind: "dvids", id: "990172" },
    official: true,
    createdAt: "2025-12-14T00:00:00.000Z",
  },
]

export function toPublicSpot(spot: StoredSpiritSpot | SpiritSpot): SpiritSpot {
  return {
    id: spot.id,
    title: spot.title,
    unitName: spot.unitName,
    affiliation: spot.affiliation,
    location: spot.location,
    message: spot.message,
    source: spot.source,
    official: spot.official,
    createdAt: spot.createdAt,
  }
}

async function readCommunitySpots(): Promise<StoredSpiritSpot[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf8")
    const parsed = JSON.parse(raw) as StoredSpiritSpot[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function listSpiritSpots(): Promise<SpiritSpot[]> {
  const community = (await readCommunitySpots()).map(toPublicSpot)
  return [...OFFICIAL_SPOTS, ...community].sort((a, b) => {
    if (a.official !== b.official) return a.official ? -1 : 1
    return Date.parse(b.createdAt) - Date.parse(a.createdAt)
  })
}

export async function saveUploadedVideo(file: File, id: string) {
  const extension = extensionForFile(file)
  if (!extension) {
    throw new Error("Use an MP4, WebM, or MOV file.")
  }

  await mkdir(UPLOAD_DIR, { recursive: true })
  const filename = `${id}.${extension}`
  const dest = path.join(UPLOAD_DIR, filename)
  await writeFile(dest, Buffer.from(await file.arrayBuffer()))

  return `/uploads/spirit-spots/${filename}`
}

export async function saveCommunitySpot(input: {
  title: string
  unitName: string
  affiliation: Affiliation
  location: string
  message?: string
  email: string
  source: VideoSource
}) {
  const spots = await readCommunitySpots()
  if (spots.length >= 100) {
    throw new Error("The wall is full for now. Try a link instead, or check back later.")
  }

  const spot: StoredSpiritSpot = {
    id: crypto.randomUUID(),
    title: input.title,
    unitName: input.unitName,
    affiliation: input.affiliation,
    location: input.location,
    message: input.message,
    email: input.email,
    source: input.source,
    official: false,
    createdAt: new Date().toISOString(),
  }

  await mkdir(path.dirname(DATA_PATH), { recursive: true })
  await writeFile(DATA_PATH, JSON.stringify([spot, ...spots], null, 2), "utf8")
  return toPublicSpot(spot)
}

function extensionForFile(file: File) {
  const name = file.name.toLowerCase()
  if (name.endsWith(".mp4") || file.type === "video/mp4") return "mp4"
  if (name.endsWith(".webm") || file.type === "video/webm") return "webm"
  if (name.endsWith(".mov") || file.type === "video/quicktime") return "mov"
  return null
}
