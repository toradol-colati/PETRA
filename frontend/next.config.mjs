/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Only apply GitHub Pages settings during production build
  ...(isProd && {
    distDir: "../docs",
    basePath: "/repo-PETRA",
  }),
};
export default nextConfig;
