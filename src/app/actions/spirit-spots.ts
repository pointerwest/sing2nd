"use server"

import { revalidatePath } from "next/cache"

import {
  saveCommunitySpot,
  saveUploadedVideo,
} from "@/lib/spirit-spot-store"
import {
  isAffiliation,
  parseVideoUrl,
  type VideoSource,
} from "@/lib/spirit-spot-types"

const MAX_FILE_BYTES = 40 * 1024 * 1024
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SpiritSpotFormState = {
  ok: boolean
  message: string
}

export async function submitSpiritSpot(
  _prev: SpiritSpotFormState,
  formData: FormData
): Promise<SpiritSpotFormState> {
  try {
    const unitName = cleanText(formData.get("unitName"), 80)
    const affiliationRaw = String(formData.get("affiliation") ?? "")
    const location = cleanText(formData.get("location"), 80)
    const title = cleanText(formData.get("title"), 80)
    const message = cleanText(formData.get("message"), 400)
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase()
    const videoUrl = String(formData.get("videoUrl") ?? "").trim()
    const file = formData.get("video")
    const authorized = formData.get("authorized") === "yes"

    if (!authorized) {
      return {
        ok: false,
        message: "A unit representative has to confirm this spot can be shown.",
      }
    }

    if (unitName.length < 2 || location.length < 2 || title.length < 2) {
      return {
        ok: false,
        message: "Add the unit name, location, and a short title for the video.",
      }
    }

    if (!isAffiliation(affiliationRaw)) {
      return { ok: false, message: "Choose where this unit belongs." }
    }

    if (!EMAIL_PATTERN.test(email)) {
      return {
        ok: false,
        message: "Leave a real email so we can reach the unit if needed.",
      }
    }

    const uploaded = file instanceof File && file.size > 0 ? file : null
    let source: VideoSource

    if (uploaded) {
      if (uploaded.size > MAX_FILE_BYTES) {
        return {
          ok: false,
          message: "Keep the file under 40 MB, or paste a YouTube, Vimeo, or DVIDS link.",
        }
      }

      const id = crypto.randomUUID()
      const src = await saveUploadedVideo(uploaded, id)
      source = { kind: "file", src }
    } else {
      const parsed = parseVideoUrl(videoUrl)
      if (!parsed) {
        return {
          ok: false,
          message:
            "Upload an MP4, WebM, or MOV, or paste a YouTube, Vimeo, or DVIDS link.",
        }
      }
      source = parsed
    }

    await saveCommunitySpot({
      title,
      unitName,
      affiliation: affiliationRaw,
      location,
      message: message || undefined,
      email,
      source,
    })

    revalidatePath("/")
    return {
      ok: true,
      message: "Your unit's spirit video is on the wall.",
    }
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "The spot could not be saved. Try again.",
    }
  }
}

function cleanText(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max)
}
