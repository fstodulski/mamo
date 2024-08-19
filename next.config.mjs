import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreDuringBuilds: true, // to skip eslint on build, we have biome to take care of it
};

const withMillionLint = MillionLint.next({
  rsc: true,
  optimizeDOM: true,
})(nextConfig);

// Set MillionLint only on dev
const config =
  process.env.NODE_ENV !== "production" ? withMillionLint : nextConfig;

export default config;
