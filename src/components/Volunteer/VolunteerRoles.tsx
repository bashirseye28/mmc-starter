"use client";
// src/components/Volunteer/VolunteerRoles.tsx
import "@/styles/volunteer.css"
import { volunteerRoles } from "@/data/VolunteerData";

const VolunteerRoles = () => {
  return (
    <section className="py-16 bg-lightBg">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary">Volunteer Opportunities</h2>
        <p className="text-gray-600 mt-2">Get involved and make a difference in our community.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {volunteerRoles.map((role) => (
            <div key={role.id} className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
              <h3 className="text-xl font-bold text-primary">{role.title}</h3>
              <p className="text-gray-600 mt-2">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerRoles;