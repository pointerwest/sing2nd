import Link from "next/link"
import {
  IconBuildingSkyscraper,
  IconBus,
  IconClock,
  IconTicket,
  IconToolsKitchen2,
  IconVideo,
} from "@tabler/icons-react"

import { FeatureHoverCard } from "@/components/common/feature-hover-card"
import { JsonLd } from "@/components/common/json-ld"
import { SiteFooter } from "@/components/common/site-footer"
import { TributeNav } from "@/components/common/tribute-nav"
import { AmericasGameTitle } from "@/components/features/americas-game-title"
import { CrestSplash } from "@/components/features/crest-splash"
import { GameCountdown } from "@/components/features/game-countdown"
import { SpiritSpotsSection } from "@/components/features/spirit-spots-section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { gameJsonLd, websiteJsonLd } from "@/lib/site"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const commercials = [
  {
    title: "USAA presents America's Game",
    year: "Series",
    href: "https://www.youtube.com/results?search_query=USAA+Army+Navy+commercial",
    note: "The annual films that treat the rivalry like family, not just football.",
  },
  {
    title: "Go Army Beat Navy 2025",
    year: "West Point",
    href: "https://www.dvidshub.net/video/989459/go-army-beat-navy-2025",
    note: "The Black Knights on film before last December's meeting.",
  },
  {
    title: "Fleet Forces spirit video",
    year: "Navy",
    href: "https://www.dvidshub.net/video/946116/usff-command-army-v-navy-spirit-spot",
    note: "A command film from the fleet for the 125th game.",
  },
  {
    title: "SECNAV spirit video",
    year: "2025",
    href: "https://www.dvidshub.net/video/990172/secnav-medication-ad-army-navy-spirit-spot-2025-60-second-version",
    note: "The Secretary of the Navy's spot for America's Game.",
  },
  {
    title: "Upload your unit's video",
    year: "Live wall",
    href: "/#spirit-videos",
    note: "West Point, Annapolis, and units worldwide can add their own films below.",
  },
]

const stories = [
  {
    value: "sing-second",
    title: "Who sings second",
    teaser:
      "After the final whistle, both brigades stand for the alma maters. The winning side waits. The losers sing first. The winners sing last.",
    history: [
      "No other rivalry ends this way. When the clock hits zero, the players do not run to the locker room. They walk to midfield and stand together. First they face the losing academy's students and sing that school's alma mater. Then they turn and sing the winner's. The losing side sings first. The winning side sings last. That is what it means to sing second.",
      "The songs themselves are older than most people in the stadium. West Point's alma mater was written in 1911. Navy Blue and Gold followed in 1923. Players learn both. They have to. When the moment comes, each man is singing the other school's hymn as well as his own — a public reminder that the men across the line will soon wear the same flag.",
      "There is no single founding memo that invented the courtesy. It grew out of the academies' habit of honoring the fallen and honoring each other. Sportswriters later called the first half of the rite honoring the fallen: both teams face the losing stands. Then the winners take the second song. Cadets have sewn SING SECOND inside their jerseys. Midshipmen have done the same. The phrase became another way to say they won America's Game.",
      "That is why this site is named Sing2nd. The score fades. The wait after the whistle does not.",
    ],
  },
  {
    value: "series",
    title: "A series older than most rivalries",
    teaser:
      "The first game was in 1890. Navy still leads the all-time series. Every December the record matters less than who gets to sing second.",
    history: [
      "Navy had been playing football since 1879. Army did not have a team until Cadet Dennis Michie accepted a challenge from Annapolis and scraped one together. On November 29, 1890, they met on The Plain at West Point. The Corps chipped in coins to help pay Navy's travel. Navy won 24–0. The next year Army went to Annapolis and won. The series was on.",
      "Those first four meetings stayed on campus — The Plain and Worden Field. After the 1893 Navy victory, the rivalry ran so hot that a rear admiral and a brigadier general nearly dueled. President Grover Cleveland's cabinet stepped in. The secretaries of War and the Navy barred the academies from playing each other away from home. With no neutral ground allowed, there was no Army-Navy game from 1894 through 1898.",
      "Philadelphia brought them back. In 1899 they met at Franklin Field, roughly halfway between West Point and Annapolis. The city has hosted the game more than any other — later at Municipal Stadium, then JFK Stadium, Veterans Stadium, and Lincoln Financial Field. The series has also gone to New York, Baltimore, Chicago's Soldier Field, the Rose Bowl, and the Meadowlands. In 2020, during the pandemic, they played at Michie Stadium with almost no crowd. The 127th meeting returns to MetLife Stadium on December 12, 2026.",
      "Ten seasons have had no game. Besides those five silent years in the 1890s, Army cancelled 1909 after Cadet Eugene Byrne died in the Harvard game. The War Department stopped the series in 1917 and 1918 for the First World War. In 1928 and 1929 the academies could not agree on who was eligible to play. The Second World War did not cancel the game; it only moved a few meetings because of travel limits. They have played every year since 1930.",
      "Navy still leads the all-time series, with a handful of ties. Presidents have sat a half on each sideline since Theodore Roosevelt in 1901. None of that is why families keep coming. They come to see who sings second.",
    ],
  },
  {
    value: "prisoner",
    title: "The prisoner exchange",
    teaser:
      "Cadets and midshipmen who spent the semester in enemy territory are walked to midfield and sent home before kickoff.",
    history: [
      "It looks like theater, and it is — but the prisoners are real students. Each fall, a handful of cadets live at Annapolis and a handful of midshipmen live at West Point. They take classes, walk the same halls, and train with the other service. On game day they are still wearing the other school's world on their backs until the ceremony at midfield.",
      "The swap has weekend roots in 1945, when cadets and midshipmen started visiting each other's yards for a few days. In 1975 the Service Academy Exchange Program made it a full semester. The commandants signed a one-for-one agreement. Fifty years on, the walk to the 50-yard line is still called the prisoner exchange.",
      "The West Point first captain leads the midshipmen out. The Naval Academy brigade commander brings the cadets. They are returned to their own student sections so they can cheer with their classmates instead of sitting in hostile seats for three hours. Then they go back to the other academy until January.",
      "The stadium often goes quiet for it. Not because anyone is in danger — because everyone understands the joke and the truth under it. They can spend a semester as the enemy. After graduation they will serve on the same side.",
    ],
  },
  {
    value: "march-on",
    title: "The march-on",
    teaser:
      "The Corps of Cadets and the Brigade of Midshipmen take the field before the teams do. For a few minutes the stadium is two academies standing in formation.",
    history: [
      "Kickoff is not the first thing worth seeing. Hours earlier the entire Corps and the entire Brigade are bused in, formed up, and marched onto the field by company. Thousands of cadets. Thousands of midshipmen. Same 30-inch step. Same dress-right. No soundtrack except commands and boots.",
      "It is one of the few days the whole student body of each academy moves as a single formation in public. Officers who once marched as cadets still talk about it as a demonstration of discipline, not a show. Parents lean over the rail looking for one white cover or one gray coat in a sea of them. When they find their midshipman or cadet, they point the way families have pointed for generations.",
      "The academies enter from their sides of the stadium and fill the field before they climb into their sections. Banners come too — some solemn, some sharp enough to make the other side laugh. The march-on is also when the day stops being a civilian bowl game. For those minutes it is two commissioning sources presenting themselves to the country that will send them to sea and to war.",
      "Be in your seat for it. The football can wait. This is the part many families remember longer than any score.",
    ],
  },
  {
    value: "families",
    title: "The families in the stands",
    teaser:
      "Parents, classmates, and teammates on deployment watch the same three hours. Some are in the stadium. Some are on a ship.",
    history: [
      "Some parents are here because their cadet or midshipman is on the field in the march-on. Some are here because their child already graduated and is watching from a destroyer, a FOB, or a hospital. And some are here because their child is not coming home, and this Saturday is still the place they know how to sit with that fact.",
      "Gold Star mothers and fathers keep buying the trip. They sit through the prisoner exchange and the flyover. They stand for both alma maters. Groups of Gold Star families — including gatherings organized so widows, widowers, and parents of the fallen can come together — make the weekend a reunion as much as a game. They tell the name of a son or a daughter in a hotel hallway on Friday night, then walk into the stadium on Saturday as if the empty seat were assigned.",
      "There are parents who lost a child in Iraq, Afghanistan, or some quiet training accident, and still wear the academy colors. There are parents who lost one child and still have another in the Corps or the Brigade. They come because the game is one of the last rooms in American life where the sacrifice is not a slogan. The students on the field have already sworn the same oath their children kept.",
      "When the winning side waits so the other can sing, those parents hear it differently. It is not pageantry to them. It is the country pausing long enough to remember that every player on the grass has already agreed to lay down a life — and that some families have already paid that price and still showed up.",
    ],
  },
]

const hotels = [
  {
    name: "Hilton Meadowlands",
    detail: "Two miles from MetLife. Easy for families coming in for Saturday.",
    href: "https://www.hilton.com/en/hotels/ewrghhf-hilton-meadowlands/",
  },
  {
    name: "Marriott Meadowlands",
    detail: "East Rutherford base with parking and shuttle options on big event weekends.",
    href: "https://www.marriott.com/en-us/hotels/ewrnr-courtyard-lyndhurst-meadowlands/overview/",
  },
  {
    name: "Manhattan overflow",
    detail: "Stay in Midtown and ride over. Good if you want dinner in the city Friday night.",
    href: "https://www.nyc.gov/site/nystay/index.page",
  },
]

const saturday = [
  {
    time: "Friday night",
    detail: "Check in. Eat in the Meadowlands or ride into Midtown. Sleep close if you can.",
  },
  {
    time: "Morning",
    detail: "Gates and the lot take time. Leave a margin for the march-on, not just kickoff.",
  },
  {
    time: "Noon hour",
    detail: "The Corps and the Brigade take the field before the teams. Be in your seat early.",
  },
  {
    time: "3:00 p.m. ET",
    detail: "Kickoff. Three hours later, one side waits so the other can sing.",
  },
]

const travel = [
  {
    name: "NJ Transit to Meadowlands",
    detail: "Rail from Secaucus to Meadowlands Station on event days. Check the Saturday schedule.",
    href: "https://www.njtransit.com/",
  },
  {
    name: "MetLife parking and transit",
    detail: "Lots fill. Official stadium pages post lot maps and rail notes as the date gets close.",
    href: "https://www.metlifestadium.com/stadium/getting-here",
  },
  {
    name: "From Manhattan",
    detail: "Bus or rail to the Meadowlands. Plan the return after the alma maters, not the clock.",
    href: "https://www.metlifestadium.com/events/detail/army-navy",
  },
]

const restaurants = [
  {
    name: "Park & Orchard",
    detail: "East Rutherford classic — unfussy, local, and close to the stadium.",
    href: "https://www.parkandorchard.com/",
  },
  {
    name: "Chakra",
    detail: "Paramus destination for a nicer Friday dinner before kickoff.",
    href: "https://www.chakrarestaurant.com/",
  },
  {
    name: "Keens Steakhouse",
    detail: "Manhattan, pipes on the ceiling, and the kind of room that fits the weekend.",
    href: "https://www.keens.com/",
  },
]

const questions = [
  {
    value: "when",
    question: "When and where is the 127th game?",
    answer:
      "Saturday, December 12, 2026, at 3:00 p.m. ET at MetLife Stadium in East Rutherford, New Jersey. USAA is the presenter.",
  },
  {
    value: "sing",
    question: "What does it mean to sing second?",
    answer:
      "After the final whistle, both sides stand for the alma maters. The losing academy sings first. The winning academy waits, then sings last. That is the honor this site is named for.",
  },
  {
    value: "tickets",
    question: "How do tickets work?",
    answer:
      "Official seats go through Army A Club and Navy allotments first. What remains moves to public sale and resale. Start with Army Gameday and the Navy Army-Navy FAQs.",
  },
  {
    value: "watch",
    question: "What if I cannot be in the stadium?",
    answer:
      "The game is a national broadcast. Units at sea and on post can still send a spirit video to the wall so the academies hear from the field.",
  },
  {
    value: "upload",
    question: "Who can send a spirit video?",
    answer:
      "Cadet companies at West Point, midshipmen companies at Annapolis, and military units anywhere in the world. Upload a file or paste a YouTube, Vimeo, or DVIDS link.",
  },
]

const countdownPrompt = `Add a live kickoff feed to Sing2nd. Create an API route at /api/game-status that can later pull official Army-Navy schedule updates. Add ESPN_API_KEY=[your-api-key] to .env.local if you connect a sports data provider. Keep the existing GameCountdown component in src/components/features/game-countdown.tsx and use current shadcn/ui cards and badges. After completing all tasks from this prompt, provide a 1-line feedback summary to Cursor Chat about what was accomplished`

