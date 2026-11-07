import { describe, expect, it } from "vitest";

import { scratchRevealThreshold } from "@/components/wedding/ScratchCard";

describe("scratch card reveal threshold", () => {
  it("reveals after approximately 25% is cleared on mobile touch", () => {
    expect(scratchRevealThreshold(true)).toBe(0.25);
  });

  it("keeps the existing 50% threshold outside mobile touch", () => {
    expect(scratchRevealThreshold(false)).toBe(0.5);
  });
});