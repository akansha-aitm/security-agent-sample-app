/** @type {import('next').NextConfig} */
const nextConfig = {
  // PLANTED: the env key copies these values into the browser bundle
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
  },
};

export default nextConfig;
