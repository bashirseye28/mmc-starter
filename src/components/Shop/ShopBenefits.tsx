"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHandHoldingHeart, 
  faTruckFast, 
  faLock, 
  faStar, 
  faLeaf 
} from "@fortawesome/free-solid-svg-icons";

const benefits = [
  {
    title: "Supports Community",
    description: "Every purchase funds our community projects and the KST Islamic Center.",
    icon: faHandHoldingHeart,
  },
  {
    title: "Fast & Reliable Shipping",
    description: "We ensure quick delivery with tracking for a seamless shopping experience.",
    icon: faTruckFast,
  },
  {
    title: "Secure Payments",
    description: "Your transactions are encrypted and secured for your peace of mind.",
    icon: faLock,
  },
  {
    title: "Authentic & Premium",
    description: "We source high-quality, authentic Murid products with great care.",
    icon: faStar,
  },
  {
    title: "Eco-Friendly",
    description: "Our products and packaging prioritize sustainability and environmental care.",
    icon: faLeaf,
  },
];

const ShopBenefits = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        {/* ✅ Section Title */}
        <h2 className="text-3xl font-bold text-primary">Why Shop With Us?</h2>
        <p className="text-lg text-gray-600 mt-2">
          Experience the best service, quality, and impact with every order.
        </p>

        {/* ✅ Benefits Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition hover:shadow-xl">
              <FontAwesomeIcon icon={benefit.icon} className="text-gold text-4xl mb-3" />
              <h3 className="text-lg font-semibold text-primary">{benefit.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopBenefits;