import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure webpack for TensorFlow.js
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure fs module is not included in client-side bundles
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
