import { useEffect, useMemo, useState } from "react";
import image1 from "../assets/our-place/place1.jpg";
import image2 from "../assets/our-place/place2.jpg";
import image3 from "../assets/our-place/place3.jpg";

/**
 * SpaceSlider – main image with arrows + thumbnail strip
 * - No external deps
 * - Keyboard: ←/→ navigate
 * - Responsive; thumbnails scroll on small screens
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

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div role="region" aria-label="Ο Χώρος – προβολέας εικόνων" className="w-full">
      {/* Main viewport */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl border-4 border-white shadow-lg bg-gray-200">
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />

        {/* Prev */}
        <button
          type="button"
          onClick={prev}
          aria-label="Προηγούμενη εικόνα"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 md:h-6 md:w-6"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={next}
          aria-label="Επόμενη εικόνα"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 md:h-6 md:w-6"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex items-center justify-center gap-4 overflow-x-auto no-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Επιλογή εικόνας ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={
              `group relative overflow-hidden rounded-lg border-4 ${
                i === index ? "ring-2 ring-primary" : "ring-1 ring-black/10"
              } w-28 sm:w-36 md:w-40 aspect-video focus:outline-none focus:ring-2 focus:ring-primary/60`
            }
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
    </div>
  );
}

/* Optional: hide native scrollbar on thumbnail row for a cleaner look */
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
