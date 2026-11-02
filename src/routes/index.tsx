import { createFileRoute } from "@tanstack/react-router";
import { DoorIntro } from "@/components/wedding/DoorIntro";
import { InvitationCover } from "@/components/wedding/InvitationCover";
import { ScratchCard } from "@/components/wedding/ScratchCard";
import { WeddingCountdown } from "@/components/wedding/Countdown";
import { EventCards } from "@/components/wedding/EventCards";
import { GoldDivider } from "@/components/wedding/ornaments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ananya & Samarth — Wedding Invitation · 28 November 2026, Jaipur",
      },
      {
        name: "description",
        content:
          "Ananya Sharma weds Samarth Mehta — Saturday, 28 November 2026 at 7:00 PM, The Royal Heritage Palace, Jaipur. Celebrate Haldi, Mehendi, Sangeet and the wedding with us.",
      },
      { property: "og:title", content: "Ananya & Samarth — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Scratch, count down and celebrate — four days of wedding festivities in Jaipur, 25–28 November 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingInvitation,
});

function WeddingInvitation() {
  return (
    <main className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-clip bg-background font-body shadow-2xl shadow-black/50">
      <InvitationCover />
      <ScratchCard />
      <WeddingCountdown />
      <EventCards />

      <footer className="px-6 pb-12 pt-2 text-center">
        <GoldDivider className="mx-auto w-44" />
        <p className="mt-5 font-script text-4xl gold-text">With love & blessings</p>
        <p className="mt-2 font-body text-base text-muted-foreground">The Sharma & Mehta Families</p>
        <p className="mt-5 font-display text-[10px] uppercase tracking-[0.3em] text-gold-deep">
          #AnanyaWedsSamarth · Jaipur, Rajasthan
        </p>
      </footer>

      {/* Interactive palace doors — the entry experience */}
      <DoorIntro />
    </main>
  );
}
