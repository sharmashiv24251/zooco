import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig:NextConfig = withPWA({

});

export default nextConfig;
