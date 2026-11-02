import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { GoldDivider } from "./ornaments";

const WEDDING_AT = new Date("2026-11-28T19:00:00+05:30").getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number; past: boolean };

function partsNow(): Parts {
  const diff = WEDDING_AT - Date.now();
  const total = Math.floor(Math.max(0, diff) / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    past: diff <= 0,
  };
}

/** Live countdown to the wedding: 28 November 2026, 7:00 PM IST. */
export function WeddingCountdown() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(partsNow());
    const id = setInterval(() => setParts(partsNow()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Days", value: parts?.days },
    { label: "Hours", value: parts?.hours },
    { label: "Minutes", value: parts?.minutes },
    { label: "Seconds", value: parts?.seconds },
  ];

  return (
    <section className="relative px-5 py-14">
      <Reveal>
        <div className="text-center">
          <p className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-deep">
            The wait begins
          </p>
          <h2 className="mt-3 font-script text-5xl gold-text">Counting Down to Forever</h2>
          <p className="mx-auto mt-3 max-w-[300px] font-body text-base italic text-muted-foreground">
            Every second brings us closer to Saturday, 28 November 2026, 7:00 PM.
          </p>
        </div>
      </Reveal>

      <Reveal delayMs={150}>
        <div className="mx-auto mt-8 grid max-w-[360px] grid-cols-4 gap-2.5">
          {cells.map((cell) => (
            <div key={cell.label} className="countdown-box rounded-2xl px-1 py-4 text-center">
              <span
                key={cell.value ?? "wait"}
                className="block animate-in fade-in slide-in-from-bottom-1 font-display text-[1.55rem] font-semibold leading-none text-ink duration-500"
              >
                {parts ? String(cell.value).padStart(2, "0") : "--"}
              </span>
              <span className="mt-2 block font-display text-[8.5px] uppercase tracking-[0.28em] text-gold-deep">
                {cell.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {parts?.past && (
        <Reveal>
          <p className="mt-6 text-center font-script text-3xl gold-text">The celebration has begun!</p>
        </Reveal>
      )}

      <GoldDivider className="mx-auto mt-10 w-44" />
    </section>
  );
}
