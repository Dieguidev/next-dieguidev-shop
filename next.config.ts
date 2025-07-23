import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["src/*"],
    },
  },
};

export default nextConfig;
