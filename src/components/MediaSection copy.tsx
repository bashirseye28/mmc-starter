"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faImage, faMusic } from "@fortawesome/free-solid-svg-icons";

// ✅ TypeScript Interface for MediaSection Props
interface MediaSectionProps {
  title?: string;
  videos?: {
    id: number;
    title: string;
    videoUrl: string;
    thumbnail?: string; // ✅ Made optional
  }[];
  audios?: {
    id: number;
    title: string;
    audioUrl: string;
  }[];
  images?: {
    id: number;
    title: string;
    images: string[];
  }[];
}

// ✅ Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const MediaSection: React.FC<MediaSectionProps> = ({ title, videos, audios, images }) => {
  const [activeTab, setActiveTab] = useState<"videos" | "images" | "audios">("videos");

  // ✅ Slick Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section id="media" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 max-w-5xl text-center">

        {/* ✅ Section Title */}
        {title && (
          <motion.h2
            className="text-4xl font-bold text-primary mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {title}
          </motion.h2>
        )}

        {/* ✅ Tab Buttons */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <button
            className={`px-5 py-2 rounded-lg text-lg font-semibold transition ${
              activeTab === "videos" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            <FontAwesomeIcon icon={faVideo} className="mr-2" /> Videos
          </button>
          <button
            className={`px-5 py-2 rounded-lg text-lg font-semibold transition ${
              activeTab === "images" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("images")}
          >
            <FontAwesomeIcon icon={faImage} className="mr-2" /> Images
          </button>
          <button
            className={`px-5 py-2 rounded-lg text-lg font-semibold transition ${
              activeTab === "audios" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("audios")}
          >
            <FontAwesomeIcon icon={faMusic} className="mr-2" /> Audios
          </button>
        </motion.div>

        {/* ✅ Video Section */}
        {activeTab === "videos" && videos && videos.length > 0 && (
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
            {videos.map((video) => (
              <div key={video.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">{video.title}</h3>
                <div className="relative w-full h-64">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ✅ Image Gallery Section */}
        {activeTab === "images" && images && images.length > 0 && (
          <motion.div className="relative w-full max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
            <Slider {...sliderSettings}>
              {images.map((gallery) =>
                gallery.images.map((img, index) => (
                  <div key={`${gallery.id}-${index}`} className="p-2">
                    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
                      <Image src={img} alt={gallery.title} fill className="object-cover" />
                    </div>
                  </div>
                ))
              )}
            </Slider>
          </motion.div>
        )}

        {/* ✅ Audio Section */}
        {activeTab === "audios" && audios && audios.length > 0 && (
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
            {audios.map((audio) => (
              <div key={audio.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">{audio.title}</h3>
                <audio controls className="w-full">
                  <source src={audio.audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MediaSection;