"use client";

import MediaSection from "@/components/Activities/Common/MediaSection";

// ✅ Soxna Diarra Media Data
const videos = [
  {
    id: 1,
    title: "Soxna Diarra Gathering Highlights",
    videoUrl: "https://www.youtube.com/embed/Wvzos5rCbjw",
  },
  {
    id: 2,
    title: "Women’s Spiritual Empowerment",
    videoUrl: "https://www.youtube.com/embed/uFNaCIBoNMA",
  },
];

const images = [
  {
    id: 1,
    title: "Charity & Community Work",
    images: [
      "/images/soxna-charity1.jpg",
      "/images/soxna-charity2.jpg",
      "/images/soxna-charity3.jpg",
    ],
  },
  {
    id: 2,
    title: "Sisters’ Educational Session",
    images: [
      "/images/soxna-education1.jpg",
      "/images/soxna-education2.jpg",
      "/images/soxna-education3.jpg",
    ],
  },
];

const SoxnaDiarraMedia = () => {
  return (
    <section id="media" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-primary font-heading text-center mb-10">
          <span className="text-gold">Soxna Diarra</span> Media Gallery
        </h2>

        <MediaSection videos={videos} images={images} />
      </div>
    </section>
  );
};

export default SoxnaDiarraMedia;