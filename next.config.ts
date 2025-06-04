import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.BASE_PATH || "",
  basePath: process.env.BASE_PATH || "",
  trailingSlash: true,
};

export default nextConfig;
