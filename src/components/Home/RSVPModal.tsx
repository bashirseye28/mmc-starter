"use client";

import { useState } from "react";

const RSVPModal = ({ event, onClose }: { event: any; onClose: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">{event.name} RSVP</h3>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="w-full py-2 bg-gold text-black rounded-md mt-4">Submit RSVP</button>
        <button onClick={onClose} className="w-full py-2 mt-2 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RSVPModal;