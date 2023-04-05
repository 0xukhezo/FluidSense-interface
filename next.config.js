/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@lens-protocol"],
  env: {
    NEXT_PUBLIC_ALCHEMY_KEY_MUMBAI: process.env.NEXT_PUBLIC_ALCHEMY_KEY_MUMBAI,
  },
};

module.exports = nextConfig;
