import { useEffect, useMemo, useState } from "react";
import place1 from "../assets/our-place/place1.png";
import place2 from "../assets/our-place/place2.png";
import place3 from "../assets/our-place/place3.png";
import place4 from "../assets/our-place/place4.png";
import place5 from "../assets/our-place/place5.png";

/**
 * SpaceSlider – main image + thumbnails + fullscreen modal
 * Props:
 * - mainMaxW: Tailwind max-width for main image wrapper (default keeps current)
 * - mainAspect: Tailwind aspect-ratio classes for main image (default keeps current)
 * - thumbsMaxW: Tailwind max-width for thumbnails row (default keeps current)
 */
export default function SpaceSlider({
  mainMaxW = "max-w-[60rem]",
  mainAspect = "aspect-video md:aspect-[2/1] lg:aspect-[21/9]",
  thumbsMaxW = "max-w-[60rem]",
}) {
  const images = useMemo(
    () => [
      { src: place1.src, alt: "Χώρος θεραπείας 1" },
      { src: place2.src, alt: "Χώρος θεραπείας 2" },
      { src: place3.src, alt: "Χώρος θεραπείας 3" },
      { src: place4.src, alt: "Χώρος θεραπείας 4" },
      { src: place5.src, alt: "Χώρος θεραπείας 5" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  return (
    <div role="region" aria-label="Ο Χώρος – προβολέας εικόνων" className="w-full mx-auto">
      {/* MAIN: width + aspect controlled by props */}
      <div className={`mx-auto w-full ${mainMaxW}`}>
        <div className={`relative w-full ${mainAspect} overflow-hidden rounded-xl border-4 border-white shadow-lg bg-gray-200`}>
          <img
            src={images[index].src}
            alt={images[index].alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />

          <button onClick={() => setIsOpen(true)} aria-label="Πλήρης οθόνη" className="absolute inset-0 z-10 cursor-zoom-in" />

          <button
            type="button"
            onClick={prev}
            aria-label="Προηγούμενη εικόνα"
            className="absolute z-20 left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 md:h-6 md:w-6"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Επόμενη εικόνα"
            className="absolute z-20 right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 md:h-6 md:w-6"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* THUMBS: keep current size by default */}
      <div
        className={`mt-4 mx-auto w-full ${thumbsMaxW} grid gap-4`}
        style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Επιλογή εικόνας ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`group relative overflow-hidden rounded-lg border-4 ${
              i === index ? "ring-2 ring-primary" : "ring-1 ring-black/10"
            } w-full aspect-video focus:outline-none focus:ring-2 focus:ring-primary/60`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>

      {/* Fullscreen modal (όπως ήταν) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Πλήρης οθόνη εικόνας"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={images[index].src}
            alt={images[index].alt}
            className="max-w-full max-h-full rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Κλείσιμο"
            className="absolute top-4 right-4 rounded-full bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Προηγούμενη"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-3"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Επόμενη"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-3"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
