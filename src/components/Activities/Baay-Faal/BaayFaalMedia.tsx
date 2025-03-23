"use client";

import MediaSection from "@/components/Activities/Common/MediaSection";

// ✅ Baay Faal Media Data (Same Videos as Kureel)
const videos = [
  {
    id: 1,
    title: "Baay Faal Gathering Highlights",
    videoUrl: "https://www.youtube.com/embed/Wvzos5rCbjw",
  },
  {
    id: 2,
    title: "Spiritual Songs & Teachings",
    videoUrl: "https://www.youtube.com/embed/uFNaCIBoNMA",
  },
];

const images = [
  {
    id: 1,
    title: "Baay Faal Community Event",
    images: [
      "/images/baayfaal1.jpg",
      "/images/baayfaal2.jpg",
      "/images/baayfaal3.jpg",
    ],
  },
  {
    id: 2,
    title: "Brotherhood in Action",
    images: [
      "/images/baayfaal4.jpg",
      "/images/baayfaal5.jpg",
      "/images/baayfaal6.jpg",
    ],
  },
];

const audios = [
  {
    id: 1,
    title: "Baay Faal Dhikrullah",
    audioUrl: "/audios/baayfaal-dhikr.mp3",
  },
  {
    id: 2,
    title: "Baay Faal Spiritual Chant",
    audioUrl: "/audios/baayfaal-chant.mp3",
  },
];

const BaayFaalMedia = () => {
  return (
    <section id="media" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6">
        {/* ✅ Section Title */}
        <h2 className="text-4xl font-bold text-primary font-heading text-center mb-10">
          <span className="text-gold">Baay Faal</span> Media Gallery
        </h2>

        {/* ✅ Media Gallery */}
        <MediaSection videos={videos} images={images} audios={audios} />
      </div>
    </section>
  );
};

export default BaayFaalMedia;