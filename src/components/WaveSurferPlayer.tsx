"use client";

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeUp, faBackward, faForward } from "@fortawesome/free-solid-svg-icons";

interface WaveSurferPlayerProps {
  audioUrl: string;
}

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = ({ audioUrl }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isReady, setIsReady] = useState(false); // ✅ Track when WaveSurfer is ready

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "#007676",
      cursorColor: "#FFD700",
      barWidth: 3,
      height: 60,
      autoCenter: true,
    });

    wavesurfer.current.load(audioUrl);

    wavesurfer.current.on("ready", () => {
      wavesurfer.current?.setVolume(volume);
      setIsReady(true); // ✅ Set ready state
    });

    return () => {
      /** ✅ Properly destroy WaveSurfer only if it's initialized */
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioUrl, volume]);

  const togglePlay = () => {
    if (!wavesurfer.current || !isReady) return;
    wavesurfer.current.playPause();
    setIsPlaying(!isPlaying);
  };

  const seekForward = () => {
    if (!wavesurfer.current || !isReady) return;
    const duration = wavesurfer.current.getDuration();
    wavesurfer.current.seekTo(Math.min(1, (wavesurfer.current.getCurrentTime() + 10) / duration));
  };

  const seekBackward = () => {
    if (!wavesurfer.current || !isReady) return;
    const duration = wavesurfer.current.getDuration();
    wavesurfer.current.seekTo(Math.max(0, (wavesurfer.current.getCurrentTime() - 10) / duration));
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer.current && isReady) {
      wavesurfer.current.setVolume(newVolume);
    }
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
      <div ref={waveformRef} className="w-full mb-3"></div>

      {/* ✅ Audio Controls */}
      <div className="flex items-center gap-4 mt-4">
        <button onClick={togglePlay} className="p-3 bg-primary rounded-full text-white" disabled={!isReady}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={seekBackward} className="p-3 bg-gray-200 rounded-full" disabled={!isReady}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button onClick={seekForward} className="p-3 bg-gray-200 rounded-full" disabled={!isReady}>
          <FontAwesomeIcon icon={faForward} />
        </button>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faVolumeUp} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={changeVolume}
            className="w-24"
            disabled={!isReady}
          />
        </div>
      </div>
    </div>
  );
};

export default WaveSurferPlayer;