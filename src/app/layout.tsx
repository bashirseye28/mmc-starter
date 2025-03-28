import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import TopHeader from "@/components/Navbar/TopHeader";
import { CartProvider } from "@/context/CartContext";
import Head from "next/head";

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
    <html lang="en" className={inter.className}>
      <Head>
        <link rel="icon" href="/images/logo.png" sizes="any" />
      </Head>
      <body className="bg-lightBg text-darkText">
        <TopHeader />
        <Navbar />
        <CartProvider>
          <main className="min-h-screen">{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}