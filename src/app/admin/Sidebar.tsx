"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaBars, FaTimes, FaHome, FaBox, FaUsers, 
  FaClipboardList, FaChartBar, FaCogs, FaSignOutAlt 
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Sidebar Links
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "Orders", path: "/admin/orders", icon: <FaClipboardList /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-50
        ${isOpen ? "w-64" : "w-20"} md:w-64 md:static`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`text-xl font-bold text-primary transition-all ${isOpen ? "block" : "hidden md:block"}`}>Admin</h2>
          <button onClick={toggleSidebar} className="md:hidden text-gray-700">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.path} className={`flex items-center gap-4 px-6 py-3 text-gray-700 hover:text-primary transition
              ${pathname === item.path ? "bg-gray-200 font-bold" : ""}`}>
              {item.icon}
              <span className={`${isOpen ? "block" : "hidden md:block"}`}>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 w-full">
          <button className="flex items-center gap-4 px-6 py-3 text-red-600 hover:text-red-800 transition w-full">
            <FaSignOutAlt />
            <span className={`${isOpen ? "block" : "hidden md:block"}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content (Push Content on Sidebar Open) */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"} md:ml-64 p-8`}>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin panel.</p>
      </div>
    </>
  );
};

export default Sidebar;