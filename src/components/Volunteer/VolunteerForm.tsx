"use client";

import { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { CheckCircle, AlertCircle } from "lucide-react";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Save to Firestore first
      const docRef = await addDoc(collection(db, "volunteers"), {
        ...formData,
        submittedAt: new Date(),
        emailSent: false, // will be updated later
      });

      // Send confirmation email
      const res = await fetch("/api/volunteer-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
        }),
      });

      // Update emailSent if email succeeds
      if (res.ok) {
        await updateDoc(doc(db, "volunteers", docRef.id), {
          emailSent: true,
        });
      }

      // Success feedback
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        message: "",
      });
    } catch (err) {
      console.error("Form error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-4">Become a Volunteer</h2>

      {success && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-md mb-4">
          <CheckCircle size={20} />
          <p className="text-sm">Thank you for volunteering! We’ll contact you soon.</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-md mb-4">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />

      <select name="role" value={formData.role} onChange={handleChange} required className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white">
        <option value="">Select Role</option>
        <option value="Event Coordinator">Event Coordinator</option>
        <option value="Teaching Assistant">Teaching Assistant</option>
        <option value="Community Outreach">Community Outreach</option>
      </select>

      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Why do you want to volunteer?" rows={4} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />

      <button type="submit" disabled={loading} className={`w-full text-white font-semibold py-3 rounded-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"}`}>
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
};

export default VolunteerForm;