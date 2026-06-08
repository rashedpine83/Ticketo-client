/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@better-auth/kysely-adapter", "kysely"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
