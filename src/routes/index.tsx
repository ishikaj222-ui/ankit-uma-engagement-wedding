import { createFileRoute } from "@tanstack/react-router";
import { DoorIntro } from "@/components/wedding/DoorIntro";
import { InvitationCover } from "@/components/wedding/InvitationCover";
import { ScratchCard } from "@/components/wedding/ScratchCard";
import { WeddingCountdown } from "@/components/wedding/Countdown";
import { EventCards } from "@/components/wedding/EventCards";
import { GoldDivider } from "@/components/wedding/ornaments";
import weddingInstrumental from "@/assets/royal-wedding-instrumental.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ankit & Uma — Wedding Invitation · 12 December 2026, Delhi",
      },
      {
        name: "description",
        content:
          "Ankit & Uma's Indian wedding invitation — engagement on 5 December and wedding celebrations on 11–12 December 2026 in Delhi.",
      },
      { property: "og:title", content: "Ankit & Uma — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Scratch, count down and celebrate Ankit & Uma's engagement, Haldi, Mehandi and wedding festivities in Delhi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingInvitation,
});

function WeddingInvitation() {
  return (
    <main className="invitation-paper relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-clip font-body shadow-2xl shadow-black/50">
      <audio
        id="wedding-instrumental"
        src={weddingInstrumental.url}
        loop
        preload="auto"
        aria-hidden="true"
      />
      <InvitationCover />
      <ScratchCard />
      <WeddingCountdown />
      <EventCards />

      <footer className="px-6 pb-12 pt-2 text-center">
        <GoldDivider className="mx-auto w-44" />
        <p className="mt-5 font-script text-4xl gold-text">With love & blessings</p>
        <p className="mt-2 font-body text-base text-muted-foreground">Together with their families</p>
      </footer>

      {/* Interactive palace doors — the entry experience */}
      <DoorIntro />
    </main>
  );
}
