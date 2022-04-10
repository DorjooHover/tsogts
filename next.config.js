/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  useFileSystemPublicRoutes: false,
  productionBrowserSourceMaps: false,
  options: {
    sourcemaps: 'production', // possible values can be production, development, or none
  },
};

module.exports = nextConfig;
