/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    fallbackNodePolyfills: false,
  },
  typescript: {
    ignoreDuringBuilds: true, // to skip eslint on build, we have biome to take care of it
  },
  eslint: {
    ignoreDuringBuilds: true, // to skip eslint on build, we have biome to take care of it
  },
};

export default nextConfig;
