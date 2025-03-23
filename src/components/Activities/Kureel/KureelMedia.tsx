"use client";

import MediaSection from "@/components/Activities/Common/MediaSection";

// ✅ Kureel Media Data
const videos = [
  {
    id: 1,
    title: "Kureel Gathering Highlights",
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
    title: "Kureel Community Event",
    images: [
      "/images/kureel1.jpg",
      "/images/kureel2.jpg",
      "/images/kureel3.jpg",
    ],
  },
  {
    id: 2,
    title: "Group Dhikr",
    images: [
      "/images/kureel4.jpg",
      "/images/kureel5.jpg",
      "/images/kureel6.jpg",
    ],
  },
];

const audios = [
  {
    id: 1,
    title: "Kureel Dhikrullah",
    audioUrl: "/audios/kureel-dhikr.mp3",
  },
  {
    id: 2,
    title: "Kureel Spiritual Chant",
    audioUrl: "/audios/kureel-chant.mp3",
  },
];

const KureelMedia = () => {
  return (
    <section id="media" className="py-18 bg-lightBg">
      <div className="container mx-auto px-6">
        {/* ✅ Section Title */}
        <h2 className="text-4xl font-bold text-primary font-heading text-center mb-10">
          <span className="text-gold">Kureel</span> Media Gallery
        </h2>
        {/* ✅ Media Gallery */}
        <MediaSection videos={videos} images={images} audios={audios} />
      </div>
    </section>
  );
};

export default KureelMedia;