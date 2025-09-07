import { useEffect, useMemo, useRef, useState } from "react";
import image1 from "../assets/our-place/place1.jpg";
import image2 from "../assets/our-place/place2.jpg";
import image3 from "../assets/our-place/place3.jpg";

/**
 * Coverflow slider with drag (mouse/touch) + click + arrows + keys
 * - Drag to slide (desktop & mobile)
 * - Click center = next, click side = jump
 * - ←/→ arrows, on-screen buttons
 */
export default function SpaceSlider() {
  const images = useMemo(
    () => [
      { src: image1.src, alt: "Χώρος θεραπείας 1" },
      { src: image2.src, alt: "Χώρος θεραπείας 2" },
      { src: image3.src, alt: "Χώρος θεραπείας 3" },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  // Drag state
  const stageRef = useRef(null);
  const [stageW, setStageW] = useState(0);
  const [dragX, setDragX] = useState(0);      // px delta while dragging/animating
  const [isDragging, setIsDragging] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const startXRef = useRef(0);
  const movedRef = useRef(false);             // suppress click when true

  // Setup ResizeObserver to keep stageW current
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      setStageW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const at = (off) => (index + off + images.length) % images.length;

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drag handlers (Pointer events = mouse + touch)
  const onPointerDown = (e) => {
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    startXRef.current = x;
    movedRef.current = false;
    setIsDragging(true);
    setEnableTransition(false); // immediate follow during drag
    // capture pointer for consistent move/up
    if (e.target.setPointerCapture && e.pointerId != null) {
      try { e.target.setPointerCapture(e.pointerId); } catch {}
    }
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = x - startXRef.current;
    if (Math.abs(dx) > 3) movedRef.current = true;
    setDragX(dx);
  };

  const TRANSITION_MS = 350;
  const THRESHOLD = 0.22; // ~22% of width

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const progress = stageW ? dragX / stageW : 0;

    // If we crossed the threshold, animate to the neighbor first,
    // then switch index and reset dragX without a visible jump.
    if (Math.abs(progress) > THRESHOLD) {
      const sign = progress > 0 ? 1 : -1; // drag right -> previous
      setEnableTransition(true);
      setDragX(sign * stageW); // animate to full neighbor

      setTimeout(() => {
        // switch slide
        if (sign > 0) prev();
        else next();

        // instantly reset to center for the new index (no transition)
        setEnableTransition(false);
        setDragX(0);
        // re-enable transitions for future interactions
        requestAnimationFrame(() => setEnableTransition(true));
      }, TRANSITION_MS);
    } else {
      // Snap back to center
      setEnableTransition(true);
      setDragX(0);
      setTimeout(() => setEnableTransition(true), TRANSITION_MS);
    }
  };

  // Coverflow params & interpolation
  const base = {
    left:   { x: -26, scale: 0.9, rotate:  8,  z: 30 },
    center: { x:   0, scale: 1.0, rotate:  0,  z: 40 },
    right:  { x:  26, scale: 0.9, rotate: -8,  z: 30 },
  };
  const mix = (a, b, t) => a + (b - a) * t;
  const lerpCfg = (a, b, t) => ({
    x:     mix(a.x, b.x, t),
    scale: mix(a.scale, b.scale, t),
    rotate:mix(a.rotate, b.rotate, t),
    z:     Math.round(mix(a.z, b.z, t)),
  });

  // progress in [-1,1]
  const p = stageW ? Math.max(-1, Math.min(1, dragX / stageW)) : 0;

  // Position for each rendered slide relative to active, adjusted by drag progress
  const posLeft   = -1 - p;
  const posCenter =  0 - p;
  const posRight  =  1 - p;

  const cfgForPos = (pos) => {
    if (pos <= -1) return base.left;
    if (pos >= 1)  return base.right;
    if (pos < 0)   return lerpCfg(base.left, base.center, pos + 1); // -1..0
    return          lerpCfg(base.center, base.right, pos);          // 0..1
  };

  const cfgLeft   = cfgForPos(posLeft);
  const cfgCenter = cfgForPos(posCenter);
  const cfgRight  = cfgForPos(posRight);

  const slideCls = [
    "absolute left-1/2 top-1/2",
    "focus:outline-none focus:ring-2 focus:ring-white/80",
    enableTransition ? "transition-transform duration-300 ease-out" : "transition-none",
  ].join(" ");

  const Slide = ({ img, cfg, isCenter, onClick }) => {
    const t = `translate(-50%, -50%) translateX(${cfg.x}%) scale(${cfg.scale}) rotateY(${cfg.rotate}deg)`;
    return (
      <button
        type="button"
        onClick={(e) => {
          // If the user dragged, ignore the click
          if (movedRef.current) return;
          onClick?.(e);
        }}
        aria-label={isCenter ? "Επόμενη εικόνα" : "Μετάβαση σε αυτή την εικόνα"}
        className={slideCls}
        style={{ transform: t, zIndex: cfg.z, transformStyle: "preserve-3d", width: "70%" }}
      >
        <div className="rounded-xl border-4 border-white shadow-xl overflow-hidden bg-gray-200">
          <img
            src={img.src}
            alt={img.alt}
            className="block w-full h-[38vw] sm:h-[22rem] md:h-[24rem] lg:h-[22rem] object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      </button>
    );
  };

  return (
    <div
      role="region"
      aria-label="Ο Χώρος – προβολέας εικόνων"
      className="w-full mx-auto px-2 max-w-[min(92vw,64rem)]"
    >
      <div
        ref={stageRef}
        className="relative w-full"
        style={{
          height: "min(56vw, 26rem)",
          perspective: "1000px",
          overflow: "visible",
          touchAction: "pan-y", // allow vertical scroll, but horizontal drag here
          userSelect: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {/* Left neighbor */}
        <Slide
          img={images[at(-1)]}
          cfg={cfgLeft}
          isCenter={false}
          onClick={() => setIndex(at(-1))}
        />
        {/* Center */}
        <Slide
          img={images[index]}
          cfg={cfgCenter}
          isCenter
          onClick={next}
        />
        {/* Right neighbor */}
        <Slide
          img={images[at(1)]}
          cfg={cfgRight}
          isCenter={false}
          onClick={() => setIndex(at(1))}
        />

        {/* Prev / Next buttons */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-1 sm:px-2">
          <button
            type="button"
            onClick={prev}
            className="pointer-events-auto rounded-full bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-white/80"
            aria-label="Προηγούμενη εικόνα"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 md:h-6 md:w-6"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="pointer-events-auto rounded-full bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-white/80"
            aria-label="Επόμενη εικόνα"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 md:h-6 md:w-6"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
