// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "@/app/lib/firebase";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { FaLock, FaEnvelope } from "react-icons/fa";

// const AdminLoginPage = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Redirect if already logged in
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) router.push("/admin/dashboard");
//     });

//     return () => unsubscribe();
//   }, [router]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push("/admin/dashboard");
//     } catch (err: any) {
//       setError("Invalid email or password");
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-xl p-8 rounded-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-primary mb-6">
//           Admin Login
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
//             <div className="relative">
//               <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="email"
//                 required
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="admin@example.com"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
//             <div className="relative">
//               <FaLock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="password"
//                 required
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//               />
//             </div>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;