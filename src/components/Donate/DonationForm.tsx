"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export type DonorFormValues = {
  name: string;
  email: string;
  anonymous: boolean;
};

interface DonorFormProps {
  onSubmit: (data: DonorFormValues) => void;
  onBack: () => void;
  defaultValues?: Partial<DonorFormValues>;
}

const DonorForm: React.FC<DonorFormProps> = ({ onSubmit, onBack, defaultValues = {} }) => {
  const [name, setName] = useState(defaultValues.name || "");
  const [email, setEmail] = useState(defaultValues.email || "");
  const [anonymous, setAnonymous] = useState(defaultValues.anonymous || false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!anonymous && name.trim().length < 2) {
      return setError("Please enter your full name.");
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return setError("Please enter a valid email address.");
    }

    setError("");
    onSubmit({
      name: anonymous ? "Anonymous Donor" : name.trim(),
      email: email.trim(),
      anonymous,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border max-w-lg mx-auto mt-10">
      <h3 className="text-2xl font-heading font-bold text-primary mb-4 text-center">
        {anonymous ? "Receipt Details" : "Your"} <span className="text-gold">Information</span>
      </h3>

      {!anonymous && (
        <div className="relative mb-4">
          <FontAwesomeIcon icon={faUser} className="absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}

      <div className="relative mb-4">
        <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-3 text-gray-400" />
        <input
          type="email"
          placeholder={anonymous ? "Email for receipt (required)" : "Email Address (required)"}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => {
            setAnonymous(e.target.checked);
            if (e.target.checked) setName("");
          }}
          className="w-5 h-5 text-primary border-gray-300 rounded"
        />
        Donate anonymously (your name will not appear on the receipt)
      </label>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={onBack}
          className="w-full sm:w-1/2 border-2 border-primary text-primary font-medium py-3 rounded-md hover:bg-lightBg transition"
        >
          ← Go Back
        </button>

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-1/2 bg-primary text-white py-3 rounded-md font-semibold hover:bg-darkPrimary transition"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
};

export default DonorForm;