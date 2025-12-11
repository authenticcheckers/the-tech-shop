// next.config.js

const withTM = require('next-transpile-modules')([
  '@clerk/shared', 
  '@clerk/clerk-react',
  '@clerk/nextjs'
]);

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withTM(nextConfig);
