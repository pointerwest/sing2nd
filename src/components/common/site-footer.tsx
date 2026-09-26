import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted-foreground">
        <p>The 127th meeting · December 12, 2026 · MetLife Stadium</p>
        <Link href="https://sing2nd.com" className="hover:text-foreground">
          sing2nd.com
        </Link>
      </div>
    </footer>
  )
}
