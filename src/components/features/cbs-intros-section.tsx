import Link from "next/link"

import { SpiritSpotPlayer } from "@/components/features/spirit-spot-player"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CBS_INTROS } from "@/lib/cbs-intros"

export function CbsIntrosSection() {
  return (
    <section id="cbs-intros" className="scroll-mt-20 space-y-4">
      <div className="max-w-2xl space-y-2">
        <h2 className="font-varsity text-2xl tracking-[0.12em] text-[#1e3358]">
          CBS INTROS
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">
          The broadcast opens that send a chill through the stadium. These play
          from official CBS Sports YouTube channels. We do not host the files.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {CBS_INTROS.map((intro) => (
          <Card key={intro.id}>
            <CardHeader className="gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{intro.year}</Badge>
                <Badge variant="secondary">{intro.meeting}</Badge>
              </div>
              <CardTitle>{intro.title}</CardTitle>
              <CardDescription>{intro.channel}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <SpiritSpotPlayer
                source={{ kind: "youtube", id: intro.youtubeId }}
                title={intro.title}
              />
              <p className="text-sm text-muted-foreground">{intro.note}</p>
              <Link
                href={`https://www.youtube.com/watch?v=${intro.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline"
              >
                Watch on YouTube
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
