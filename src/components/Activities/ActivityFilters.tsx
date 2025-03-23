"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface ActivityFiltersProps {
  onFilterChange: (category: string) => void;
}

const categories = ["All", "Spiritual", "Educational", "Community", "Charity", "Brotherhood"];

const ActivityFilters: React.FC<ActivityFiltersProps> = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => handleFilterChange(category)}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category
              ? "bg-primary text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default ActivityFilters;