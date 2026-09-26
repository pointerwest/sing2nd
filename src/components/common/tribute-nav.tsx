import Link from "next/link"

const links = [
  { href: "#stories", label: "Stories" },
  { href: "#spirit-videos", label: "Spirit Videos" },
  { href: "#weekend", label: "The Weekend" },
  { href: "#questions", label: "Questions" },
]

export function TributeNav() {
  return (
    <nav className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-center gap-6 px-4 text-sm">
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
