"use client";

import ProductCard from "./ProductCard";

const featuredProducts = [
  {
    id: 1,
    name: "Rosary (Kurus)",
    price: "£15",
    image: "/images/rosary.jpg",
  },
  {
    id: 2,
    name: "Handwritten Xassida",
    price: "£25",
    image: "/images/xassida.jpg",
  },
  {
    id: 3,
    name: "Cafe Touba",
    price: "£12",
    image: "/images/cafetouba.jpg",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-heading font-bold text-primary text-center mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;