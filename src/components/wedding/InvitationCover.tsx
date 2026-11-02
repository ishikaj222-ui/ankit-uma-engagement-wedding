import coverBg from "@/assets/cover-bg.jpg";
import { GoldDivider } from "./ornaments";

export function InvitationCover() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={coverBg}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
      <div className="relative px-6 pb-16 pt-20 text-center">
        <p className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-deep">
          Wedding Invitation
        </p>
        <GoldDivider className="mx-auto mt-5 w-44" />

        <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-gold/70 ornate-frame font-display text-xl font-semibold tracking-[0.15em] text-gold-deep">
          A&nbsp;·&nbsp;S
        </div>

        <h1 className="mt-6 font-script text-[4.2rem] leading-none gold-text">Ananya</h1>
        <p className="mt-1 font-script text-4xl text-gold-deep">&</p>
        <h1 className="mt-1 font-script text-[4.2rem] leading-none gold-text">Samarth</h1>

        <GoldDivider className="mx-auto mt-8 w-44" />

        <p className="mt-6 font-body text-lg italic text-muted-foreground">
          Together with their families, joyfully invite you to celebrate their wedding
        </p>

        <div className="mt-7 space-y-2.5 font-display text-sm tracking-[0.18em] text-ink">
          <p className="font-semibold text-gold-deep">SATURDAY · 28 NOVEMBER 2026</p>
          <p>7:00 PM ONWARDS</p>
          <p className="text-xs tracking-[0.25em] text-muted-foreground">
            THE ROYAL HERITAGE PALACE · JAIPUR, RAJASTHAN
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <span className="float-slow font-display text-[10px] uppercase tracking-[0.35em] text-gold-deep">
            ✦ Scroll to unfold ✦
          </span>
        </div>
      </div>
    </section>
  );
}
