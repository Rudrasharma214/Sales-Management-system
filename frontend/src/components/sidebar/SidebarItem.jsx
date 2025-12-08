import { ChevronDown } from "lucide-react";

const SidebarItem = ({ label, icon: Icon, active, children, open, onClick }) => {
  return (
    <div className="flex flex-col text-[13px]">
      {/* parent */}
      <div
        onClick={onClick}
        className={`relative flex items-center justify-between px-2.5 py-2 rounded-md cursor-pointer
        ${active ? "bg-white text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}
      >
        {active && (
          <span className="absolute left-0 top-0 h-full w-0.5 bg-blue-600 rounded-r-md"></span>
        )}

        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-500" />}
          <span>{label}</span>
        </div>

        {children && (
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {children && open && (
        <div className="flex flex-col mt-1 bg-white rounded-md border border-gray-200 p-1.5 gap-0.5">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
