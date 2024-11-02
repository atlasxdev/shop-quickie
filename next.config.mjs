/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fakestoreapi.com",
      },
      {
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

export default nextConfig;
