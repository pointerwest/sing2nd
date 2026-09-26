"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

import {
  submitSpiritSpot,
  type SpiritSpotFormState,
} from "@/app/actions/spirit-spots"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AFFILIATIONS } from "@/lib/spirit-spot-types"

const INITIAL_STATE: SpiritSpotFormState = { ok: false, message: "" }

const selectClassName =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export function SpiritSpotSubmitForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(
    submitSpiritSpot,
    INITIAL_STATE
  )

  useEffect(() => {
    if (!state.message) return
    if (state.ok) {
      toast.success(state.message)
      formRef.current?.reset()
      setOpen(false)
      return
    }
    toast.error(state.message)
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button size="lg" />}
      >
        Upload a spirit video
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send your unit&apos;s spirit video</DialogTitle>
          <DialogDescription>
            Cadet companies at West Point, midshipmen companies at Annapolis,
            and military units anywhere in the world can add a video to the
            wall.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="unitName">Unit or company</FieldLabel>
              <Input
                id="unitName"
                name="unitName"
                required
                maxLength={80}
                placeholder="27th Company, USNA"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="affiliation">Academy or service</FieldLabel>
              <select
                id="affiliation"
                name="affiliation"
                required
                defaultValue=""
                className={selectClassName}
              >
                <option value="" disabled>
                  Choose one
                </option>
                {AFFILIATIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="location">Where you are</FieldLabel>
              <Input
                id="location"
                name="location"
                required
                maxLength={80}
                placeholder="Yokosuka, Japan"
              />
              <FieldDescription>
                Post, ship, campus, or city — wherever the unit filmed.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="title">Spot title</FieldLabel>
              <Input
                id="title"
                name="title"
                required
                maxLength={80}
                placeholder="Beat Navy from the Mediterranean"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">A line for the wall</FieldLabel>
              <Textarea
                id="message"
                name="message"
                maxLength={400}
                placeholder="Optional. Who made it, and who it is for."
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Unit contact email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="unit@army.mil"
              />
              <FieldDescription>
                Used only if we need to reach you. It is not shown on the wall.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="video">Upload the video</FieldLabel>
              <Input
                id="video"
                name="video"
                type="file"
                accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
              />
              <FieldDescription>
                MP4, WebM, or MOV up to 40 MB.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="videoUrl">Or paste a link</FieldLabel>
              <Input
                id="videoUrl"
                name="videoUrl"
                type="url"
                placeholder="https://www.dvidshub.net/video/..."
              />
              <FieldDescription>
                YouTube, Vimeo, or DVIDS works from ships and posts with slow
                connections.
              </FieldDescription>
            </Field>
            <Field orientation="horizontal">
              <input
                id="authorized"
                name="authorized"
                type="checkbox"
                value="yes"
                required
                className="mt-1 size-4 rounded border border-input"
              />
              <FieldLabel htmlFor="authorized">
                I am authorized to share this spot. It is not classified, and
                the unit may show it on Sing2nd.
              </FieldLabel>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Sending…" : "Add it to the wall"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
