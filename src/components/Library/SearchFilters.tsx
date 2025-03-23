"use client";

import { FC } from "react";
import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  selectedLanguage: string;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onLanguageChange: (language: string) => void;
}

const fixedCategories = [
  "Quran",
  "Hadith",
  "Tafsiir",
  "Aqiidah (Creed)",
  "Fiqh",
  "Character (Al-Akhlaq)",
  "Dua",
  "Eulogy (Madh)",
  "Sufism",
  "Language",
  "Philosophy",
  "Epistemology",
  "General",
];

const fixedLanguages = [
  "Arabic",
  "Wolof",
  "English",
  "Chinese",
  "Spanish",
  "Italiano",
  "German",
  "French",
];

const SearchFilters: FC<SearchFiltersProps> = ({
  searchTerm,
  selectedCategory,
  selectedLanguage,
  onSearchChange,
  onCategoryChange,
  onLanguageChange,
}) => {
  return (
    <section className="container mx-auto px-6 py-6">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* 🔍 Search Input */}
        <div className="relative flex-1 w-full">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search books by title or author..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            aria-label="Search books"
          />
        </div>

        {/* 🗂 Category Filter */}
        <div className="relative w-full md:w-48">
          <Filter
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
            aria-label="Select category"
          >
            <option value="">All Categories</option>
            {fixedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* 🌐 Language Filter */}
        <div className="relative w-full md:w-48">
          <Filter
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
            aria-label="Select language"
          >
            <option value="">All Languages</option>
            {fixedLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;