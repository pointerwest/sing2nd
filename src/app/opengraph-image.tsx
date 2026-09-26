import { ImageResponse } from "next/og"

export const alt =
  "America's Game — the 127th Army-Navy Football Classic at MetLife Stadium"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #1a120c 0%, #3f4634 48%, #1e3358 100%)",
          color: "#f3efe6",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6 }}>
          SING2ND
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: 4,
              lineHeight: 1.05,
            }}
          >
            AMERICA'S GAME
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 32 }}>
            127th Army-Navy Football Classic
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, opacity: 0.88 }}>
          December 12, 2026 · 3:00 p.m. ET · MetLife Stadium
        </div>
      </div>
    ),
    { ...size }
  )
}
