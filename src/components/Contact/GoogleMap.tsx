import React from "react";

const GoogleMap = () => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        title="MMC Location"
        className="w-full h-full"
        src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=20+Brideoak+Street,+Manchester"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMap;