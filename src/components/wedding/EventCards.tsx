import haldiImg from "@/assets/haldi.jpg";
import mehendiImg from "@/assets/mehendi.jpg";
import engagementImg from "@/assets/engagement-ring-exchange.jpg";
import weddingImg from "@/assets/wedding.jpg";
import type { ReactNode } from "react";
import { GoldDivider, PinIcon } from "./ornaments";
import { Reveal } from "./Reveal";

type WeddingEvent = {
  key: string;
  title: string;
  date: string;
  day: string;
  blurb?: string;
  time?: string;
  followedBy?: string;
  schedules?: { label: string; time: string }[];
  coupleDetails?: boolean;
  weddingInvitation?: boolean;
  venues: { label: string; name: string; address: string[]; mapsUrl: string }[];
  image: string;
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    key: "engagement",
    title: "Engagement Ceremony",
    date: "5 December 2026",
    day: "Saturday",
    time: "6:00 P.M. onwards (followed by Dinner)",
coupleDetails: true,
    venues: [
      {
        label: "Venue",
        name: "EME Officers Mess",
        address: ["Thimayya Park, Baird Place,", "Delhi Cantonment, ND-110010."],
        mapsUrl: "https://maps.app.goo.gl/ycV4tmTmzPnaTNVt5?g_st=iw",
      },
    ],
    image: engagementImg,
  },
  {
    key: "haldi",
    title: "Haldi Ceremony",
    
    date: "11 December 2026",
    day: "Friday",
    time: "12:00 PM onwards (followed by lunch)",
    venues: [
      {
        label: "Venue",
        name: "Jahapanah Club",
        address: ["Mandakini, Alaknanda,", "New Delhi – 110019."],
        mapsUrl: "https://maps.app.goo.gl/P5VzCwtdv2r5kjf88",
      },
    ],
    image: haldiImg,
  },
  {
    key: "mehendi",
    title: "Mehandi Ceremony",
  
    date: "11 December 2026",
    day: "Friday",
    time: "6:30 PM onwards (followed by dinner)",
    venues: [
      {
        label: "Venue",
        name: "Jahapanah Club",
        address: ["Mandakini, Alaknanda,", "New Delhi – 110019."],
        mapsUrl: "https://maps.app.goo.gl/P5VzCwtdv2r5kjf88",
      },
    ],
    image: mehendiImg,
  },
  {
    key: "wedding",
    title: "Wedding Ceremony",
    date: "12 December 2026",
    day: "Saturday",
    coupleDetails: true,
    weddingInvitation: true,
    schedules: [
      { label: "Sehra Bandi", time: "5:00 P.M. onwards" },
      { label: "Ghurchari", time: "6:00 P.M. onwards" },
    ],
    followedBy: "(followed by dinner)",
    venues: [
      {
        label: "Sehra Bandi",
        name: "Venue - UDMAN HOTELS & RESORTS",
        address: ["Q4WV+7Q6 NH-1,", "GT Karnal Road, ND-110036."],
        mapsUrl: "https://maps.app.goo.gl/SFuD5pBEoPLhfBGUA",
      },
      {
        label: "Ghurchari",
    
  name: "Venue - RAJ DARBAR HALL, City Park Green Resort",
  address: ["NH-1, GT Karnal Road, ND-110036."],
        mapsUrl: "https://maps.app.goo.gl/UWUUzPderMVHyJnB6",
      },
    ],
    image: weddingImg,
  },
];

function DetailRow({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="w-28 shrink-0 font-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground pt-1">
        {label}
      </span>
      <div className="font-body text-[15px] leading-snug text-ink">{value}</div>
    </div>
  );
}

