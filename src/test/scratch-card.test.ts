import { describe, expect, it } from "vitest";

import { scratchRevealThreshold } from "@/components/wedding/ScratchCard";
import { WEDDING_EVENTS } from "@/components/wedding/EventCards";

describe("scratch card reveal threshold", () => {
  it("reveals after approximately 25% is cleared on mobile touch", () => {
    expect(scratchRevealThreshold(true)).toBe(0.25);
  });

  it("keeps the existing 50% threshold outside mobile touch", () => {
    expect(scratchRevealThreshold(false)).toBe(0.5);
  });

  it("shows the four ceremonies with the supplied dates, venues, addresses, and directions", () => {
    expect(WEDDING_EVENTS.map((event) => [event.title, event.date])).toEqual([
      ["Engagement Ceremony", "5 December 2026"],
      ["Haldi Ceremony", "11 December 2026"],
      ["Mehandi Ceremony", "11 December 2026"],
      ["Wedding Ceremony", "12 December 2026"],
    ]);
    expect(WEDDING_EVENTS[0]?.venues[0]).toMatchObject({
      name: "EME Officers Mess",
      address: ["Thimayya Park, Baird Place,", "Delhi Cantonment, ND-110010."],
      mapsUrl: "https://maps.app.goo.gl/ycV4tmTmzPnaTNVt5?g_st=iw",
    });
    expect(WEDDING_EVENTS[1]?.venues[0]?.address).toEqual([
      "Mandakini, Alaknanda,",
      "New Delhi – 110019.",
    ]);
    expect(WEDDING_EVENTS[2]?.venues[0]?.address).toEqual([
      "Mandakini, Alaknanda,",
      "New Delhi – 110019.",
    ]);
    expect(WEDDING_EVENTS[3]?.venues).toMatchObject([
      {
        label: "Venue 1 — Sehra Bandi & Ghurchari",
        name: "UDMAN HOTELS & RESORTS",
        address: ["Q4WV+7Q6 NH-1,", "GT Karnal Road, ND-110036."],
        mapsUrl: "https://maps.app.goo.gl/8hBSdVNR122eshcz8g_st-iw",
      },
      {
        label: "Venue 2 — Wedding",
        name: "RAJ DARBAR HALL",
        address: ["City Park Green Resort,", "NH-1, GT Karnal Road, ND-110036."],
        mapsUrl: "https://maps.app.goo.gl/fgd7WUWgCeYljunk67g",
      },
    ]);
  });
});