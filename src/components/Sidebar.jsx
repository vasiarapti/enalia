import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { Image } from 'astro:assets';
import logo from '../assets/logo.webp';



const menuItems = [
  { name: "ΑΡΧΙΚΗ", href: "/" },
  {
    name: "ΟΙ ΘΕΡΑΠΕΥΤΕΣ", href: "/the-team",
    submenu: [
      { name: "ΧΡΗΣΤΟΣ ΚΩΣΤΙΚΙΔΗΣ", href: "/the-team/kostikidis" },
      { name: "ΕΥΗ ΚΑΡΑΒΑΝΑ", href: "/the-team/karavana" },
    ],
  },
  { name: "Η ΠΡΟΣΕΓΓΙΣΗ", href: "/our-place" },
  {
    name: "ΟΙ ΥΠΗΡΕΣΙΕΣ", href: "/services",
    submenu: [
      { name: "ΑΤΟΜΙΚΗ ΘΕΡΑΠΕΙΑ", href: "/services/individual-therapy" },
      { name: "ΘΕΡΑΠΕΙΑ ΖΕΥΓΟΥΣ", href: "/services/couple-therapy" },
      { name: "ΟΙΚΟΓΕΝΕΙΑΚΗ ΘΕΡΑΠΕΙΑ", href: "/services/family-therapy" },
      { name: "ΟΜΑΔΙΚΗ ΘΕΡΑΠΕΙΑ", href: "/services/group-therapy" },
      { name: "ΣΥΜΒΟΥΛΕΥΤΙΚΗ ΓΟΝΕΩΝ", href: "/services/parent-counselling" },
    ],
  },
  { name: "ONLINE ΨΥΧΟΘΕΡΑΠΕΙΑ", href: "/online" },
  { name: "ΒΙΩΜΑΤΙΚΕΣ ΔΡΑΣΕΙΣ", href: "/actions" },
  { name: "Ο ΧΩΡΟΣ", href: "/our-place" },
  { name: "ΕΠΙΚΟΙΝΩΝΙΑ", href: "/contact" },
];

export default function Sidebar() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = (itemName) => {
    setActiveSubmenu((prev) => (prev === itemName ? null : itemName));
  };

  return (
    <>
      {/* Burger Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={30} className="text-secondary"/> : <Menu size={30} className="text-primary"/>}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-full md:w-72 bg-primary text-secondary z-40 p-6
          grid grid-rows-[max-content_max-content_1fr]
          transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src={logo}
            alt="Logo"
            className="max-w-[200px] max-h-[200px] object-contain"
          />
        </div>

        {/* Text */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Ενάλια</h2>
          <h3 className="text-sm">Κέντρο Ψυχοθεραπείας</h3>
        </div>

        {/* Navigation */}
        <nav className="self-center space-y-2 overflow-y-auto text-base font-medium">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => handleClick(item.name)}
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
                      {item.submenu.map((subitem, i) => (
                        <a
                          key={i}
                          href={subitem.href}
                          className="block px-4 py-1 text-sm hover:bg-hover rounded"
                          onClick={() => setIsOpen(false)} // closes sidebar on mobile
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
                  onClick={() => setIsOpen(false)} // closes sidebar on mobile
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
