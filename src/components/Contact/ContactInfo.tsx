"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";

const ContactInfo = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        
        {/* 📍 Address */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary text-3xl mb-3" />
          <h3 className="text-lg font-semibold">Our Address</h3>
          <p className="text-gray-600 mt-2">MMC Centre, Manchester, UK</p>
        </div>

        {/* 📧 Email */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faEnvelope} className="text-primary text-3xl mb-3" />
          <h3 className="text-lg font-semibold">Email Us</h3>
          <p className="text-gray-600 mt-2">info@mmc.org.uk</p>
        </div>

        {/* 📞 Phone */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faPhone} className="text-primary text-3xl mb-3" />
          <h3 className="text-lg font-semibold">Call Us</h3>
          <p className="text-gray-600 mt-2">+44 (0)123 456 7890</p>
        </div>

        {/* ⏰ Office Hours */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faClock} className="text-primary text-3xl mb-3" />
          <h3 className="text-lg font-semibold">Office Hours</h3>
          <p className="text-gray-600 mt-2">Mon – Fri: 9:00 AM – 6:00 PM</p>
        </div>

      </div>
    </section>
  );
};

export default ContactInfo;