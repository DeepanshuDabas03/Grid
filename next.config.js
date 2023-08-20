/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img6a.flixcart.com", "img5a.flixcart.com"],
  },
  async rewrites() {
    return [
      {
        source: "/product/:productName",
        destination: "/product",
      },
    ];
  },
};

module.exports = nextConfig;
