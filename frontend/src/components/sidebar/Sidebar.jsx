import { useState } from "react";
import {
  LayoutDashboard,
  FolderTree,
  Inbox,
  CircleDot,
  Circle,
  Ban,
  CheckCircle,
  FileText,
  ClipboardList,
  ChevronDown,
} from "lucide-react";

import SidebarItem from "./SidebarItem.jsx";

const Sidebar = () => {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  return (
    <aside className="h-screen w-60 bg-gray-100  flex flex-col">

      <div className="m-2 bg-white rounded-md border border-gray-200">
        <div className="px-1 py-2 flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Vault Logo"
            className="w-10 h-10 rounded-lg object-cover"
          />

          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-gray-900">
              Vault
            </span>
            <span className="text-[13px] text-gray-500">Anurag Yadav</span>
          </div>

          <ChevronDown size={14} className="ml-auto text-gray-500" />
        </div>
      </div>

      <nav className="flex-1 px-2 py-2 flex flex-col gap-1">
        <SidebarItem label="Dashboard" icon={LayoutDashboard} active />
        <SidebarItem label="Nexus" icon={FolderTree} />
        <SidebarItem label="Intake" icon={Inbox} />

        <SidebarItem
          label="Services"
          icon={ClipboardList}
          open={servicesOpen}
          onClick={() => setServicesOpen(!servicesOpen)}
          children={[
            { label: "Pre-active", icon: CircleDot },
            { label: "Active", icon: CheckCircle },
            { label: "Blocked", icon: Ban },
            { label: "Closed", icon: Circle },
          ]}
        />

        <SidebarItem
          label="Invoices"
          icon={FileText}
          open={invoicesOpen}
          onClick={() => setInvoicesOpen(!invoicesOpen)}
          children={[
            { label: "Proforma Invoices", icon: FileText, active: true },
            { label: "Final Invoices", icon: FileText },
          ]}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
