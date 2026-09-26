"use client"

import { useLayoutEffect, useRef } from "react"

const OCP =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 200" preserveAspectRatio="none"><rect width="480" height="200" fill="#c4b484"/><path fill="#a89068" d="M-10 28c38-22 82-10 118 8 28 14 54-12 86-6 34 6 58 32 92 28 36-4 62-30 102-22 28 6 48 28 72 18v46c-40 16-78-8-118 4-32 10-58 34-96 22-34-10-52-38-90-34-30 4-50 28-84 18-26-8-48-22-74-12z"/><path fill="#5a6144" d="M20 96c42-18 76 8 112 2 30-6 48-28 82-18 36 10 58 36 98 24 40-12 68-8 96 14 18 14 44 8 72 16v38c-46 8-80-16-124-6-36 8-60 32-98 20-40-12-62-40-104-28-28 8-52 30-86 16-22-10-38-28-48-18z"/><path fill="#6e5a3c" d="M-8 140c46-16 88 10 130-2 34-10 56-32 92-20 40 14 66 8 98-8 28-14 60-6 88 8 22 12 50 6 80 14v60H-8z"/><path fill="#3f4634" d="M48 12c22-8 40 10 64 4 18-4 34-18 56-8 20 8 38 4 54 16-28 14-58 2-86 12-24 8-44 22-70 10-16-8-28-18-18-34z"/><path fill="#6a4e32" d="M210 44c26-14 52 4 74-6 24-10 46-6 66 10-18 16-44 6-66 16-22 10-44 8-64-4-8-6-16-12-10-16z"/><path fill="#3c2e22" d="M340 70c20-12 44-4 62 8 14 10 32 6 48 16-16 12-38 2-56 10-22 10-46 6-62-8-8-8-6-18 8-26z"/><path fill="#d2c4a0" d="M120 118c24-10 46 6 68-4 18-8 38-2 54 10-20 12-44 0-64 10-20 10-42 6-58-8-8-8-8-6 0-8z"/><path fill="#5a6144" d="M280 128c28-12 50 8 78 0 22-6 40 8 62 2 8 18-16 22-36 28-28 8-54-10-80-4-18 4-34 16-50 6 6-14 16-22 26-32z"/><path fill="#6e5a3c" d="M8 70c20-10 38 6 58-2 16-6 34-16 50-2-12 14-32 6-48 14-18 8-36 6-50-4-8-6-14-6-10-6z"/><path fill="#3f4634" d="M400 24c18-8 36 4 54-2 14 16-4 24-22 28-20 4-36-8-50-2-8-12 4-18 18-24z"/><path fill="#a89068" d="M160 168c30-10 58 8 88 0 24-6 46 10 70 2 10 14-12 20-30 24-32 8-60-8-90-2-22 4-42 16-62 4 6-12 14-20 24-28z"/><path fill="#6a4e32" d="M70 160c16-8 32 2 48-6 12 12-2 18-16 22-16 4-30-6-40 0-6-8 2-12 8-16z"/><ellipse cx="300" cy="88" fill="#3c2e22" rx="28" ry="14" transform="rotate(-18 300 88)"/><ellipse cx="92" cy="48" fill="#5a6144" rx="22" ry="11" transform="rotate(22 92 48)"/><ellipse cx="430" cy="150" fill="#3f4634" rx="34" ry="16" transform="rotate(-12 430 150)"/></svg>`
  )

export function AmericasGameTitle() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const frame = heading.parentElement
    if (!frame) return

    const fit = () => {
      heading.style.fontSize = "100px"
      const measured = heading.scrollWidth
      if (measured === 0) return
      const available = Math.max(frame.clientWidth - 48, 0)
      heading.style.fontSize = `${(available / measured) * 86}px`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return (
    <h1
      ref={headingRef}
      aria-label="America's Game"
      className="relative inline-block max-w-none whitespace-nowrap text-center font-display text-[12vw] font-semibold leading-none tracking-[0.1em] uppercase"
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 -z-10 select-none text-[#1a120c]"
        style={{
          WebkitTextStroke: "0.028em #1a120c",
          textShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        AMERICA&apos;S GAME
      </span>
      <span
        className="relative"
        style={{
          backgroundImage: `linear-gradient(rgba(28, 22, 16, 0.14), rgba(28, 22, 16, 0.14)), url("${OCP}")`,
          backgroundSize: "220px 92px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "0.012em rgba(26, 18, 12, 0.4)",
          paintOrder: "stroke fill",
        }}
      >
        AMERICA&apos;S GAME
      </span>
    </h1>
  )
}
