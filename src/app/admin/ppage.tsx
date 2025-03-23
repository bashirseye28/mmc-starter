"use client";

import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
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
      router.push("/admin/dashboard"); // Redirect after successful login
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
    <section className="flex justify-center items-center min-h-screen bg-lightBg">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full border">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Admin Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-primary">
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

          {/* Password Input */}
          <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-primary">
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black font-semibold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition flex items-center justify-center gap-2"
            aria-label="Login"
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
