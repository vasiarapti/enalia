import { useState, useRef, useEffect } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4 max-w-6xl mx-auto p-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentRef = useRef(null);

        useEffect(() => {
          if (contentRef.current && isOpen) {
            contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
          } else if (contentRef.current) {
            contentRef.current.style.maxHeight = '0px';
          }
        }, [isOpen]);

        return (
          <div
            key={index}
            className={`accordion-item [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] border-2 ${
              isOpen ? 'border-primary-600' : 'border-transparent'
            } hover:border-secondary-600 rounded-lg transition-all`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="accordion-button cursor-pointer w-full text-base font-medium text-left p-5 text-slate-900 flex items-center"
            >
              <span className="mr-4">{item.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`arrow w-[14px] h-[14px] fill-current ml-auto shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                />
              </svg>
            </button>
            <div
              ref={contentRef}
              className="accordion-content overflow-hidden max-h-0 transition-all duration-300 ease-in-out"
            >
              <div className="pb-5 px-5 text-sm text-slate-600 leading-relaxed">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
