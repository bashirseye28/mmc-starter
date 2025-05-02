"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCoffee,
  faLeaf,
  faBook,
  faPrayingHands,
  faBoxes,
  faHatCowboy,
  faShirt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

// ✅ You can optionally move this to /utils/categories.ts
const categories = [
  { name: "All", icon: faBoxes },
  { name: "Qasida", icon: faBook },
  { name: "Coffee", icon: faCoffee },
  { name: "Moringa", icon: faLeaf },
  { name: "Islamic Items", icon: faPrayingHands },
  { name: "Headwear", icon: faHatCowboy },
  { name: "Clothing", icon: faShirt },
];

interface CategoriesFilterProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section
      className="py-12 bg-gray-100"
      aria-labelledby="category-heading"
    >
      <div className="container mx-auto px-6 text-center">
        {/* ✅ Accessible Heading */}
        <h2
          id="category-heading"
          className="text-3xl font-bold text-primary flex justify-center items-center gap-2"
        >
          <FontAwesomeIcon icon={faFilter} className="text-xl" />
          Browse Categories
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Select a category to explore our products.
        </p>

        {/* ✅ Mobile Dropdown */}
        <div className="relative mt-6 w-full max-w-xs mx-auto md:hidden">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            className="w-full bg-white text-primary border border-gray-300 rounded-lg py-3 px-4 flex justify-between items-center shadow-md hover:bg-gray-200 transition focus-visible:ring focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            {selectedCategory}
            <FontAwesomeIcon icon={faChevronDown} className="text-lg" />
          </button>
          {dropdownOpen && (
            <ul
              className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
              role="listbox"
            >
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => {
                      onCategorySelect(category.name);
                      setDropdownOpen(false);
                    }}
                    aria-selected={selectedCategory === category.name}
                    aria-pressed={selectedCategory === category.name}
                    className="w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-200 transition focus-visible:ring focus-visible:ring-gold focus-visible:ring-offset-2"
                  >
                    <FontAwesomeIcon icon={category.icon} />
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ Desktop Buttons */}
        <div className="hidden md:flex flex-wrap justify-center gap-4 mt-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              aria-pressed={selectedCategory === category.name}
              className={`px-6 py-3 flex items-center gap-2 border rounded-lg shadow-md transition font-medium focus-visible:ring focus-visible:ring-gold focus-visible:ring-offset-2 ${
                selectedCategory === category.name
                  ? "bg-primary text-white border-primary scale-105 shadow-lg"
                  : "bg-white text-primary border-gray-300 hover:bg-gray-200 hover:scale-105"
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

export default CategoriesFilter;