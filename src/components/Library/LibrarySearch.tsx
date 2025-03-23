"use client";

import React from "react";

interface LibrarySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const LibrarySearch: React.FC<LibrarySearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <input
        type="text"
        placeholder="🔍 Search books by title or author..."
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default LibrarySearch;