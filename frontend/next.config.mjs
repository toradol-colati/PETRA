/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "../docs",
  basePath: "/repo-PETRA",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
