import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["209.222.97.135", "localhost", "*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;