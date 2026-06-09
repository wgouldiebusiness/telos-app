import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',         value: 'on' },
  { key: 'X-Frame-Options',                value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',         value: 'nosniff' },
  { key: 'Referrer-Policy',                value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',             value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Cross-Origin-Opener-Policy',     value: 'same-origin-allow-popups' },
  { key: 'Cross-Origin-Resource-Policy',   value: 'cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://calendar.app.google",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://calendar.app.google https://calendar.google.com",
      "frame-ancestors 'none'",
      "worker-src 'self' blob:",
      "media-src 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  compress: true,

  async headers() {
    return [
      {
        // Main app — strict security
        source: '/((?!demos).*)',
        headers: securityHeaders,
      },
      {
        // Demo pages — permissive so Stitch HTML loads CDN scripts/styles
        // and can be iframed from our own site
        source: '/demos/(.*)',
        headers: [
          { key: 'X-Frame-Options',    value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          {
            key: 'Content-Security-Policy',
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
          },
        ],
      },
    ]
  },

  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
