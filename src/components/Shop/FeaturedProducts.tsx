"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";

// ✅ Define Product Type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// ✅ Featured Products Component
const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ Query Firestore for featured products
        const q = query(collection(db, "products"), where("featured", "==", true));
        const querySnapshot = await getDocs(q);

        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productList);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
        setError("Failed to load featured products.");
      }

      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-12 container mx-auto">
      {/* ✅ Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faStar} className="text-gold text-2xl" />
          Featured Products
        </h2>
        <p className="text-gray-600 mt-2">Handpicked items just for you.</p>
      </div>

      {/* ✅ Loading / Error Handling */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-lg text-primary font-medium">Loading featured products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No featured products available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition">
              {/* ✅ Product Image */}
              <div className="relative w-full h-48">
                <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-md" />
              </div>

              {/* ✅ Product Info */}
              <h3 className="text-lg font-semibold text-primary mt-3">{product.name}</h3>
              <p className="text-gray-600 mt-1">£{product.price.toFixed(2)}</p>

              {/* ✅ Add to Cart Button */}
              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
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

export default FeaturedProducts;