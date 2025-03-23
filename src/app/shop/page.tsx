"use client";

import { useState } from "react";
import ShopHero from "@/components/Shop/ShopHero";
import CategoriesFilter from "@/components/Shop/ CategoryFilter"; // ✅ Fixed Import
import ProductGrid from "@/components/Shop/ProductGrid";
import FeaturedProducts from "@/components/Shop/FeaturedProducts"; // ✅ Import Featured Products
import ShopBenefits from "@/components/Shop/ShopBenefits"; // ✅ Import Shop Benefits
import CartSidebar from "@/components/Cart/CartSidebar"; // ✅ Import Cart Sidebar

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ Cart Sidebar State

  // ✅ Function to handle category change
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // ✅ Function to toggle cart sidebar
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <main className="min-h-screen">
      {/* ✅ Hero Section */}
      <ShopHero />

      {/* ✅ Category Filter */}
      <section className="container mx-auto px-6 py-8">
        <CategoriesFilter selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
      </section>

      {/* ✅ Product Grid */}
      <section className="container mx-auto px-6 py-8">
        <ProductGrid category={selectedCategory} openCart={openCart} /> {/* ✅ Pass openCart function */}
      </section>

      {/* ✅ Featured Products - Showcase Best Sellers */}
      <section className="container mx-auto px-6 py-8">
        <FeaturedProducts />
      </section>

      {/* ✅ Shop Benefits Section */}
      <ShopBenefits />

      {/* ✅ Cart Sidebar - Always present but controlled by state */}
      <CartSidebar/>
    </main>
  );
};

export default ShopPage;