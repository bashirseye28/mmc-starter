"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCoffee, 
  faLeaf, 
  faBook, 
  faPrayingHands, 
  faDharmachakra,  // ✅ Best alternative for prayer beads
  faBoxes 
} from "@fortawesome/free-solid-svg-icons";

// ✅ Define Categories with Icons
const categories = [
  { name: "All", icon: faBoxes },
  { name: "Rosaries", icon: faDharmachakra }, // ✅ Corrected
  { name: "Xassida", icon: faBook },
  { name: "Cafe Touba", icon: faCoffee },
  { name: "Moringa", icon: faLeaf },
  { name: "Islamic Items", icon: faPrayingHands },
];

// ✅ Define Props
interface ProductCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        {/* ✅ Section Title */}
        <h2 className="text-3xl font-bold text-primary">Shop by Category</h2>
        <p className="text-lg text-gray-600 mt-2">Easily find what you're looking for.</p>

        {/* ✅ Categories Grid */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-6 py-3 flex items-center gap-2 border rounded-lg shadow-md transition font-medium
                ${
                  selectedCategory === category.name
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary border-gray-300 hover:bg-gray-200"
                }`}
            >
              <FontAwesomeIcon icon={category.icon} className="text-lg" />
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;