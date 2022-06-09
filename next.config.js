/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
        formats: ['image/avif', 'image/webp'],
        domains: [ 'imgix.cosmicjs.com' ],
  },
  future: {
    webpack5: true
  }
}

module.exports = nextConfig
