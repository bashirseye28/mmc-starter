"use client";

import { useState } from "react";
import ShopHero from "@/components/Shop/ShopHero";
import CategoryFilter from "@/components/Shop/CategoryFilter";
import ProductGrid from "@/components/Shop/ProductGrid";
import FeaturedProducts from "@/components/Shop/FeaturedProducts";
import ShopBenefits from "@/components/Shop/ShopBenefits";
import CartDrawer from "@/components/Cart/CartDrawer"; // ✅ RE-ADD THIS

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ restore

  const handleCategorySelect = (category: string) => setSelectedCategory(category);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <main className="bg-lightBg min-h-screen">
      <ShopHero />

      <section className="container mx-auto px-6 py-10">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </section>

      <section className="container mx-auto px-6 py-10" id="products">
        <ProductGrid category={selectedCategory} openCart={openCart} /> {/* ✅ add openCart */}
      </section>

      <section className="container mx-auto px-6 py-10">
        <FeaturedProducts openCart={openCart} /> {/* ✅ add openCart */}
      </section>

      <ShopBenefits />

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} /> {/* ✅ drawer */}
    </main>
  );
};

export default ShopPage;