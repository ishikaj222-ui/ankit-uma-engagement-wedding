import { useEffect, useState } from "react";
import doorsImg from "@/assets/palace-doors.jpg";

export function DoorIntro() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

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
          onClick={() => setOpen(true)}
          disabled={open}
          aria-label="Open the wedding invitation"
          className="absolute inset-0 z-10 flex items-end justify-center pb-16"
        >
          <span className="door-hint rounded-full border border-gold/50 bg-maroon-deep/70 px-6 py-2.5 font-display text-[10px] uppercase tracking-[0.35em] text-gold-soft backdrop-blur-sm">
            Tap to open
          </span>
        </button>
      </div>
    </div>
  );
}
