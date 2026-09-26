import Link from "next/link"
import { IconColorSwatch, IconComponents, IconPalette } from "@tabler/icons-react"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { FeatureHoverCard } from "@/components/common/feature-hover-card"
import { SectionCards } from "@/components/section-cards"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const authPrompt = `Add real authentication to Sing2nd. Create a Supabase auth flow using the existing /login page and login-form component. Add SUPABASE_URL=[your-url] and SUPABASE_ANON_KEY=[your-api-key] to .env.local. Keep the current shadcn/ui login layout and report a 1-line feedback summary to Cursor Chat about what was accomplished`

export const metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-vertical:h-4" />
          <div>
            <p className="text-sm font-medium">Sing2nd component showcase</p>
            <p className="text-xs text-muted-foreground">
              Official shadcn/ui ecosystem, ready for Sean
            </p>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <IconComponents className="size-5" />
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Official library at{" "}
                  <a
                    className="underline"
                    href="https://ui.shadcn.com/docs/components"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ui.shadcn.com/docs/components
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button size="sm">Default</Button>
                <Button size="sm" variant="outline">
                  Outline
                </Button>
                <Button size="sm" variant="ghost">
                  Ghost
                </Button>
                <Badge>Badge</Badge>
                <Input placeholder="Search stories" className="max-w-40" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <IconPalette className="size-5" />
                <CardTitle>Themes</CardTitle>
                <CardDescription>
                  CSS variables from{" "}
                  <a
                    className="underline"
                    href="https://ui.shadcn.com/themes"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ui.shadcn.com/themes
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <span className="size-8 rounded-full bg-primary" />
                <span className="size-8 rounded-full bg-secondary" />
                <span className="size-8 rounded-full bg-accent" />
                <span className="size-8 rounded-full bg-destructive" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <IconColorSwatch className="size-5" />
                <CardTitle>Colors & icons</CardTitle>
                <CardDescription>
                  Palette at{" "}
                  <a className="underline" href="https://ui.shadcn.com/colors" target="_blank" rel="noreferrer">
                    ui.shadcn.com/colors
                  </a>{" "}
                  · Lucide at{" "}
                  <a className="underline" href="https://lucide.dev/docs/lucide-react/" target="_blank" rel="noreferrer">
                    lucide.dev
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FeatureHoverCard
                  title="Supabase auth"
                  description="Login is a working shadcn pattern. Copy the prompt to wire real accounts."
                  prompt={authPrompt}
                >
                  Upgrade login
                </FeatureHoverCard>
              </CardContent>
            </Card>
          </div>

          <SectionCards />
          <ChartAreaInteractive />

          <div className="flex flex-wrap gap-3">
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              Back to landing
            </Link>
            <Link href="/" className={buttonVariants()}>
              America&apos;s Game
            </Link>
            <Link href="/components" className={buttonVariants({ variant: "secondary" })}>
              All components
            </Link>
            <a
              href="https://ui.shadcn.com/charts"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "ghost" })}
            >
              Chart docs
            </a>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
