/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com", // Firebase Storage
      "drive.google.com", // Google Drive direct links
      "lh3.googleusercontent.com", // Google Drive thumbnails
      "www.google.com", // External images
    ],
    unoptimized: true, // Allows local images in /public without Next.js optimization
  },
  reactStrictMode: true, // Ensures best practices in React
  experimental: {
    optimizeCss: true, // Improves CSS performance
    scrollRestoration: true, // Enhances page navigation
  },
};

export default nextConfig;