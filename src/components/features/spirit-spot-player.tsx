import { AspectRatio } from "@/components/ui/aspect-ratio"
import { embedSrc, isSafeFileSrc, type VideoSource } from "@/lib/spirit-spot-types"

export function SpiritSpotPlayer({
  source,
  title,
}: {
  source: VideoSource
  title: string
}) {
  if (source.kind === "file") {
    if (!isSafeFileSrc(source.src)) {
      return (
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-black">
          <div className="flex size-full items-center justify-center text-sm text-white/70">
            Video unavailable
          </div>
        </AspectRatio>
      )
    }

    return (
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-black">
        <video
          className="absolute inset-0 size-full object-contain"
          controls
          playsInline
          preload="metadata"
          src={source.src}
        >
          {title}
        </video>
      </AspectRatio>
    )
  }

  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-black">
      <iframe
        title={title}
        src={embedSrc(source)}
        className="absolute inset-0 size-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </AspectRatio>
  )
}
