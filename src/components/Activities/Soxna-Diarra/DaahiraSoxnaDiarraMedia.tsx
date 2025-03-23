"use client";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Video } from "lucide-react";

// Event Highlights Data
const eventHighlights = [
  {
    id: 1,
    title: "Monthly Gathering Moments",
    images: [
      "/images/soxna1a.jpg",
      "/images/soxna1b.jpg",
      "/images/soxna1c.jpg",
    ],
  },
  {
    id: 2,
    title: "Spiritual Reflection Sessions",
    images: [
      "/images/soxna2a.jpg",
      "/images/soxna2b.jpg",
      "/images/soxna2c.jpg",
    ],
  },
];

// Video Highlights Data
const videos = [
  {
    id: 1,
    title: "Inspiring Moments",
    videoUrl: "https://www.youtube.com/embed/Wvzos5rCbjw",
  },
  {
    id: 2,
    title: "Charity Events",
    videoUrl: "https://www.youtube.com/embed/uFNaCIBoNMA",
  },
];

// Slider Settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};

const DaahiraSoxnaDiarraMedia = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* 🌟 Event Image Gallery */}
        <motion.h2
          className="text-3xl font-bold text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Event Highlights
        </motion.h2>
        <p className="text-lg text-gray-600 mt-2">
          Cherished moments from our monthly gatherings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {eventHighlights.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <Slider {...sliderSettings}>
                {event.images.map((img, index) => (
                  <div key={index} className="relative h-64">
                    <Image
                      src={img}
                      alt={`${event.title} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                ))}
              </Slider>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Camera size={24} /> {event.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🎬 Video Highlights Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-primary text-center mb-8 flex items-center justify-center gap-2">
            <Video size={32} className="text-gold" /> Inspiring Video Moments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="w-full h-64 md:h-80 rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DaahiraSoxnaDiarraMedia;