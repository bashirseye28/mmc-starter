import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import TopHeader from "@/components/Navbar/TopHeader";
import { CartProvider } from "@/context/CartContext"; // ✅ Optimized Placement

// ✅ Optimized Font Loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  fallback: ["Arial", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Manchester Murid Community | MMC",
  description: "Stay connected with MMC: events, teachings, donations, and community support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" sizes="any" />
      </head>
      <body className={`${inter.className} bg-lightBg text-darkText`}>
        {/* ✅ Keep Header & Navbar outside CartProvider */}
        <TopHeader />
        <Navbar />

        {/* ✅ Wrap only `main` content in CartProvider */}
        <CartProvider>
          <main className="min-h-screen">{children}</main>
        </CartProvider>

        {/* ✅ Footer stays outside to avoid re-renders */}
        <Footer />
      </body>
    </html>
  );
}