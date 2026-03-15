import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deploying to https://aditigode.github.io/REPO_NAME/ (not the root user site),
  // uncomment and set your repo name:
  //basePath: '/my_portfolio',
  // assetPrefix: '/my_portfolio/',
};

export default nextConfig;
