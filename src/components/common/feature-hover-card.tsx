"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const FIVE_DS_LOGO =
  "https://koqqkpitepqwlfjymcje.supabase.co/storage/v1/object/public/brand-assets/5ds-blank.svg"

type FeatureHoverCardProps = {
  title: string
  description: string
  prompt: string
  children: React.ReactNode
}

export function FeatureHoverCard({
  title,
  description,
  prompt,
  children,
}: FeatureHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-help underline decoration-dotted underline-offset-4">
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={FIVE_DS_LOGO} alt="5 Day Sprint" />
              <AvatarFallback>5DS</AvatarFallback>
            </Avatar>
            <h4 className="text-sm font-semibold">{title}</h4>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className="rounded-md bg-slate-50 p-3 font-mono text-xs dark:bg-slate-900">
            <div className="mb-2 text-slate-600 dark:text-slate-400">
              Claude Code Prompt (copy & paste):
            </div>
            <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">
              {prompt}
            </div>
          </div>
          <Button
            size="sm"
            className="w-full"
            onClick={() => navigator.clipboard.writeText(prompt)}
          >
            Copy Claude Code Prompt
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
