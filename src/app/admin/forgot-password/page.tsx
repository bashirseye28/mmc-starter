"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import Link from "next/link";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset link sent. Check your email.");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("❌ No account found with that email.");
      } else {
        setError("❌ Failed to send reset email. Try again.");
      }
      console.error("Reset Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-lightBg px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your admin email to receive a password reset link.
        </p>

        {message && (
          <p className="text-green-600 text-sm mb-4 text-center font-medium">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-primary transition">
            <FaEnvelope className="text-primary" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none ml-2 bg-transparent"
              aria-label="Email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="text-sm text-primary flex items-center justify-center gap-2 hover:underline"
          >
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;