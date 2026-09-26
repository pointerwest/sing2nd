import Link from "next/link"

import { SiteHeader } from "@/components/common/site-header"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

export const metadata = {
  title: "Components",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ComponentsPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10">
        <div>
          <h1 className="font-heading text-3xl font-semibold">Installed components</h1>
          <p className="mt-2 text-muted-foreground">
            A working sample of the shadcn/ui set installed for Sing2nd. See the
            full catalog at{" "}
            <a className="underline" href="https://ui.shadcn.com/docs/components">
              ui.shadcn.com/docs/components
            </a>
            .
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Buttons, badges, and switches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Badge variant="secondary">Neutral</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="alerts" defaultChecked />
                <Label htmlFor="alerts">Game-week alerts</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" defaultChecked />
                <Label htmlFor="remember">Remember this device</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Forms</CardTitle>
              <CardDescription>Inputs from the official field system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Sean" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea id="note" placeholder="A story worth keeping" />
              </div>
              <Progress value={72} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Series snapshot</CardTitle>
            <CardDescription>Static table using the installed table primitive</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Side</TableHead>
                  <TableHead>Wins</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Navy</TableCell>
                  <TableCell>64</TableCell>
                  <TableCell>Leads the all-time series</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Army</TableCell>
                  <TableCell>55</TableCell>
                  <TableCell>Black Knights</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ties</TableCell>
                  <TableCell>7</TableCell>
                  <TableCell>The rest is tradition</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Separator className="max-w-20" />
          <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
            Back to showcase
          </Link>
        </div>
      </main>
    </div>
  )
}
