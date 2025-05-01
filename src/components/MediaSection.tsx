"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMusic,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "./AudioPlayer";

interface MediaSectionProps {
  videos: { id: number; title: string; videoUrl: string; thumbnail: string }[];
  audios: { id: number; title: string; audioUrl: string }[];
  images: { id: number; title: string; src: string }[];
}

const MediaSection: React.FC<MediaSectionProps> = ({ videos, audios, images }) => {
  const [activeTab, setActiveTab] = useState<"videos" | "audios" | "images">(
    "videos"
  );

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Kureel Qasida Media Library
      </h2>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 my-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "videos" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("videos")}
        >
          <FontAwesomeIcon icon={faVideo} className="mr-2" />
          Videos
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "audios" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("audios")}
        >
          <FontAwesomeIcon icon={faMusic} className="mr-2" />
          Audios
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "images" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("images")}
        >
          <FontAwesomeIcon icon={faImages} className="mr-2" />
          Images
        </button>
      </div>

      {/* Media Content */}
      <div className="mt-6">
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white shadow-md rounded-lg p-4">
                <iframe
                  src={video.videoUrl}
                  className="w-full h-64 rounded-md"
                  allowFullScreen
                />
                <h3 className="text-lg font-semibold mt-3">{video.title}</h3>
              </div>
            ))}
          </div>
        )}

        {activeTab === "audios" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {audios.map((audio) => (
              <AudioPlayer key={audio.id} audioUrl={audio.audioUrl} title={audio.title} />
            ))}
          </div>
        )}

        {activeTab === "images" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((image) => (
              <img
                key={image.id}
                src={image.src}
                alt={image.title}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaSection;