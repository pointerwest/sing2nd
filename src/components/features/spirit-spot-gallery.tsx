"use client"

import { useMemo, useState } from "react"

import { SpiritSpotPlayer } from "@/components/features/spirit-spot-player"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  affiliationFilter,
  affiliationLabel,
  type SpiritFilter,
  type SpiritSpot,
} from "@/lib/spirit-spot-types"

const FILTERS: { value: SpiritFilter; label: string }[] = [
  { value: "all", label: "All videos" },
  { value: "west-point", label: "West Point" },
  { value: "annapolis", label: "Annapolis" },
  { value: "worldwide", label: "Units worldwide" },
]

export function SpiritSpotGallery({ spots }: { spots: SpiritSpot[] }) {
  const [filter, setFilter] = useState<SpiritFilter>("all")

  const visible = useMemo(
    () =>
      spots.filter((spot) =>
        filter === "all" ? true : affiliationFilter(spot.affiliation) === filter
      ),
    [filter, spots]
  )

  return (
    <div className="space-y-4">
      <Tabs
        value={filter}
        onValueChange={(value) => {
          if (typeof value === "string" && isFilter(value)) setFilter(value)
        }}
      >
        <TabsList className="h-auto w-full flex-wrap">
          {FILTERS.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {visible.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No videos here yet</CardTitle>
            <CardDescription>
              Be the first unit in this group to send one in.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((spot) => (
            <Card key={spot.id}>
              <CardHeader className="gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    className={cn(
                      spot.affiliation === "west-point" &&
                        "border-black bg-black text-[#d4af37]",
                      spot.affiliation === "annapolis" &&
                        "!border-[#020617] !bg-[#020617] text-white"
                    )}
                  >
                    {affiliationLabel(spot.affiliation)}
                  </Badge>
                  <Badge variant="outline">
                    {spot.official ? "Official" : "From the field"}
                  </Badge>
                </div>
                <CardTitle>{spot.title}</CardTitle>
                <CardDescription>
                  {spot.unitName} · {spot.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <SpiritSpotPlayer source={spot.source} title={spot.title} />
                {spot.message ? (
                  <p className="text-sm text-muted-foreground">{spot.message}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function isFilter(value: string): value is SpiritFilter {
  return FILTERS.some((item) => item.value === value)
}
