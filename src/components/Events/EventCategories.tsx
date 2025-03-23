"use client";

import { useState } from "react";

const categories = [
  { name: "All Events", key: "all" },
  { name: "Spiritual", key: "spiritual" },
  { name: "Community", key: "community" },
  { name: "Educational", key: "educational" },
  { name: "Social", key: "social" },
];

interface EventCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const EventCategories: React.FC<EventCategoriesProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onSelectCategory(cat.key)}
          className={`px-4 py-2 font-medium rounded-lg transition-all ${
            selectedCategory === cat.key ? "bg-gold text-black" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default EventCategories;