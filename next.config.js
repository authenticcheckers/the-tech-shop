/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile the specific Clerk package causing the Edge Function crash
 transpilePackages: ['@clerk/shared', '@clerk/clerk-react'],

  // This is the core fix for the Edge compatibility using the proxy
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // We instruct Next.js to use the proxy file only when compiling for the client/edge environment
      config.resolve.alias['@clerk/shared'] = require.resolve('./proxy.ts');
    }
    return config;
  },
};

module.exports = nextConfig;
