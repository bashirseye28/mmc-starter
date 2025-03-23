"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhone, faClock, faDirections } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const ContactDetails = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Ensure the map is only loaded after hydration to prevent hydration errors
    setIsMapLoaded(true);
  }, []);

  return (
    <section className="bg-lightBg py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* ✅ Left: Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gold" /> Find Us
          </h2>

          <div className="space-y-4 text-gray-800">
            <p className="flex items-center gap-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gold" />
              <span>20 Brideoak Street, Manchester, UK</span>
            </p>
            <p className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-gold" />
              <Link href="mailto:info@manchestermuridcommunity.org" className="hover:text-primary transition">
                info@manchestermuridcommunity.org
              </Link>
            </p>
            <p className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhone} className="text-gold" />
              <Link href="tel:+447541475547" className="hover:text-primary transition">
                +44 7541 475 547
              </Link>
            </p>
            <p className="flex items-center gap-3">
              <FontAwesomeIcon icon={faClock} className="text-gold" />
              <span>Mon – Fri, 9:00 AM – 6:00 PM</span>
            </p>
          </div>
        </div>

        {/* ✅ Right: Google Maps Embed */}
        <div className="relative">
          {isMapLoaded ? (
            <iframe
              title="Google Maps - MMC Location"
              className="w-full h-64 md:h-80 rounded-lg shadow-md"
              src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=20+Brideoak+Street,+Manchester"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-64 md:h-80 flex items-center justify-center bg-gray-300 rounded-lg shadow-md">
              <p className="text-gray-600">Loading map...</p>
            </div>
          )}

          {/* ✅ Get Directions Button */}
          <Link
            href="https://www.google.com/maps?q=20+Brideoak+Street,+Manchester"
            target="_blank"
            className="mt-4 inline-flex items-center gap-2 bg-gold text-black font-semibold px-5 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition w-full text-center justify-center"
          >
            <FontAwesomeIcon icon={faDirections} /> Get Directions
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ContactDetails;