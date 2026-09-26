import Link from "next/link"

const links = [
  { href: "#stories", label: "Stories" },
  { href: "#cbs-intros", label: "CBS Intros" },
  { href: "#spirit-videos", label: "Spirit Videos" },
  { href: "#weekend", label: "The Weekend" },
  { href: "#questions", label: "Questions" },
]

export function TributeNav() {
  return (
    <nav className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex min-h-12 w-full max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
