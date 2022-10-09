/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
module.exports = withPWA({
  eslint: {
    ignoreDuringBuilds: true,
  },
});
