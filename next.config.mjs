/** @type {import('next').NextConfig} */
const nextConfig = {
	ignoreDuringBuilds: true, // to skip eslint on build, we have biome to take care of it
};

export default nextConfig;
