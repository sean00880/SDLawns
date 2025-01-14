import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Any other config options you need:
  reactStrictMode: true,

  // Ignore ESLint errors when building for production:
  eslint: {
    ignoreDuringBuilds: true,
  },

  env: {
    RESEND_API_KEY: process.env.NEXT_PUBLIC_RESEND_API_KEY,
  },

  // Optionally, you can ignore TypeScript errors as well, though it's not recommended:
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
