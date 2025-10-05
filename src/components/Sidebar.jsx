import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

// Base helpers
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const withBase = (path = "") => BASE + String(path).replace(/^\/+/, "");

// Because this is a client component, we can safely read window.location.origin.
// Fallback to your production domain during SSR/build.
const ORIGIN =
  (typeof window !== "undefined" && window.location.origin) ||
  "https://enalia-therapy.gr";

const absolute = (path = "") =>
  // ensure exactly one slash between origin and path
  ORIGIN.replace(/\/$/, "") + "/" + withBase(path).replace(/^\//, "");

// Menu config (same structure, just using absolute URLs)
const menuItems = [
  { name: "ΑΡΧΙΚΗ", href: absolute("") },

  {
    name: "ΟΙ ΘΕΡΑΠΕΥΤΕΣ",
    href: absolute("team"),
    submenu: [
      { name: "ΕΥΗ ΚΑΡΑΒΑΝΑ", href: absolute("team/karavana") },
      { name: "ΧΡΗΣΤΟΣ ΚΩΣΤΙΚΙΔΗΣ", href: absolute("team/kostikidis") },
    ],
  },

  { name: "Η ΠΡΟΣΕΓΓΙΣΗ", href: absolute("psychotherapy") },

  {
    name: "ΟΙ ΥΠΗΡΕΣΙΕΣ",
    href: absolute("services"),
    submenu: [
      { name: "ΑΤΟΜΙΚΗ ΘΕΡΑΠΕΙΑ", href: absolute("services/individual-therapy") },
      { name: "ΘΕΡΑΠΕΙΑ ΖΕΥΓΟΥΣ", href: absolute("services/couple-therapy") },
      { name: "ΟΙΚΟΓΕΝΕΙΑΚΗ ΘΕΡΑΠΕΙΑ", href: absolute("services/family-therapy") },
      { name: "ΟΜΑΔΙΚΗ ΘΕΡΑΠΕΙΑ", href: absolute("services/group-therapy") },
      { name: "ΣΥΜΒΟΥΛΕΥΤΙΚΗ ΓΟΝΕΩΝ", href: absolute("services/parent-counselling") },
    ],
  },

  { name: "ONLINE ΨΥΧΟΘΕΡΑΠΕΙΑ", href: absolute("online") },
  { name: "ΒΙΩΜΑΤΙΚΕΣ ΔΡΑΣΕΙΣ", href: absolute("actions") },
  { name: "Ο ΧΩΡΟΣ", href: absolute("gallery") },
  { name: "ΕΠΙΚΟΙΝΩΝΙΑ", href: absolute("contact") },
];

export default function Sidebar() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Burger Button */}
      <button
        className="md:hidden fixed top-2 left-4 z-[60]"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={30} className="text-secondary" /> : <Menu size={30} className="text-secondary" />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-primary text-secondary w-full md:w-72 fixed top-0 left-0 h-screen z-50
        transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky md:top-0 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-2 mt-4">
          <img src={logo.src} alt="Logo" className="max-w-[200px] max-h-[200px] object-contain" />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Ενάλια</h2>
          <h3 className="text-sm">Κέντρο Ψυχοθεραπείας</h3>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-base font-medium px-4 pb-6">
          {menuItems.map((item, i) => (
            <div key={i}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => setActiveSubmenu((prev) => (prev === item.name ? null : item.name))}
                    className="w-full text-left py-2 hover:bg-hover rounded"
                  >
                    {item.name}
                  </button>
                  <div
                    className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ${
                      activeSubmenu === item.name ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-1">
                      {item.submenu.map((sub, j) => (
                        <a
                          key={j}
                          href={sub.href}
                          className="block px-4 py-1 text-sm hover:bg-hover rounded"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  className="block py-2 hover:bg-hover rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
