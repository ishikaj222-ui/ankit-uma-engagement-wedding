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
        <h1 className="px-1 pt-2 font-script text-[4.2rem] leading-[1.14] gold-text">Ankit</h1>
        <p className="mt-1 font-script text-4xl text-gold-deep">&amp;</p>
        <h2 className="mt-1 px-1 pt-2 font-script text-[4.2rem] leading-[1.14] gold-text">Uma</h2>

        <p className="mt-5 font-display text-[11px] uppercase tracking-[0.4em] text-gold-deep">
          Wedding Invitation
        </p>
        <GoldDivider className="mx-auto mt-5 w-44" />

        <p className="mt-6 font-body text-lg italic text-muted-foreground">
          Together with their families, joyfully invite you to celebrate their wedding
        </p>

        <div className="mt-7 space-y-2.5 font-display text-sm tracking-[0.18em] text-ink">
          <p className="font-semibold text-gold-deep">SATURDAY · 12 DECEMBER 2026</p>
          <p className="text-xs tracking-[0.25em] text-muted-foreground">
            RAJ DARBAR HALL · NEW DELHI
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
