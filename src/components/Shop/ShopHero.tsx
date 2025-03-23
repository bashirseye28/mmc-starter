"use client";

import Hero from "@/components/Common/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const ShopHero = () => {
  return (
    <Hero
      title=" – Every Purchase Supports"
      highlight="Shop with Purpose"
      subtitle="Authentic Murid essentials, from Rosaries to Café Touba. Every order helps fund our community projects and the KST Islamic Centre."
      image="https://res.cloudinary.com/dnmoy5wua/image/upload/v1742058709/shop-hero_dmmqzf.webp" // ✅ Ensure the correct image path
      ctaText="Browse Products"
      ctaLink="#products"
      ctaPrimaryIcon={<FontAwesomeIcon icon={faShoppingBag} />}
    />
  );
};

export default ShopHero;