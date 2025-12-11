/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix the Clerk Edge compatibility issue by explicitly transpiling the conflicting package.
  transpilePackages: ['@clerk/shared'],
};

module.exports = nextConfig;
