import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output for Docker / Hugging Face Spaces; native output for Vercel
  output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,
  devIndicators: false,
  reactStrictMode: false,
};

export default nextConfig;
