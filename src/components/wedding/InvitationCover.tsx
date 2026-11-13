
import coverBg from "@/assets/cover-bg.jpg";

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
        <h1 className="px-1 pt-2 font-script text-[4.2rem] leading-[1.14] gold-text">
          Ankit
        </h1>

        <p className="mt-1 font-script text-4xl text-gold-deep">
          &amp;
        </p>

        <h2 className="mt-1 px-1 pt-2 font-script text-[4.2rem] leading-[1.14] gold-text">
  Uma
</h2>

<div className="mx-auto mt-5 flex w-40 items-center gap-2">
  <span className="h-px flex-1 bg-gold-deep/70" />
  <span className="font-display text-xs text-gold-deep">✦</span>
  <span className="h-px flex-1 bg-gold-deep/70" />
</div>

<p className="mx-auto mt-4 max-w-xs px-2 font-body text-sm italic leading-relaxed text-ink">
  Together with their families, joyfully invite you to celebrate their wedding
</p>

        <div className="mt-12 flex justify-center">
          <span className="float-slow font-display text-xs font-bold uppercase tracking-[0.35em] text-gold-deep">
            ✦ Scroll to Unfold ✦
          </span>
        </div>
      </div>
    </section>
  );
}
