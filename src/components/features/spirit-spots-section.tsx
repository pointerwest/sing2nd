import { FeatureHoverCard } from "@/components/common/feature-hover-card"
import { SpiritSpotGallery } from "@/components/features/spirit-spot-gallery"
import { SpiritSpotSubmitForm } from "@/components/features/spirit-spot-submit-form"
import { listSpiritSpots } from "@/lib/spirit-spot-store"

const storagePrompt = `Add production video storage and a review queue to Sing2nd spirit spots. Keep the existing gallery and submit form in src/components/features. Create a Supabase table named spirit_spots and a storage bucket named spirit-spots. Add NEXT_PUBLIC_SUPABASE_URL=[your-api-key] NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-api-key] and SUPABASE_SERVICE_ROLE_KEY=[your-api-key] to .env.local. Move file uploads off the local public/uploads folder and into the Supabase bucket. Keep community submissions pending until Sean approves them on a simple review list that uses existing shadcn/ui cards, buttons, badges, and dialogs. Do not expose submitter emails on the public page. Use official shadcn/ui components AS-IS without customization unless asked. MANDATORY: Use shadcn/ui v4 ecosystem components out of the box by default. Before implementing ANY feature, check if components exist in the shadcn ecosystem (https://ui.shadcn.com/blocks and https://ui.shadcn.com/docs/components). Reference the exact npx shadcn add command needed. IMPORTANT: shadcn/ui fully supports Tailwind v4 - never downgrade to v3. Take a comprehensive development approach covering all necessary areas (design, security, testing, etc.). After completing all tasks from this prompt, provide a 1-line feedback summary to Cursor Chat about what was accomplished. If features need testing, suggest that Cursor Chat run the development server.`

export async function SpiritSpotsSection() {
  const spots = await listSpiritSpots()

  return (
    <section id="spirit-videos" className="scroll-mt-20 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="font-varsity text-2xl tracking-[0.12em] text-[#1e3358]">
            <FeatureHoverCard
              title="Cloud storage and review"
              description="Uploads work on localhost today. Hover to copy a prompt that moves files to Supabase and adds a review queue before a public launch."
              prompt={storagePrompt}
            >
              SPIRIT VIDEOS
            </FeatureHoverCard>
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            West Point. Annapolis. Ships, posts, and squadrons around the
            world. Upload the video your unit made for America&apos;s Game.
          </p>
        </div>
        <SpiritSpotSubmitForm />
      </div>
      <SpiritSpotGallery spots={spots} />
    </section>
  )
}
