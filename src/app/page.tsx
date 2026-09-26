import { TributeHome } from "@/components/features/tribute-home"

export const metadata = {
  title: {
    absolute: "Sing2nd | America's Game",
  },
  description:
    "The 127th Army-Navy Game is Saturday, December 12, 2026 at 3:00 p.m. ET at MetLife Stadium in East Rutherford. CBS intros, stories, spirit videos, tickets, hotels, and a kickoff countdown.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "America's Game | 127th Army-Navy Football Classic",
    description:
      "December 12, 2026 at MetLife Stadium. CBS intros, stories, spirit videos, tickets, and the countdown to kickoff.",
    url: "/",
  },
}

export default function Home() {
  return <TributeHome />
}
