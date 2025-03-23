"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";

// Sample Product Interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Shop Page Component
const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from API (Replace with your actual API endpoint)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/shop/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle Search
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* ✅ Shop Title */}
        <h1 className="text-4xl font-bold text-primary text-center">Shop</h1>
        <p className="text-gray-600 text-center mt-2">
          Explore our exclusive collection of books, accessories, and more.
        </p>

        {/* ✅ Search Bar */}
        <div className="mt-6 flex justify-center">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-3 text-gray-500" />
          </div>
        </div>

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* ✅ Product Image */}
                <Link href={`/shop/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover cursor-pointer"
                  />
                </Link>

                {/* ✅ Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
                  <p className="text-gray-600">£{product.price.toFixed(2)}</p>
                  
                  {/* ✅ Add to Cart Button */}
                  <button className="w-full mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-darkPrimary transition flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopPage;