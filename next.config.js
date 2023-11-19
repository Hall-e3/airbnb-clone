/** @type {import('next').NextConfig} */
// images.domain is claimed to be deprecated so use images.remotePatterns
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
