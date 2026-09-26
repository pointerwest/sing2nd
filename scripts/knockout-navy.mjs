import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const src =
  "C:/Users/croni/.cursor/projects/c-Users-croni-Projects-sing2nd/assets/c__Users_croni_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Screenshot2024-09-15at9.27.18PM_1024x1024-151c22bb-2aee-488a-b1e8-ca4ccf8934d4.png"
const dest = "C:/Users/croni/Projects/sing2nd/public/images/navy-crest-clear.png"

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

  // Knock out paper-white only. Keep gold (high max, lower min) and navy.
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

fs.mkdirSync(path.dirname(dest), { recursive: true })
await sharp(trimmed).png().toFile(dest)
console.log(await sharp(dest).metadata())
