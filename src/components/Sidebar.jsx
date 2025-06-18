import { useState } from "react";
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

  return (
    <>
      {/* Burger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={30} className="text-secondary" /> : <Menu size={30} className="text-primary" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen bg-primary text-secondary z-40 p-6 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-full md:w-72 md:translate-x-0 md:transform-none`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src={logo.src} alt="Logo" className="max-w-[200px] max-h-[200px] object-contain" />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Ενάλια</h2>
          <h3 className="text-sm">Κέντρο Ψυχοθεραπείας</h3>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-base font-medium">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="w-full text-left px-4 py-2 hover:bg-hover rounded"
                  >
                    {item.name}
                  </button>
                  <div
                    className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ${
                      activeSubmenu === item.name ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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
                  className="block px-4 py-2 hover:bg-hover rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}