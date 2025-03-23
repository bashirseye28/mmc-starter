"use client";

import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subscribe: boolean;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    subscribe: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked! : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitted(false);
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Save to Firestore
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: new Date(),
      });

      // ✅ Send confirmation email
      await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          message: formData.message,
        }),
      });

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        subscribe: false,
      });
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative w-full py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/kst.webp')" }}
    >
      <div className="absolute inset-0 bg-primary bg-opacity-70" />
      <div className="relative z-10 max-w-2xl mx-auto p-6 bg-transparent border border-gold rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">Send Us a Message</h2>

        {isSubmitted ? (
          <p className="bg-green-100 text-green-800 p-4 rounded-md text-center font-medium">
            ✅ Thank you! Your message has been received.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gold">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-gold text-white rounded-md focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gold">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-gold text-white rounded-md focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-gold text-white rounded-md focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gold">Your Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-transparent border border-gold text-white rounded-md focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                className="h-5 w-5 text-gold border-gray-300 rounded bg-transparent"
              />
              <label className="ml-2 text-sm text-gold">Subscribe to our newsletter</label>
            </div>

            {error && <p className="text-red-500 font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black font-bold py-3 rounded-md hover:bg-opacity-90 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;