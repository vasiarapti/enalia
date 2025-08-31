import { useState, useRef, useEffect } from "react";

export default function ContactDropdown({ label, options, name }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);
  const [height, setHeight] = useState(0);

  const handleSelect = (option) => {
    setSelected(option.label);
    setOpen(false);
  };

  // Auto height based on content
  useEffect(() => {
    if (open && dropdownRef.current) {
      setHeight(dropdownRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.parentNode.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full md:w-full">
      <button
        type="button"
        className={`w-full bg-white p-2.5 border border-gray-300 rounded-lg flex justify-between items-center ${
          !selected ? "text-gray-500" : "text-gray-900"
        }`}
        onClick={() => setOpen(!open)}
      >
        {selected || label}
        <span className={`ml-2 transform transition-transform ${open ? "rotate-180" : ""}`}>&#9660;</span>
      </button>

      <div
        ref={dropdownRef}
        style={{ maxHeight: `${height}px` }}
        className="absolute z-10 w-full bg-white rounded-lg shadow mt-1 overflow-hidden transition-all duration-300"
      >
        {options.map((option, i) => (
          <button
            key={i}
            type="button"
            className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
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
