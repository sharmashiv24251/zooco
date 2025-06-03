import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig:NextConfig = withPWA({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/src/app/manifest.ts',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
       {
           source: '/api/:path*', // Match all routes under /api
           headers: [
             {
               key: 'Cache-Control',
               value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
             },
             { key: 'Pragma', value: 'no-cache' },
             { key: 'Expires', value: '0' },
           ],
         },
    ]
  },
}
);

export default nextConfig;
