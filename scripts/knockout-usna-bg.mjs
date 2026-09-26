import fs from "node:fs"
import sharp from "sharp"

const src =
  "C:/Users/croni/.cursor/projects/c-Users-croni-Projects-sing2nd/assets/c__Users_croni_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Untitled_design__3_-44e1576a-ef04-4a1c-9a7e-2477e25dcb84.png"
const dests = [
  "C:/Users/croni/Projects/sing2nd/public/crests/untitled-design-3.png",
]

function isOuterWhite(r, g, b) {
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  return min > 232 && max - min < 18
}

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
})

const { width, height } = info
const pixels = Buffer.from(data)
const visited = new Uint8Array(width * height)
const stack = []

function idx(x, y) {
  return y * width + x
}

function pushIfOuterWhite(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return
  const i = idx(x, y)
  if (visited[i]) return
  const p = i * 4
  if (!isOuterWhite(pixels[p], pixels[p + 1], pixels[p + 2])) return
  visited[i] = 1
  stack.push(i)
}

for (let x = 0; x < width; x++) {
  pushIfOuterWhite(x, 0)
  pushIfOuterWhite(x, height - 1)
}
for (let y = 0; y < height; y++) {
  pushIfOuterWhite(0, y)
  pushIfOuterWhite(width - 1, y)
}

while (stack.length) {
  const i = stack.pop()
  const x = i % width
  const y = Math.floor(i / width)
  const p = i * 4
  pixels[p + 3] = 0
  pushIfOuterWhite(x + 1, y)
  pushIfOuterWhite(x - 1, y)
  pushIfOuterWhite(x, y + 1)
  pushIfOuterWhite(x, y - 1)
}

const trimmed = await sharp(pixels, {
  raw: { width, height, channels: 4 },
})
  .trim({ threshold: 4 })
  .png()
  .toBuffer()

for (const dest of dests) {
  fs.mkdirSync(dest.slice(0, dest.lastIndexOf("/")), { recursive: true })
  await sharp(trimmed).png().toFile(dest)
  console.log(dest, fs.statSync(dest).size)
}
