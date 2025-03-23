"use client";

import Hero from "@/components/Common/Hero";
import { FaBookOpen, FaDownload } from "react-icons/fa";

const LibraryHero = () => {
  return (
    <Hero
      title="Digital Library"
      highlight="Explore Our"
      subtitle="Access, read, and download Murid books, Xassida, and Islamic teachings in PDF format."
      image="/images/library-hero.jpg"
      ctaText="Browse Library"
      ctaLink="/library#books"
      ctaPrimaryIcon={<FaBookOpen />}
      // ctaSecondaryText="Download Xassida"
      ctaSecondaryLink="/pdfs/xassida.pdf"
      ctaSecondaryIcon={<FaDownload />}
      quote="Knowledge is a light that illuminates the path to righteousness."
      quoteAuthor="Sheikh Ahmadou Bamba"
    />
  );
};

export default LibraryHero;