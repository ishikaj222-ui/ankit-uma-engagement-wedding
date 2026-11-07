import haldiImg from "@/assets/haldi.jpg";
import mehendiImg from "@/assets/mehendi.jpg";
import sangeetImg from "@/assets/sangeet.jpg";
import weddingImg from "@/assets/wedding.jpg";
import { GoldDivider, PinIcon } from "./ornaments";
import { Reveal } from "./Reveal";

type WeddingEvent = {
  key: string;
  title: string;
  blurb: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  address: string;
  cityState: string;
  image: string;
};

const EVENTS: WeddingEvent[] = [
  {
    key: "haldi",
    title: "Haldi Ceremony",
    blurb: "A golden morning of turmeric, laughter and blessings.",
    date: "25 November 2026",
    day: "Wednesday",
    time: "10:00 AM – 1:00 PM",
    venue: "The Royal Courtyard",
    address: "12 Amer Road, Near Jal Mahal",
    cityState: "Jaipur, Rajasthan 302002",
    image: haldiImg,
  },
  {
    key: "mehendi",
    title: "Mehendi Ceremony",
    blurb: "Henna, jasmine and melodies under the floral arches.",
    date: "26 November 2026",
    day: "Thursday",
    time: "4:00 PM – 7:00 PM",
    venue: "The Grand Palace",
    address: "45 Civil Lines, Near Central Park",
    cityState: "Jaipur, Rajasthan 302006",
    image: mehendiImg,
  },
  {
    key: "sangeet",
    title: "Sangeet Night",
    blurb: "An evening of music, dance and shimmering lanterns.",
    date: "27 November 2026",
    day: "Friday",
    time: "7:00 PM – 11:00 PM",
    venue: "Royal Orchid Banquet",
    address: "21 Tonk Road, Near Gopalpura Flyover",
    cityState: "Jaipur, Rajasthan 302018",
    image: sangeetImg,
  },
  {
    key: "wedding",
    title: "Wedding Ceremony",
    blurb: "Seven vows around the sacred fire, forever entwined.",
    date: "28 November 2026",
    day: "Saturday",
    time: "7:00 PM onwards",
    venue: "The Royal Heritage Palace",
    address: "18 Jal Mahal Road, Amer",
    cityState: "Jaipur, Rajasthan 302002",
    image: weddingImg,
  },
  {
    key: "haldi-december",
    title: "Haldi Ceremony",
    blurb: "Followed by lunch.",
    date: "11 December 2026",
    day: "Friday",
    time: "12 PM onwards",
    venue: "Jahapanah Club",
    address: "Mandakini, Alaknanda,",
    cityState: "New Delhi – 110019",
    image: haldiImg,
  },
  {
    key: "mehandi-december",
    title: "Mehandi Ceremony",
    blurb: "Followed by dinner.",
    date: "11 December 2026",
    day: "Friday",
    time: "6:30 PM onwards",
    venue: "Jahapanah Club",
    address: "Mandakini, Alaknanda,",
    cityState: "New Delhi – 110019",
    image: mehendiImg,
  },
];

function mapsUrl(event: WeddingEvent) {
  if (event.key === "haldi-december" || event.key === "mehandi-december") {
    return "https://maps.app.goo.gl/ycV4tmTmzPnaTNVt5?g_st=iw";
  }
  const query = encodeURIComponent(`${event.venue}, ${event.address}, ${event.cityState}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="w-16 shrink-0 font-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground pt-1">
        {label}
      </span>
      <span className="font-body text-[15px] leading-snug text-ink">{value}</span>
    </div>
  );
}

/** Four themed event cards, chronologically stacked. No scratch interactions here. */
export function EventCards() {
  return (
    <section className="px-5 pb-8 pt-6">
      <Reveal>
        <div className="text-center">
          <p className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-deep">
            Four days of celebration
          </p>
          <h2 className="mt-3 font-script text-5xl gold-text">The Celebrations</h2>
          <p className="mx-auto mt-3 max-w-[300px] font-body text-base italic text-muted-foreground">
            From golden hues to sacred vows — join us for every moment in Jaipur.
          </p>
          <GoldDivider className="mx-auto mt-6 w-44" />
        </div>
      </Reveal>

      <div className="mt-8 space-y-8">
        {EVENTS.map((event) => {
          const [dateDay = "11", dateMonth = "December"] = event.date.split(" ");
          const directionsLabel =
            event.key === "haldi-december" || event.key === "mehandi-december"
              ? "Get Directions"
              : "View Location";
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
                <p className="mt-1 font-body text-sm italic text-muted-foreground">{event.blurb}</p>
                <GoldDivider className="mt-4 w-32" />

                <div className="mt-4 space-y-2.5">
                  <DetailRow label="Date" value={event.date} />
                  <DetailRow label="Day" value={event.day} />
                  <DetailRow label="Time" value={event.time} />
                  <DetailRow label="Venue" value={event.venue} />
                  <DetailRow label="Address" value={event.address} />
                  <DetailRow label="City" value={event.cityState} />
                </div>

                <a
                  href={mapsUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-linear-to-r from-gold-soft/45 to-gold/35 px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.25em] text-ink transition-transform active:scale-95"
                >
                  <PinIcon className="h-4 w-4" />
                  {directionsLabel}
                </a>
              </div>
            </article>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}
