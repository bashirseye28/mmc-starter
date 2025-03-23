"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  // Format time to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Update progress bar and time
  const updateProgress = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setCurrentTime(formatTime(currentTime));

      if (progressRef.current) {
        progressRef.current.value = String((currentTime / audioRef.current.duration) * 100 || 0);
      }
    }
  };

  // Play/Pause Audio
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Seek Forward
  const seekForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, audioRef.current.duration);
    }
  };

  // Seek Backward
  const seekBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  // Change Volume
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
      setIsMuted(volumeValue === 0);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  // Handle Progress Bar Click
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  // Load Metadata
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        if (audioRef.current) {
          setDuration(formatTime(audioRef.current.duration));
        }
      });

      audioRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Audio Element (Hidden) */}
      <audio ref={audioRef} src={audioUrl} />

      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        <span className="text-gray-600 text-sm">{currentTime}</span>
        <input
          ref={progressRef}
          type="range"
          min="0"
          max="100"
          step="0.1"
          onChange={handleSeek}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <span className="text-gray-600 text-sm">{duration}</span>
      </div>

      {/* ✅ Audio Controls */}
      <div className="flex items-center gap-4 mt-4">
        <button onClick={togglePlay} className="p-3 bg-primary rounded-full text-white hover:bg-green-700 transition">
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={seekBackward} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button onClick={seekForward} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
          <FontAwesomeIcon icon={faForward} />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={changeVolume}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;