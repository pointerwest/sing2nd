import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const src =
  "C:/Users/croni/.cursor/projects/c-Users-croni-Projects-sing2nd/assets/c__Users_croni_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_usna-b28f96a5-13ff-422a-bde1-3ef34a654d9a.png"
const dests = [
  "C:/Users/croni/Projects/sing2nd/public/usna-crest.png",
  "C:/Users/croni/Projects/sing2nd/public/annapolis-crest.png",
]

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
})

const pixels = Buffer.from(data)
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i]
  const g = pixels[i + 1]
  const b = pixels[i + 2]
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)

  if (min > 245 && max - min < 12) {
    pixels[i + 3] = 0
  } else if (min > 230 && max - min < 16) {
    pixels[i + 3] = Math.round(pixels[i + 3] * ((245 - min) / 15))
  }
}

const trimmed = await sharp(pixels, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 6 })
  .png()
  .toBuffer()

for (const dest of dests) {
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  await sharp(trimmed).png().toFile(dest)
  console.log(dest, fs.statSync(dest).size)
}
