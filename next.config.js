// next.config.js (MUST BE PRESENT IN THE ROOT)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile the specific Clerk package causing the Edge Function crash
  transpilePackages: ['@clerk/shared'],
};

module.exports = nextConfig;
