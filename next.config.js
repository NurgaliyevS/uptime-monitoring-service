/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require('next-plausible');

const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
