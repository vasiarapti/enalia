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
    <div className="relative w-full md:w-full group">
      <button
        type="button"
        className={`w-full bg-white p-2.5 border border-gray-300 rounded-lg text-left flex justify-between items-center text-gray-900 group-hover:text-gray-700 focus:text-gray-700`}
        onClick={() => setOpen(!open)}
      >
        {selected || label}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`-mr-1 ml-2 size-5 transition-transform duration-300 ${
            open ? "rotate-180 text-gray-700" : "rotate-0 text-gray-400"
          } group-hover:text-gray-700 group-focus:text-gray-700`}
        >
          <path
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
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
