/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
        formats: ['image/avif', 'image/webp'],
        domains: [ 'imgix.cosmicjs.com', 'cosmic-s3.imgix.net' ],
  },
}

module.exports = nextConfig
