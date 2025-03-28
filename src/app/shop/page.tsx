"use client";

import { useState } from "react";

// Components
import ShopHero from "@/components/Shop/ShopHero";
import CategoryFilter from "@/components/Shop/CategoryFilter"; // ✅ Fixed: no space in filename
import ProductGrid from "@/components/Shop/ProductGrid";
import FeaturedProducts from "@/components/Shop/FeaturedProducts";
import ShopBenefits from "@/components/Shop/ShopBenefits";
import CartSidebar from "@/components/Cart/CartSidebar";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCategorySelect = (category: string) => setSelectedCategory(category);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <main className="bg-lightBg min-h-screen">
      {/* 🛍️ Hero */}
      <ShopHero />

      {/* 🗂️ Category Filter */}
      <section className="container mx-auto px-6 py-10">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </section>

      {/* 🛒 Products */}
      <section className="container mx-auto px-6 py-10" id="products">
        <ProductGrid category={selectedCategory} openCart={openCart} />
      </section>

      {/* 🌟 Featured */}
      <section className="container mx-auto px-6 py-10">
        <FeaturedProducts />
      </section>

      {/* 💡 Benefits */}
      <ShopBenefits />

      {/* 🧺 Cart Drawer */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </main>
  );
};

export default ShopPage;