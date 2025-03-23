"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/types/types";

interface ProductGridProps {
  category: string;
  openCart: () => void; // ✅ Fix: Ensure openCart is passed as a prop
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, openCart }) => {
  const { addToCart } = useCart(); // ✅ Removed openCart from here
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(category === "All" ? productList : productList.filter((p) => p.category === category));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  return (
    <section className="py-12 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-primary text-center">Our Products</h2>
      <p className="text-gray-600 text-center mt-2">Explore our high-quality products available for purchase.</p>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-lg text-primary font-medium">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No products available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <div className="relative w-full h-48">
                <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-md" />
              </div>

              <h3 className="text-lg font-semibold text-primary mt-3">{product.name}</h3>
              <p className="text-gray-600 mt-1">£{product.price.toFixed(2)}</p>

              {/* ✅ Add to Cart Button (Automatically opens cart) */}
              <button
                onClick={() => {
                  addToCart({ ...product, quantity: 1 });
                  openCart(); // ✅ Open cart when adding a product
                }}
                className="mt-4 w-full bg-gold text-black py-2 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-yellow-500 transition"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;