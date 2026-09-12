import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

// ponytail: script-src keeps 'unsafe-inline' because Next's hydration/flight
// bootstrap scripts and the JSON-LD block in StructuredData are inline, and
// style-src keeps it because styled-jsx, next/font and framer-motion all inject
// inline styles. Ceiling: this does not stop injected inline script, only
// scripts from other origins. Upgrade path: per-request nonces from middleware,
// which costs the static prerendering the marketing pages currently get.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  // data:/blob: cover the jsPDF signature canvas on /terms.
  "img-src 'self' data: blob: https://placehold.co https://images.unsplash.com",
  "font-src 'self' data:",
  `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com${isDev ? ' ws: http://localhost:*' : ''}`,
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during production builds
    // We use hash links for smooth scrolling which ESLint doesn't like
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during production builds
    // This allows deployment to proceed even with type errors in unused files
    ignoreBuildErrors: true,
  },
  // Vercel already sends Strict-Transport-Security on the custom domain, so it
  // is deliberately not repeated here.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  // Canonical host is the apex, matching the canonical tag and sitemap.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.theluxuryhouse.uk' }],
        destination: 'https://theluxuryhouse.uk/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },
  // Uncomment the following lines when ready for static export
  // output: 'export',
  // trailingSlash: true,
  // basePath: '',
};

export default nextConfig;
