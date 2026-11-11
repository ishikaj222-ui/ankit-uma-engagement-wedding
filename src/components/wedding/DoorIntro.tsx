
import { useEffect, useState } from "react";
import doorsImg from "@/assets/palace-doors.jpg";
src="/Copy of Save the Date (1).png"

export function DoorIntro() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  const openInvitation = () => {
    const audio = document.getElementById("wedding-instrumental");
    if (audio instanceof HTMLAudioElement) {
      audio.volume = 0.32;
      void audio.play().catch(() => undefined);
    }
    setOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-maroon-deep">
      <div className="door-scene relative h-full w-full max-w-[430px] overflow-hidden">
        <div className={`absolute inset-0 ${open ? "door-open" : ""}`}>
          <div
            className="door-half left"
            onTransitionEnd={(e) => {
              if (e.propertyName === "transform" && open) setGone(true);
            }}
          >
            <img src={doorsImg} alt="" width={1024} height={1920} />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/50 to-transparent" />
          </div>
          <div className="door-half right">
            <img src={doorsImg} alt="" width={1024} height={1920} />
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/50 to-transparent" />
          </div>
        </div>
        <button
          type="button"
          onClick={openInvitation}
          disabled={open}
          aria-label="Open the wedding invitation"
          className="absolute left-1/2 top-1/2 z-10 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-maroon-deep/90 p-4 shadow-2xl ring-1 ring-gold/30 transition-transform duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none"
        >
          <img
            src={auMonogram.url}
            alt="AU monogram"
            width={433}
            height={364}
            className="h-full w-full object-contain"
          />
        </button>
      </div>
    </div>
  );
}
