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
  ChevronDown
} from "lucide-react";

import SidebarItem from "./SidebarItem.jsx";

const Sidebar = () => {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  return (
    <aside className="h-screen w-55 bg-[#F8F9FA] border-r border-gray-200 flex flex-col">

      <div className="px-3 py-3 flex items-center gap-2  bg-transparent">
        <img src="/logo.png" alt="Vault Logo" className="w-10 h-10 rounded-lg object-cover" />

        <div className="flex flex-col leading-tight">
          <span className="text-[16px] font-semibold text-gray-900">Vault</span>
          <span className="text-[14px] text-gray-500">Anurag Yadav</span>
        </div>
          <ChevronDown size={14} />
      </div>

      <nav className="flex-1 px-2 py-3 flex flex-col gap-1.5">

        <SidebarItem label="Dashboard" icon={LayoutDashboard} active />
        <SidebarItem label="Nexus" icon={FolderTree} />
        <SidebarItem label="Intake" icon={Inbox} />

        <SidebarItem
          label="Services"
          icon={ClipboardList}
          open={servicesOpen}
          onClick={() => setServicesOpen(!servicesOpen)}
          children={[
            <SidebarItem key="1" label="Pre-active" icon={CircleDot} />,
            <SidebarItem key="2" label="Active" icon={CheckCircle} />,
            <SidebarItem key="3" label="Blocked" icon={Ban} />,
            <SidebarItem key="4" label="Closed" icon={Circle} />,
          ]}
        />

        <SidebarItem
          label="Invoices"
          icon={FileText}
          open={invoicesOpen}
          onClick={() => setInvoicesOpen(!invoicesOpen)}
          children={[
            <SidebarItem key="1" label="Proforma Invoices" icon={FileText} active />,
            <SidebarItem key="2" label="Final Invoices" icon={FileText} />,
          ]}
        />

      </nav>
    </aside>
  );
};

export default Sidebar;
