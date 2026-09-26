import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/application",
        destination: "/",
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
