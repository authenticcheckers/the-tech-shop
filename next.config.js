/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Next.js Asset Fix for Vercel 404/Missing CSS issues
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_URL : undefined,

  // Transpile all core Clerk packages to resolve import issues
  transpilePackages: ['@clerk/shared', '@clerk/clerk-react', '@clerk/nextjs'],

  // This is the core fix for the Edge compatibility using the proxy
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@clerk/shared'] = require.resolve('./proxy.ts');
    }
    return config;
  },
};

module.exports = nextConfig;
