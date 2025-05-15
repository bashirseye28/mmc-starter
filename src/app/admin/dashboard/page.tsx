"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/lib/firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import {
  FaBars,
  FaHome,
  FaBook,
  FaBox,
  FaCalendarAlt,
  FaSignOutAlt,
  FaShoppingCart,
  FaChartLine,
  FaHandsHelping,
  FaEnvelopeOpenText,
  FaDonate,
} from "react-icons/fa";

// ✅ Replace with your actual Admin UID
const ADMIN_UID = "RBLgsx5ef6Uebrl4k1So3i2uQKX2";

interface DashboardStats {
  orders: number;
  products: number;
  libraryBooks: number;
  events: number;
  volunteers: number;
  messages: number;
  donations: number;
}

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    orders: 0,
    products: 0,
    libraryBooks: 0,
    events: 0,
    volunteers: 0,
    messages: 0,
    donations: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
      } else if (currentUser.uid !== ADMIN_UID) {
        alert("Access denied. Not an admin.");
        router.push("/");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const [
          ordersSnap,
          productsSnap,
          booksSnap,
          eventsSnap,
          volunteersSnap,
          messagesSnap,
          donationsSnap,
        ] = await Promise.all([
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "products")),
          getDocs(collection(db, "books")),
          getDocs(collection(db, "events")),
          getDocs(collection(db, "volunteers")),
          getDocs(collection(db, "messages")),
          getDocs(collection(db, "donations")), // ✅ NEW
        ]);

        setStats({
          orders: ordersSnap.size,
          products: productsSnap.size,
          libraryBooks: booksSnap.size,
          events: eventsSnap.size,
          volunteers: volunteersSnap.size,
          messages: messagesSnap.size,
          donations: donationsSnap.size, // ✅ NEW
        });
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    };

    fetchStats();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-primary font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-lightBg">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg md:h-full md:relative z-50 ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 fixed md:static`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`text-xl font-bold text-primary ${isSidebarOpen ? "block" : "hidden"}`}>
            Admin Panel
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600 hover:text-primary md:hidden"
          >
            <FaBars size={22} />
          </button>
        </div>

        <nav className="mt-6 space-y-3">
          <SidebarLink href="/admin/dashboard" icon={<FaHome />} label="Dashboard" isOpen={isSidebarOpen} />
          <SidebarLink href="/admin/library" icon={<FaBook />} label="Library" isOpen={isSidebarOpen} />
          <SidebarLink href="/admin/shop" icon={<FaBox />} label="Shop" isOpen={isSidebarOpen} />
          <SidebarLink href="/admin/events" icon={<FaCalendarAlt />} label="Events" isOpen={isSidebarOpen} />
          <SidebarLink href="/admin/orders" icon={<FaShoppingCart />} label="Orders" isOpen={isSidebarOpen} />
          <SidebarLink href="/admin/volunteers" icon={<FaHandsHelping />} label="Volunteers" isOpen={isSidebarOpen} />
          <SidebarLink href="/admin/messages" icon={<FaEnvelopeOpenText />} label="Messages" isOpen={isSidebarOpen} />
          <SidebarLink href="/admin/donations" icon={<FaDonate />} label="Donations" isOpen={isSidebarOpen} />

          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-red-600 transition w-full"
          >
            <FaSignOutAlt size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-6 mt-20 md:mt-0 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <nav className="mb-6 text-gray-600 text-sm">
          <Link href="/admin/dashboard" className="hover:text-primary">
            Dashboard
          </Link>{" "}
          / <span className="text-gray-400">Home</span>
        </nav>

        <h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
          <FaChartLine /> Welcome, <span>{user?.displayName || user?.email}</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard icon={<FaShoppingCart />} label="Orders" value={stats.orders} color="bg-primary" />
          <StatCard icon={<FaBox />} label="Products" value={stats.products} color="bg-gold" />
          <StatCard icon={<FaBook />} label="Library Books" value={stats.libraryBooks} color="bg-green-600" />
          <StatCard icon={<FaCalendarAlt />} label="Events" value={stats.events} color="bg-blue-600" />
          <StatCard icon={<FaHandsHelping />} label="Volunteers" value={stats.volunteers} color="bg-purple-600" />
          <StatCard icon={<FaEnvelopeOpenText />} label="Messages" value={stats.messages} color="bg-red-600" />
          <StatCard icon={<FaDonate />} label="Donations" value={stats.donations} color="bg-teal-600" />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

// ✅ SidebarLink component
const SidebarLink = ({
  href,
  icon,
  label,
  isOpen,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}) => (
  <Link
    href={href}
    className="group flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-primary transition"
  >
    {icon}
    {isOpen && <span>{label}</span>}
  </Link>
);

// ✅ StatCard component
const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) => (
  <div
    className={`rounded-xl shadow-md p-5 text-white flex flex-col sm:flex-row items-center sm:justify-between gap-3 ${color}`}
  >
    <div className="text-4xl">{icon}</div>
    <div className="text-center sm:text-right w-full">
      <p className="text-xl font-bold truncate">{value}</p>
      <p className="text-sm truncate">{label}</p>
    </div>
  </div>
);