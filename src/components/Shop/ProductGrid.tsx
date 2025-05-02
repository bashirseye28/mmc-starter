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
  openCart: () => void; // ✅ FIX: add openCart prop
}

const PAGE_SIZE = 8;

const ProductGrid: React.FC<ProductGridProps> = ({ category, openCart }) => {
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
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

        const filtered =
          category === "All"
            ? productList
            : productList.filter((p) => p.category === category);

        setAllProducts(filtered);
        setVisibleCount(PAGE_SIZE); // Reset on category change
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setError("Failed to load products.");
      }

      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  const visibleProducts = allProducts.slice(0, visibleCount);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(price);

  return (
    <section className="py-12 container mx-auto px-6" id="products">
      <h2 className="text-3xl font-bold text-primary text-center">Our Products</h2>
      <p className="text-gray-600 text-center mt-2">
        Explore our high-quality items available for purchase.
      </p>

      {loading ? (
        <div className="text-center py-10 text-primary font-medium">Loading products...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600 font-medium">{error}</div>
      ) : visibleProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-600">No products found in this category.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative w-full h-56">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="rounded-t-xl object-cover w-full h-full"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 rounded-t-xl">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-primary">{product.name}</h3>
                  <p className="text-gray-600 mt-1">{formatPrice(product.price)}</p>

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        addToCart({ ...product, quantity: 1 });
                        openCart(); // ✅ open drawer
                      }}
                      className="w-full bg-gold text-black font-semibold py-2 rounded-md flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < allProducts.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow hover:bg-opacity-90 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductGrid;