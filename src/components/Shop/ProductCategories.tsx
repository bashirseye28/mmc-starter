"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faLeaf,
  faBook,
  faPrayingHands,
  faBoxes,
  faHatCowboy,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  { name: "All", icon: faBoxes },
  { name: "Qasida", icon: faBook },
  { name: "Coffee", icon: faCoffee },
  { name: "Moringa", icon: faLeaf },
  { name: "Islamic Items", icon: faPrayingHands },
  { name: "Headwear", icon: faHatCowboy },
  { name: "Clothing", icon: faShirt },
];

interface ProductCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <section className="py-12 bg-gray-100" aria-labelledby="shop-categories">
      <div className="container mx-auto px-6 text-center">
        <h2 id="shop-categories" className="text-3xl font-bold text-primary mb-2">
          Shop by Category
        </h2>
        <p className="text-lg text-gray-600">
          Easily find what you're looking for.
        </p>

        <nav
          aria-label="Product Categories"
          className="mt-8 flex gap-4 overflow-x-auto justify-start sm:justify-center px-1 sm:flex-wrap scrollbar-hide"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              aria-label={`Filter by ${category.name}`}
              aria-pressed={selectedCategory === category.name}
              className={`flex items-center gap-2 px-6 py-3 min-w-[140px] whitespace-nowrap border rounded-lg shadow-md transition-all duration-200 font-medium focus:outline-none ${
                selectedCategory === category.name
                  ? "bg-primary text-white border-primary ring-2 ring-gold scale-[1.02]"
                  : "bg-white text-primary border-gray-300 hover:bg-gray-100"
              }`}
            >
              <FontAwesomeIcon icon={category.icon} className="text-lg" />
              <span className="hidden sm:inline">{category.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default ProductCategories;