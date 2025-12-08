import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative text-gray-700 bg-gray-100 whitespace-nowrap inline-block"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1 text-xs"
      >
        {label}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 bg-white w-max min-w-full border border-gray-200 rounded-lg shadow-lg">
          <div className="flex flex-col py-1">
            {Array.isArray(children)
              ? children.map((child, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 text-sm hover:bg-gray-100 cursor-pointer rounded"
                  >
                    {child}
                  </div>
                ))
              : children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
