import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // restrict turbopack from searching the whole home directory
    // by explicitly setting the project directory
    root: __dirname,
  },
};

export default nextConfig;
