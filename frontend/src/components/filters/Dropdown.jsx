import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ label, children, selectedCount = 0 }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  return (
    <div
      ref={ref}
      className="relative text-gray-700 whitespace-nowrap inline-block"
      onClickCapture={(e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-2 py-1 text-xs rounded-md transition-colors ${
          selectedCount > 0
            ? "bg-blue-100 text-blue-700 border border-blue-300"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {label}
        {selectedCount > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedCount}
          </span>
        )}
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
