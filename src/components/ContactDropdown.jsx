// src/components/ContactDropdown.jsx
import { useState } from "react";

export default function ContactDropdown({ label, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative py-2">
      <button
        type="button"
        className="w-full bg-white p-2.5 border border-gray-300 rounded-lg text-gray-900 "
        onClick={() => setOpen(!open)}
      >
        {label}
        <span className={`ml-2 transform transition-transform ${open ? "rotate-180" : ""}`}>&#9660;</span>
      </button>
      <div
        className={`absolute z-10 w-full bg-white rounded-lg shadow mt-1 overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {options.map((option, i) => (
          <a
            key={i}
            href={option.href || "#"}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
}
