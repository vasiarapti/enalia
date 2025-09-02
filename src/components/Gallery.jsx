import { useEffect, useMemo, useRef, useState } from "react";
import image1 from "../assets/our-place/place1.jpg";
import image2 from "../assets/our-place/place2.jpg";
import image3 from "../assets/our-place/place3.jpg";

/**
 * Coverflow-style slider:
 * - Center slide large, side slides smaller/rotated and peeking
 * - Click sides or use arrows / keyboard (← →)
 * - Swipe (pointer) support
 * - Responsive, no external deps
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
  const stageRef = useRef(null);
  const startX = useRef(null);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Simple swipe
  const onPointerDown = (e) => {
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const onPointerUp = (e) => {
    const end =
      e.clientX ?? e.changedTouches?.[0]?.clientX ?? startX.current ?? 0;
    const dx = end - (startX.current ?? end);
    const THRESH = 40; // px
    if (Math.abs(dx) > THRESH) (dx > 0 ? prev : next)();
    startX.current = null;
  };

  // Helpers
  const at = (offset) => (index + offset + images.length) % images.length;

  // Visual params for offsets -1, 0, +1
  const params = {
    "-1": { x: -26, scale: 0.9, rotate: 8,  z: 30, opacity: 0.95 },
    "0":  { x: 0,   scale: 1.0, rotate: 0,  z: 40, opacity: 1   },
    "1":  { x: 26,  scale: 0.9, rotate: -8, z: 30, opacity: 0.95 },
  };

  const Slide = ({ img, cfg, isCenter, onClick }) => {
    const t = `translate(-50%, -50%) translateX(${cfg.x}%) scale(${cfg.scale}) rotateY(${cfg.rotate}deg)`;
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={isCenter ? "Επόμενη εικόνα" : "Μετάβαση σε αυτή την εικόνα"}
        className={`absolute left-1/2 top-1/2
                    transition-transform duration-500 ease-out
                    focus:outline-none focus:ring-2 focus:ring-white/80
                    `}
        style={{
          transform: t,
          zIndex: cfg.z,
          opacity: cfg.opacity,
          // Width basis of each slide before scaling:
          width: "70%",
          // Enable 3D look:
          transformStyle: "preserve-3d",
        }}
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
      {/* Stage */}
      <div
        ref={stageRef}
        className="relative w-full"
        style={{
          // Keeps a comfortable stage height; slides are absolutely centered within.
          height: "min(56vw, 26rem)",
          perspective: "1000px",
          overflow: "visible",
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        {/* Left neighbor */}
        <Slide
          img={images[at(-1)]}
          cfg={params["-1"]}
          isCenter={false}
          onClick={() => setIndex(at(-1))}
        />

        {/* Center */}
        <Slide
          img={images[index]}
          cfg={params["0"]}
          isCenter
          onClick={next}
        />

        {/* Right neighbor */}
        <Slide
          img={images[at(1)]}
          cfg={params["1"]}
          isCenter={false}
          onClick={() => setIndex(at(1))}
        />

        {/* Prev / Next controls */}
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
