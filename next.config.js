/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@lens-protocol"],
  env: {
    NEXT_PUBLIC_ALCHEMY_KEY_MUMBAI: process.env.NEXT_PUBLIC_ALCHEMY_KEY_MUMBAI,
    NEXT_PUBLIC_API_CLIENTS: process.env.NEXT_PUBLIC_API_CLIENTS,
  },
};

module.exports = nextConfig;
