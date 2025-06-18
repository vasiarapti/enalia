import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

export default function Sidebar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (id) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  const menuItems = [
    {
      id: 'services',
      title: 'Υπηρεσίες',
      children: [
        { title: 'Ατομική Θεραπεία', href: '#' },
        { title: 'Θεραπεία Ζεύγους', href: '#' },
        { title: 'Οικογενειακή Θεραπεία', href: '#' },
        { title: 'Ομαδική Θεραπεία', href: '#' },
        { title: 'Συμβουλευτική Γονέων', href: '#' },
      ],
    },
    {
      id: 'therapists',
      title: 'Οι Θεραπευτές',
      children: [
        { title: 'Χρήστος Κωστικίδης', href: '#' },
        { title: 'Εύη Καραβάνα', href: '#' },
      ],
    },
    {
      id: 'other',
      title: 'Άλλες Υπηρεσίες',
      children: [
        { title: 'Online Ψυχοθεραπεία', href: '#' },
        { title: 'Βιωματικές Δράσεις', href: '#' },
      ],
    },
    {
      id: 'space',
      title: 'Ο Χώρος',
      children: [],
    },
    {
      id: 'contact',
      title: 'Επικοινωνία',
      children: [],
    },
  ];

  return (
    <>
      {/* Burger menu for mobile */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white dark:bg-neutral-900 shadow-md">
        <h1 className="text-lg font-bold">Ενάλια</h1>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-gray-700 dark:text-gray-200"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Full-screen overlay menu for mobile */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-white dark:bg-neutral-900 flex flex-col px-6 py-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Μενού</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          {menuItems.map((item) => (
            <div key={item.id} className="mb-4">
              <button
                onClick={() => toggleSubmenu(item.id)}
                className="w-full text-left font-semibold text-gray-800 dark:text-white"
              >
                {item.title}
              </button>
              {openSubmenu === item.id && item.children.length > 0 && (
                <ul className="mt-2 ml-4 space-y-1">
                  {item.children.map((child, index) => (
                    <li key={index}>
                      <a
                        href={child.href}
                        className="text-gray-600 dark:text-neutral-300 hover:underline"
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-white dark:bg-neutral-900 h-screen shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Μενού</h2>
        {menuItems.map((item) => (
          <div key={item.id} className="mb-4">
            <button
              onClick={() => toggleSubmenu(item.id)}
              className="w-full text-left font-semibold text-gray-800 dark:text-white"
            >
              {item.title}
            </button>
            {openSubmenu === item.id && item.children.length > 0 && (
              <ul className="mt-2 ml-4 space-y-1">
                {item.children.map((child, index) => (
                  <li key={index}>
                    <a
                      href={child.href}
                      className="text-gray-600 dark:text-neutral-300 hover:underline"
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </aside>
    </>
  );
}