export function TributeHome() {
  return (
    <div className="min-h-svh">
      <JsonLd data={[websiteJsonLd(), gameJsonLd()]} />
      <CrestSplash className="min-h-svh text-white" imageClassName="object-top">
        <div className="flex min-h-svh flex-col items-center px-6 pt-3 text-center md:px-12 md:pt-4">
            <AmericasGameTitle />
            <p className="mt-1.5 max-w-3xl text-sm leading-snug text-black md:text-base">
              For three hours on a Saturday in December, they fight each other
              with everything they have. But when the final whistle blows, they
              stand shoulder-to-shoulder—the only rivalry in the world where
              every player on the field has already sworn to lay down their life
              for the men on the opposing sideline.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
              Saturday, December 12, 2026 · 3:00 p.m. ET · MetLife Stadium
              <br />
              East Rutherford, New Jersey. Presented by USAA.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <Link
                href="https://www.armygameday.com/army-navy-tickets"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "border-black bg-black text-[#d4af37] hover:bg-neutral-950 hover:text-[#e4c766]"
                )}
              >
                Army tickets
              </Link>
              <Link
                href="https://navysports.com/sports/2024/2/9/2024-army-navy-faqs.aspx"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "!border-[#020617] !bg-[#020617] !text-white hover:!bg-black hover:!text-white"
                )}
              >
                Navy tickets
              </Link>
              <Link
                href="https://www.metlifestadium.com/events/detail/army-navy"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "border-black bg-black text-white hover:bg-neutral-900 hover:text-white"
                )}
              >
                Stadium info
              </Link>
            </div>
            <div className="mt-3">
              <GameCountdown
                title={
                  <FeatureHoverCard
                    title="Live game status"
                    description="The countdown is local and accurate for Dec 12, 2026. Hover to copy a prompt that can connect a live sports feed later."
                    prompt={countdownPrompt}
                  >
                    KICKOFF COUNTDOWN
                  </FeatureHoverCard>
                }
              />
            </div>
            <Link
              href="#stories"
              className="mt-auto pb-6 text-xs tracking-[0.18em] text-white/70 uppercase hover:text-white"
            >
              Stories worth keeping
            </Link>
          </div>
        </CrestSplash>

      <TributeNav />
      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10">
        <section id="stories" className="scroll-mt-20">
          <h2 className="font-varsity mb-4 text-2xl tracking-[0.12em] text-[#1e3358]">
            STORIES WORTH KEEPING
          </h2>
          <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>On the field, and after</CardTitle>
              <CardDescription>
                Click a title to open the longer history. These are the pieces families retell.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion multiple>
                {stories.map((story) => (
                  <AccordionItem key={story.value} value={story.value}>
                    <AccordionTrigger className="text-base">
                      {story.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{story.teaser}</p>
                      {story.history.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)} className="text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <IconVideo className="size-5" />
              <CardTitle>Commercials and films</CardTitle>
              <CardDescription>
                USAA&apos;s Army-Navy films are part of the ritual. Watch the archive, then come back for 2026.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {commercials.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <Badge variant="outline">{item.year}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
          </div>
        </section>

        <SpiritSpotsSection />

        <section id="weekend" className="scroll-mt-20 space-y-4">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-varsity text-2xl tracking-[0.12em] text-[#1e3358]">
              THE WEEKEND
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Kickoff is 3:00 p.m. ET on Saturday, December 12 at MetLife
              Stadium. Come in Friday if you can. The Meadowlands fills early,
              and the city is an easy overflow.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <IconTicket className="size-5" />
                <CardTitle>Tickets</CardTitle>
                <CardDescription>
                  Official allocations go through Army A Club and Navy season holders first. Resale follows.
                </CardDescription>
              </CardHeader>
              <CardFooter className="gap-4">
                <Link href="https://www.armygameday.com/army-navy-tickets" className="text-sm underline">
                  Army Gameday
                </Link>
                <Link
                  href="https://navysports.com/sports/2024/2/9/2024-army-navy-faqs.aspx"
                  className="text-sm underline"
                >
                  Navy FAQs
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <IconBuildingSkyscraper className="size-5" />
                <CardTitle>Hotels</CardTitle>
                <CardDescription>
                  Meadowlands properties fill early. Book the weekend, not just Saturday night.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <IconToolsKitchen2 className="size-5" />
                <CardTitle>Restaurants</CardTitle>
                <CardDescription>
                  Eat near the stadium or make it a Manhattan Friday. Either way, reserve.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Where to stay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hotels.map((hotel) => (
                <Link
                  key={hotel.name}
                  href={hotel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border p-4 hover:bg-muted/50"
                >
                  <h3 className="font-medium">{hotel.name}</h3>
                  <p className="text-sm text-muted-foreground">{hotel.detail}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Where to eat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {restaurants.map((place) => (
                <Link
                  key={place.name}
                  href={place.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border p-4 hover:bg-muted/50"
                >
                  <h3 className="font-medium">{place.name}</h3>
                  <p className="text-sm text-muted-foreground">{place.detail}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <IconClock className="size-5" />
                <CardTitle>Saturday</CardTitle>
                <CardDescription>
                  A simple clock for families coming in for the 127th meeting.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {saturday.map((item) => (
                  <div key={item.time} className="rounded-lg border p-4">
                    <h3 className="font-medium">{item.time}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <IconBus className="size-5" />
                <CardTitle>Getting there</CardTitle>
                <CardDescription>
                  MetLife sits in East Rutherford. Rail is easier than sitting in the lot.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {travel.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border p-4 hover:bg-muted/50"
                  >
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="questions" className="scroll-mt-20 space-y-4">
          <h2 className="font-varsity text-2xl tracking-[0.12em] text-[#1e3358]">
            QUESTIONS FAMILIES ASK
          </h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion multiple>
                {questions.map((item) => (
                  <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="pb-4">
          <Card>
            <CardHeader>
              <CardTitle>Until they sing</CardTitle>
              <CardDescription>
                The score will be forgotten by most people in the stands. The
                wait after the whistle will not. Come back in December. Stand
                with them, in the stadium or from wherever you serve.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
