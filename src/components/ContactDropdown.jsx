// src/components/ContactDropdown.jsx
import { useState } from "react";

export default function ContactDropdown({ label, options, name }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option.label);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`w-full bg-white p-2.5 border border-gray-300 rounded-lg text-gray-900 text-left ${
          !selected ? "text-gray-500" : "text-gray-900"
        }`}
        onClick={() => setOpen(!open)}
      >
        {selected || label}
        <span className={`ml-2 transform transition-transform ${open ? "rotate-180" : ""}`}>&#9660;</span>
      </button>

      <div
        className={`absolute z-10 w-full bg-white rounded-lg shadow mt-1 overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {options.map((option, i) => (
          <button
            key={i}
            type="button"
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Hidden input for form validation */}
      <input type="hidden" name={name || label} value={selected} required />
    </div>
  );
}
