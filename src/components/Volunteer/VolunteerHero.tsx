"use client";
import Image from "next/image";
import Link from "next/link";

const VolunteerHero = () => {
  return (
    <section className="relative w-full min-h-[400px] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}>
      
      {/* Overlay for Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl text-white px-6">
        <h1 className="text-4xl font-bold">
          Join Our Volunteer Team
        </h1>
        <p className="mt-4 text-lg">
          Make a difference in the community through faith, service, and education.
        </p>

        <div className="mt-6">
          <Link href="#volunteer-form">
            <button className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md hover:text-Primary hover:bg-[#d4af37] transition">
              Become a Volunteer
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VolunteerHero;