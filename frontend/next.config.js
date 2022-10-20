/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
});
