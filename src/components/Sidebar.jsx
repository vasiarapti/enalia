import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.webp";

const BASE = import.meta.env.BASE_URL;

const menuItems = [
  { name: "ΑΡΧΙΚΗ", href: `${BASE}` },
  {
    name: "ΟΙ ΘΕΡΑΠΕΥΤΕΣ", href: `${BASE}team`,
    submenu: [
      { name: "ΧΡΗΣΤΟΣ ΚΩΣΤΙΚΙΔΗΣ", href: `${BASE}team/kostikidis` },
      { name: "ΕΥΗ ΚΑΡΑΒΑΝΑ", href: `${BASE}team/karavana` },
    ],
  },
  { name: "Η ΠΡΟΣΕΓΓΙΣΗ", href: `${BASE}our-place` },
  {
    name: "ΟΙ ΥΠΗΡΕΣΙΕΣ", href: `${BASE}services`,
    submenu: [
      { name: "ΑΤΟΜΙΚΗ ΘΕΡΑΠΕΙΑ", href: `${BASE}services/individual-therapy` },
      { name: "ΘΕΡΑΠΕΙΑ ΖΕΥΓΟΥΣ", href: `${BASE}services/couple-therapy` },
      { name: "ΟΙΚΟΓΕΝΕΙΑΚΗ ΘΕΡΑΠΕΙΑ", href: `${BASE}services/family-therapy` },
      { name: "ΟΜΑΔΙΚΗ ΘΕΡΑΠΕΙΑ", href: `${BASE}services/group-therapy` },
      { name: "ΣΥΜΒΟΥΛΕΥΤΙΚΗ ΓΟΝΕΩΝ", href: `${BASE}services/parent-counselling` },
    ],
  },
  { name: "ONLINE ΨΥΧΟΘΕΡΑΠΕΙΑ", href: `${BASE}online` },
  { name: "ΒΙΩΜΑΤΙΚΕΣ ΔΡΑΣΕΙΣ", href: `${BASE}actions` },
  { name: "Ο ΧΩΡΟΣ", href: `${BASE}our-place` },
  { name: "ΕΠΙΚΟΙΝΩΝΙΑ", href: `${BASE}contact` },
];

export default function Sidebar() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = (itemName) => {
    setActiveSubmenu((prev) => (prev === itemName ? null : itemName));
  };

  // 🔒 Prevent scrolling when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Burger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-[60]"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X size={30} className="text-secondary" />
        ) : (
          <Menu size={30} className="text-primary" />
        )}
      </button>

      {/* Dark overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-primary text-secondary
          w-full md:w-72
          fixed top-0 left-0
          h-screen
          z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-auto md:sticky md:top-0
          overflow-y-auto
        `}
      >
        {/* Logo */}
        <div className="flex justify-center mb-2 mt-4">
          <img
            src={logo.src}
            alt="Logo"
            className="max-w-[200px] max-h-[200px] object-contain"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Ενάλια</h2>
          <h3 className="text-sm">Κέντρο Ψυχοθεραπείας</h3>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-base font-medium px-4 pb-6">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="w-full text-left py-2 hover:bg-hover rounded"
                  >
                    {item.name}
                  </button>
                  <div
                    className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ${
                      activeSubmenu === item.name
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-1">
                      {item.submenu.map((subitem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subitem.href}
                          className="block px-4 py-1 text-sm hover:bg-hover rounded"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.name}
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
