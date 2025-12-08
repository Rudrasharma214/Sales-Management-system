import { ChevronDown } from "lucide-react";

const SidebarItem = ({
  label,
  icon: Icon,
  active,
  children,
  open,
  onClick,
}) => {
  const hasChildren = Array.isArray(children);

  return (
    <div className="flex flex-col text-[13px]">
      <div
        onClick={onClick}
        className={`relative flex items-center justify-between px-2.5 py-2 rounded-md cursor-pointer
          ${open ? "bg-white shadow-sm" : "hover:bg-gray-100"}
          ${active ? "text-gray-900 font-semibold" : "text-gray-700"}`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-500" />}
          <span>{label}</span>
        </div>

        {hasChildren && (
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {hasChildren && open && (
        <div className="flex flex-col mt-1 bg-white rounded-md py-1">
          {children.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <item.icon size={14} className="text-gray-400" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
