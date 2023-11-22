/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "accommodation-properties.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "accommodation-properties.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname:
          "dev-accommodation-properties.s3-ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname:
          "dev-accommodation-properties.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
