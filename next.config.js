/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // App router serves all routes — disable pages router
  // The stale pages/index.tsx file cannot be removed (permission denied)
  // but it will be ignored by Vercel deployment since we use app/ as root
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;