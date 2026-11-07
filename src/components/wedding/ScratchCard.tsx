import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { GoldDivider } from "./ornaments";
import { Reveal } from "./Reveal";

type Pt = { x: number; y: number };

export function scratchRevealThreshold(isMobileTouch: boolean) {
  return isMobileTouch ? 0.25 : 0.5;
}

function tokenColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}

/** The single scratch-to-reveal card on the site: the wedding date. */
export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const state = useRef({ drawing: false, last: null as Pt | null, moves: 0, done: false, mobileTouch: false });
  const [revealed, setRevealed] = useState(false);
  const [fxId, setFxId] = useState(0);

  const reveal = useCallback(() => {
    if (state.current.done) return;
    state.current.done = true;
    setRevealed(true);
    setFxId((n) => n + 1);
  }, []);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth || 320;
    const h = canvas.clientHeight || 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gold = tokenColor("--gold", "#c9a24b");
    const goldSoft = tokenColor("--gold-soft", "#e8cf8f");
    const goldDeep = tokenColor("--gold-deep", "#a4771f");

    // Antique gold surface
    ctx.save();
    roundRectPath(ctx, 0, 0, w, h, 24);
    ctx.clip();
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, goldSoft);
    grad.addColorStop(0.32, gold);
    grad.addColorStop(0.62, goldDeep);
    grad.addColorStop(1, gold);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Diagonal sheen
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#ffffff";
    for (let i = -1; i < 8; i++) {
      ctx.save();
      ctx.translate((i * w) / 7, 0);
      ctx.rotate(-0.55);
      ctx.fillRect(0, -h, 12, h * 3);
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    // Inner hairline frame
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = goldDeep;
    ctx.lineWidth = 1;
    roundRectPath(ctx, 14, 14, w - 28, h - 28, 17);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Floral corner flourishes: twin arcs + blossom dots
    const corner = (cx: number, cy: number, sx: number, sy: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sx, sy);
      ctx.strokeStyle = goldDeep;
      ctx.fillStyle = goldDeep;
      ctx.globalAlpha = 0.75;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 37, 0, Math.PI / 2);
      ctx.stroke();
      for (const t of [0.3, 0.65, 1.0, 1.35]) {
        const a = t * (Math.PI / 2);
        ctx.beginPath();
        ctx.arc(46 * Math.cos(a), 46 * Math.sin(a), 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(30, 30, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    corner(18, 18, 1, 1);
    corner(w - 18, 18, -1, 1);
    corner(18, h - 18, 1, -1);
    corner(w - 18, h - 18, -1, -1);

    // Little golden hearts
    const heart = (x: number, y: number, s: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = goldDeep;
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-5, -2, -4, -8, 0, -4);
      ctx.bezierCurveTo(4, -8, 5, -2, 0, 3);
      ctx.fill();
      ctx.restore();
    };
    heart(w * 0.2, h * 0.3, 1.6, 0.55);
    heart(w * 0.82, h * 0.28, 1.2, 0.5);
    heart(w * 0.76, h * 0.72, 1.8, 0.55);
    heart(w * 0.24, h * 0.74, 1.1, 0.5);

    // Central decorative question mark
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = goldDeep;
    ctx.globalAlpha = 0.92;
    ctx.shadowColor = "rgba(255,255,255,0.35)";
    ctx.shadowBlur = 8;
    ctx.font = `600 ${Math.round(h * 0.3)}px Cinzel, Georgia, serif`;
    ctx.fillText("?", w / 2, h / 2 - 10);
    ctx.shadowBlur = 0;

    ctx.globalAlpha = 0.85;
    ctx.font = "500 11px Cinzel, Georgia, serif";
    if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "4px";
    ctx.fillText("SCRATCH GENTLY", w / 2, h - 30);
    if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0px";
    ctx.globalAlpha = 1;
    ctx.restore();
  }, []);

  useEffect(() => {
    paint();
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(() => {
      if (!state.current.done) paint();
    });
    const onResize = () => {
      if (!state.current.done) paint();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paint]);

  const posOf = (e: ReactPointerEvent<HTMLCanvasElement>): Pt => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const erase = (from: Pt, to: Pt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = canvas.width / (canvas.clientWidth || 1);
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x + 0.01, to.y);
    ctx.stroke();
    ctx.restore();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || state.current.done) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 16) {
      total++;
      if (data[i] < 40) cleared++;
    }
    if (total > 0 && cleared / total > scratchRevealThreshold(state.current.mobileTouch)) reveal();
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    state.current.mobileTouch =
      e.pointerType === "touch" &&
      window.matchMedia("(max-width: 767px) and (pointer: coarse)").matches;
    state.current.drawing = true;
    const p = posOf(e);
    state.current.last = p;
    erase(p, p);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const s = state.current;
    if (!s.drawing || s.done) return;
    const p = posOf(e);
    erase(s.last ?? p, p);
    s.last = p;
    if (++s.moves % (s.mobileTouch ? 4 : 10) === 0) checkProgress();
  };

  const endScratch = () => {
    if (state.current.mobileTouch) checkProgress();
    state.current.drawing = false;
    state.current.last = null;
  };

  return (
    <section id="date-reveal" className="px-5 pb-6 pt-14">
      <Reveal>
        <div className="text-center">
          <p className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-deep">
            A little secret
          </p>
          <h2 className="mt-3 font-script text-5xl gold-text">A Special Date Awaits You!</h2>
          <p className="mx-auto mt-3 max-w-[300px] font-body text-base italic text-muted-foreground">
            Scratch the golden surface to discover when our forever begins.
          </p>
        </div>
      </Reveal>

      <Reveal delayMs={150}>
        <div className="relative mx-auto mt-8 w-full max-w-[330px]">
          <div
            className="ornate-frame relative overflow-hidden rounded-3xl bg-card"
            style={{ aspectRatio: "4 / 5" }}
          >
            {/* Hidden content beneath the golden surface */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center transition-transform duration-1000 ${
                revealed ? "scale-100" : "scale-95"
              }`}
            >
              <p className="font-display text-[10px] tracking-[0.45em] text-gold-deep">SAVE THE DATE</p>
              <GoldDivider className="w-28" />
              <p className="mt-1 font-display text-[1.65rem] font-semibold tracking-wide text-ink">
                28 NOVEMBER 2026
              </p>
              <p className="font-display text-xs tracking-[0.4em] text-gold-deep">SATURDAY</p>
              <p className="mt-2 font-script text-[2.6rem] leading-none gold-text">Ananya & Samarth</p>
              <p className="mt-2 font-body text-sm italic leading-snug text-muted-foreground">
                “Two hearts, one beautiful journey, forever together.”
              </p>
            </div>

            {/* Golden scratch surface */}
            <canvas
              ref={canvasRef}
              className={`scratch-canvas absolute inset-0 h-full w-full rounded-3xl transition-opacity duration-700 ${
                revealed ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endScratch}
              onPointerCancel={endScratch}
              onPointerLeave={endScratch}
            />
          </div>
          {revealed && <RevealFx id={fxId} />}
        </div>
      </Reveal>
    </section>
  );
}

