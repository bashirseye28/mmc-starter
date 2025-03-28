"use client";

import Hero from "@/components/Common/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const ShopHero = () => {
  return (
    <Hero
      title="Welcome to the MMC Shop"
      highlight="Shop with Purpose"
      subtitle="Explore authentic Murid essentials — from handcrafted Rosaries to Café Touba. Every purchase supports our community and the KST Islamic Centre."
      image="https://res.cloudinary.com/dnmoy5wua/image/upload/v1742058709/shop-hero_dmmqzf.webp"
      ctaText="Browse Products"
      ctaLink="#products"
      ctaPrimaryIcon={<FontAwesomeIcon icon={faShoppingBag} />}
    />
  );
};

export default ShopHero;