/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
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
