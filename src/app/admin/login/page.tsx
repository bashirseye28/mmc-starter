"use client";

import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Incorrect email or password.");
      } else if (err.code === "auth/user-not-found") {
        setError("No admin account found with this email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error("Login Error:", err);
    }

    setLoading(false);
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-lightBg text-darkText px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Admin Login</h2>

        {error && (
          <p className="text-red-600 text-center mb-4 text-sm font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-primary transition">
            <FaUser className="text-primary" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none ml-2 bg-transparent"
              aria-label="Admin Email"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-primary transition">
            <FaLock className="text-primary" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none ml-2 bg-transparent"
              aria-label="Admin Password"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/admin/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-lg shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gold text-black hover:bg-yellow-500"
            }`}
          >
            {loading ? "Logging in..." : (
              <>
                <FaSignInAlt />
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;