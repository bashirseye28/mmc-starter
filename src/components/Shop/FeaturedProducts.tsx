"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/types"; // ✅ IMPORT Product type!

interface FeaturedProductsProps {
  openCart: () => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ openCart }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const q = query(collection(db, "products"), where("featured", "==", true));
        const querySnapshot = await getDocs(q);

        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productList);
      } catch (error) {
        console.error("❌ Failed to fetch featured products:", error);
        setError("Failed to load featured products.");
      }

      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-16 bg-white" id="featured-products">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faStar} className="text-gold text-2xl" />
            Featured Products
          </h2>
          <p className="text-gray-600 mt-2">Handpicked Murid essentials just for you.</p>
        </div>

        {loading ? (
          <p className="text-center text-primary font-medium text-lg">Loading featured products...</p>
        ) : error ? (
          <p className="text-center text-red-600 font-medium">{error}</p>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 flex flex-col items-center gap-2">
            <FontAwesomeIcon icon={faBoxOpen} className="text-3xl text-gray-300" />
            <p className="text-lg">No featured products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="relative bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                {/* 🟨 Badge */}
                <span className="absolute top-3 left-3 bg-gold text-black text-xs font-semibold px-2 py-1 rounded-full shadow">
                  ★ Featured
                </span>

                {/* 📷 Product Image */}
                <div className="relative w-full h-48 rounded overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name || "Product image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                    priority
                  />
                </div>

                {/* ℹ️ Product Info */}
                <h3 className="text-lg font-semibold text-primary mt-4">{product.name}</h3>
                <p className="text-gray-600 mt-1">
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(product.price)}
                </p>

                {/* 🛒 Add to Cart */}
                <button
                  onClick={() => {
                    addToCart({ ...product, quantity: 1 });
                    openCart();
                  }}
                  className="mt-4 w-full bg-gold text-black font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Add to Cart
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;