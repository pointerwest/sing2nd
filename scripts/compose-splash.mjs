import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const assets = "C:/Users/croni/.cursor/projects/c-Users-croni-Projects-sing2nd/assets"
const westPointSrc = path.join(
  assets,
  "c__Users_croni_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_USMA-Crest-600X400-Black-Background-eb567f04-1a08-4f7d-9daa-71c612d669a7.png"
)
const navySrc = path.join(
  assets,
  "c__Users_croni_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Screenshot2024-09-15at9.27.18PM_1024x1024-151c22bb-2aee-488a-b1e8-ca4ccf8934d4.png"
)
const stadiumSrc = path.join(assets, "michie-stadium-empty.png")
const publicDir = "C:/Users/croni/Projects/sing2nd/public/images"
const westPointOut = path.join(publicDir, "west-point-crest.png")
const navyOut = path.join(publicDir, "navy-crest.png")
const splashOut = path.join(publicDir, "sing2nd-splash-crests.png")

async function knockOut(input, output, mode) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = Buffer.from(data)
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    if (mode === "black") {
      const brightness = (r + g + b) / 3
      if (brightness < 28 && max - min < 18) {
        pixels[i + 3] = 0
      } else if (brightness < 48 && max - min < 22) {
        pixels[i + 3] = Math.round(pixels[i + 3] * ((brightness - 28) / 20))
      }
    } else {
      if (min > 236) {
        pixels[i + 3] = 0
      } else if (min > 210) {
        pixels[i + 3] = Math.round(pixels[i + 3] * ((236 - min) / 26))
      }
    }
  }

  const trimmed = await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 8 })
    .png()
    .toBuffer()

  await sharp(trimmed).png().toFile(output)
  return sharp(trimmed).metadata()
}

fs.mkdirSync(publicDir, { recursive: true })

const westMeta = await knockOut(westPointSrc, westPointOut, "black")
const navyMeta = await knockOut(navySrc, navyOut, "white")
const stadium = sharp(stadiumSrc)
const stadiumMeta = await stadium.metadata()
const width = stadiumMeta.width ?? 1920
const height = stadiumMeta.height ?? 1080
const crestHeight = Math.round(height * 0.42)

const westCrest = await sharp(westPointOut)
  .resize({ height: crestHeight, fit: "inside" })
  .png()
  .toBuffer({ resolveWithObject: true })
const navyCrest = await sharp(navyOut)
  .resize({ height: crestHeight, fit: "inside" })
  .png()
  .toBuffer({ resolveWithObject: true })

const padding = Math.round(width * 0.07)
const top = Math.round((height - crestHeight) / 2)

await stadium
  .composite([
    {
      input: westCrest.data,
      left: padding,
      top: Math.round((height - westCrest.info.height) / 2),
    },
    {
      input: navyCrest.data,
      left: width - padding - navyCrest.info.width,
      top: Math.round((height - navyCrest.info.height) / 2),
    },
  ])
  .png()
  .toFile(splashOut)

console.log(
  JSON.stringify(
    {
      westPoint: westMeta,
      navy: navyMeta,
      splash: splashOut,
      stadium: { width, height },
      placed: { top, crestHeight },
    },
    null,
    2
  )
)
