"use client"

import { useEffect, useState } from "react"

const GAME_START = new Date("2026-12-12T15:00:00-05:00")

function getTimeLeft() {
  const diff = GAME_START.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true }
  }

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    started: false,
  }
}

export function GameCountdown({ title }: { title?: React.ReactNode }) {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = window.setInterval(() => setTime(getTimeLeft()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ]

  return (
    <div className="w-[17.5rem] overflow-hidden rounded-sm border-2 border-amber-400 bg-black/90 shadow-[0_0_18px_rgba(251,191,36,0.28)] sm:w-[20rem]">
      <div className="border-b-2 border-amber-400 bg-black px-3 py-1.5 text-center">
        <div className="font-varsity text-lg tracking-[0.16em] text-amber-300 sm:text-xl">
          {title ?? "KICKOFF COUNTDOWN"}
        </div>
      </div>
      <div className="grid grid-cols-4">
        {units.map((unit, index) => (
          <div
            key={unit.label}
            className={`flex flex-col items-center justify-center py-2 ${
              index > 0 ? "border-l border-amber-400/50" : ""
            }`}
          >
            <div className="flex h-7 w-full items-center justify-center font-varsity text-xl leading-none text-amber-300 sm:h-8 sm:text-2xl">
              <span className="inline-block w-[2.25ch] text-center">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-1 w-full text-center text-[8px] font-semibold tracking-[0.16em] text-amber-100/70 uppercase">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
