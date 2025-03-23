"use client";

import MediaSection from "@/components/Activities/Common/MediaSection";

// ✅ Daahira Media Data
const videos = [
  {
    id: 1,
    title: "Weekly Daahira Highlights",
    videoUrl: "https://www.youtube.com/embed/Wvzos5rCbjw",
  },
  {
    id: 2,
    title: "Dhikr & Quran Recitations",
    videoUrl: "https://www.youtube.com/embed/uFNaCIBoNMA",
  },
];

const images = [
  {
    id: 1,
    title: "Daahira Community Gatherings",
    images: [
      "/images/daahira1.jpg",
      "/images/daahira2.jpg",
      "/images/daahira3.jpg",
    ],
  },
  {
    id: 2,
    title: "Spiritual Reflection Moments",
    images: [
      "/images/daahira4.jpg",
      "/images/daahira5.jpg",
      "/images/daahira6.jpg",
    ],
  },
];

const audios = [
  {
    id: 1,
    title: "Daahira Dhikrullah",
    audioUrl: "/audios/daahira-dhikr.mp3",
  },
  {
    id: 2,
    title: "Daahira Spiritual Chant",
    audioUrl: "/audios/daahira-chant.mp3",
  },
];

const DaahiraMedia = () => {
  return (
    <section id="media" className="py-18 bg-lightBg">
      <div className="container mx-auto px-6">
        {/* ✅ Section Title */}
        <h2 className="text-4xl font-bold text-primary font-heading text-center mb-10">
          <span className="text-gold">Daahira</span> Media Gallery
        </h2>

        {/* ✅ Media Gallery */}
        <MediaSection videos={videos} images={images} audios={audios} />
      </div>
    </section>
  );
};

export default DaahiraMedia;