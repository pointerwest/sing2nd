import Image from "next/image"

import usnaCrest from "@/assets/untitled-design-3.png"
import { cn } from "@/lib/utils"

export function CrestSplash({
  className,
  imageClassName,
  children,
}: {
  className?: string
  imageClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div data-crest-splash className={cn("relative isolate overflow-hidden", className)}>
      <Image
        src="/images/michie-stadium-empty.png"
        alt="Michie Stadium at West Point"
        fill
        priority
        sizes="100vw"
        className={cn("object-cover object-center", imageClassName)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
      <Image
        src="/images/west-point-crest.png"
        alt="West Point crest"
        width={420}
        height={360}
        priority
        className="pointer-events-none absolute bottom-[14%] left-[5%] z-10 w-[26vw] max-w-[260px] min-w-[130px] drop-shadow-xl md:left-[8%] md:max-w-[320px]"
      />
      <Image
        src={usnaCrest}
        alt="USNA crest"
        width={usnaCrest.width}
        height={usnaCrest.height}
        priority
        className="pointer-events-none absolute bottom-[12%] right-[5%] z-10 h-auto w-[20vw] max-w-[210px] min-w-[110px] drop-shadow-xl md:right-[8%] md:max-w-[250px]"
      />
      <div className="relative z-20">{children}</div>
    </div>
  )
}
