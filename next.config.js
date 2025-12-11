// next.config.js

const withTM = require('next-transpile-modules')([
  '@clerk/shared', 
  '@clerk/clerk-react',
  '@clerk/nextjs'
]);

const withCSS = require('@zeit/next-css') // Import the CSS helper

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any specific next.js configuration here
};

// Chain the configurations: first the transpiler, then the CSS handler
module.exports = withTM(withCSS(nextConfig));
