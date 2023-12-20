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
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development' 
            ? 'http://127.0.0.1:9010/:path*'
            : 'http://127.0.0.1:9010/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
