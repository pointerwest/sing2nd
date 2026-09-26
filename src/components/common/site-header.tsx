import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/#stories", label: "Stories" },
  { href: "/#cbs-intros", label: "CBS Intros" },
  { href: "/#spirit-videos", label: "Spirit Videos" },
  { href: "/#weekend", label: "The Weekend" },
  { href: "/#questions", label: "Questions" },
]

export function SiteHeader({
  variant = "default",
}: {
  variant?: "default" | "overlay"
}) {
  const overlay = variant === "overlay"

  return (
    <header
      className={cn(
        "z-40 border-b",
        overlay
          ? "absolute inset-x-0 top-0 border-white/10 bg-black/20 text-white backdrop-blur-sm"
          : "sticky top-0 bg-background/80 backdrop-blur"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          Sing2nd
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors",
                overlay
                  ? "text-white/75 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className={buttonVariants({
            size: "sm",
            variant: overlay ? "secondary" : "default",
          })}
        >
          America&apos;s Game
        </Link>
      </div>
    </header>
  )
}