function RevealFx({ id }: { id: number }) {
  const particles = useMemo(() => {
    const sparkles = Array.from({ length: 22 }, () => ({
      tx: (Math.random() - 0.5) * 260,
      ty: -(30 + Math.random() * 220),
      left: 20 + Math.random() * 60,
      top: 30 + Math.random() * 40,
      size: 10 + Math.random() * 12,
      delay: Math.random() * 0.5,
    }));
    const petals = Array.from({ length: 12 }, () => ({
      left: Math.random() * 96,
      dur: 2.6 + Math.random() * 1.8,
      delay: Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 120,
      spin: 180 + Math.random() * 360,
      scale: 0.8 + Math.random() * 0.6,
      rose: Math.random() > 0.5,
    }));
    return { sparkles, petals };
  }, [id]);

  const [alive, setAlive] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setAlive(false), 5200);
    return () => clearTimeout(t);
  }, [id]);

  if (!alive) return null;

  return (
    <div key={id} className="pointer-events-none absolute -inset-6" aria-hidden="true">
      {particles.sparkles.map((s, i) => (
        <span
          key={`sparkle-${i}`}
          className="sparkle"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              fontSize: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              "--tx": `${s.tx}px`,
              "--ty": `${s.ty}px`,
            } as CSSProperties
          }
        >
          ✦
        </span>
      ))}
      {particles.petals.map((p, i) => (
        <span
          key={`petal-${i}`}
          className={`petal ${p.rose ? "petal-rose" : "petal-gold"}`}
          style={
            {
              left: `${p.left}%`,
              width: `${10 * p.scale}px`,
              height: `${15 * p.scale}px`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