/** The four requested ceremonies, chronologically stacked. No scratch interactions here. */
export function EventCards() {
  return (
    <section className="px-5 pb-8 pt-6">
      <Reveal>
        <div className="text-center">
          <p className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-deep">
            Wedding festivities
          </p>
          <h2 className="mt-3 font-script text-5xl gold-text">The Celebrations</h2>
          <p className="mx-auto mt-3 max-w-[300px] font-body text-base italic text-muted-foreground">
            Join Ankit & Uma in Delhi for their celebrations.
          </p>
          <GoldDivider className="mx-auto mt-6 w-44" />
        </div>
      </Reveal>

      <div className="mt-8 space-y-8">
        {WEDDING_EVENTS.map((event) => {
          const [dateDay = "11", dateMonth = "December"] = event.date.split(" ");
          return (
          <Reveal key={event.key} delayMs={80}>
            <article className={`theme-${event.key} ornate-frame overflow-hidden rounded-3xl bg-card`}>
              <div className="relative">
                <img
                  src={event.image}
                  alt={`${event.title} illustration`}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-44 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="event-accent-soft event-accent-chip event-accent-text absolute right-3 top-3 rounded-full border bg-card/70 px-3 py-1 font-display text-[9px] uppercase tracking-[0.25em] backdrop-blur-sm">
                  {dateDay} {dateMonth.slice(0, 3)}
                </span>
              </div>

              <div className="px-5 pb-6 pt-3">
                <h3 className="event-accent-text font-display text-xl font-semibold tracking-wide">
                  {event.title}
                </h3>
                {event.weddingInvitation && (
                  <div className="mt-4 text-center">
                    <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-deep">
                      WITH HEARTFELT BLESSINGS OF ALMIGHTY
                    </p>
                    <p className="mt-3 font-display text-sm font-semibold text-ink">Smt. Prem Lata Gupta</p>
                    <p className="font-body text-sm italic text-muted-foreground">W/o Lt. Krishan Kumar Gupta</p>
                    <p className="mx-auto mt-4 max-w-[290px] font-display text-[10px] uppercase leading-relaxed tracking-[0.13em] text-gold-deep">
                      CORDIALLY REQUESTS THE HONOUR OF YOUR GRACIOUS PRESENCE AT THE
                    </p>
                    <p className="mt-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                      WEDDING OF HER BELOVED GRANDSON
                    </p>
                  </div>
                )}
                {event.coupleDetails && (
                  <div className="mt-4 text-center">
                    <div>
                      <p className="font-script text-3xl gold-text">Ankit</p>
                      <p className="font-body text-sm italic text-muted-foreground">
                        (S/o Mrs. Seema &amp; Mr. Jaideep Gupta)
                      </p>
                    </div>
                    <p className="my-1 font-script text-2xl text-gold-deep">&amp;</p>
                    <div>
                      <p className="font-script text-3xl gold-text">Uma</p>
                      <p className="font-body text-sm italic text-muted-foreground">
                        (D/o Mrs. Mamta &amp; Mr. Veer Sain Upadhyay)
                      </p>
                    </div>
                  </div>
                )}
                {event.blurb && (
                  <p className="mt-2 text-center font-body text-sm italic text-muted-foreground">
                    {event.blurb}
                  </p>
                )}
                <GoldDivider className="mt-4 w-32" />

<div className="mt-4 space-y-2.5">
  <DetailRow label="Date" value={event.date} />
  <DetailRow label="Day" value={event.day} />
  {event.time && <DetailRow label="Time" value={event.time} />}
</div>

{event.schedules && event.schedules.length > 0 ? (
  event.schedules.map((schedule, index) => (
    <div key={schedule.label} className="mt-5">
<div className="mt-2 flex flex-wrap items-baseline gap-x-2">
  <span className="font-display text-sm font-bold">
    {schedule.label}
  </span>
  <span className="font-body text-[15px]">
    {schedule.time}
  </span>
  {schedule.label === "Ghurchari" && event.followedBy && (
    <span className="font-body text-sm italic text-muted-foreground">
      {event.followedBy}
    </span>
  )}
</div>

      {event.venues[index] && (
        <div className="mt-3">
          <p className="font-display text-sm font-semibold tracking-wide text-ink">
            {event.venues[index].name}
          </p>
          <p className="mt-1 font-body text-[15px] leading-snug text-ink">
            {event.venues[index].address.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
          <a
            href={event.venues[index].mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-linear-to-r from-gold-soft/45 to-gold/35 px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.25em] text-ink transition-transform active:scale-95"
          >
            <PinIcon className="h-4 w-4" />
            Get Directions
          </a>
        </div>
      )}
    </div>
  ))
) : (
  event.venues.map((venue) => (
    <div key={venue.name} className="mt-5">
      <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {venue.label}
      </p>
      <p className="font-display text-sm font-semibold tracking-wide text-ink">
        {venue.name}
      </p>
      <p className="mt-1 font-body text-[15px] leading-snug text-ink">
        {venue.address.map((line) => (
          <span key={line} className="block">{line}</span>
        ))}
      </p>
      <a
        href={venue.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-linear-to-r from-gold-soft/45 to-gold/35 px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.25em] text-ink transition-transform active:scale-95"
      >
        <PinIcon className="h-4 w-4" />
        Get Directions
      </a>
    </div>
  ))
)}
              </div>
            </article>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}

          
