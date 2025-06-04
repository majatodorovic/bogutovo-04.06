/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    minimumCacheTTL: 60 * 60 * 24 * 90,
    domains: ["api.bogutovo.croonus.com", "api.staging.croonus.com"],
  },
  env: {
    API_URL: process.env.API_URL,
    GTM_ID: process.env.GTM_ID,
    PAGINATION_LIMIT: process.env.PAGINATION_LIMIT,
    SHOW_CHECKOUT_SHIPPING_FORM: process.env.SHOW_CHECKOUT_SHIPPING_FORM,
    TELEPHONE: process.env.TELEPHONE,
    SERVER_IP: process.env.SERVER_IP,
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap/:path*",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default nextConfig;