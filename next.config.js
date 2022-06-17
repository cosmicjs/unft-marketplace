/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
        formats: ['image/avif', 'image/webp'],
        domains: [ 'imgix.cosmicjs.com', 'cosmic-s3.imgix.net' ],
  },
  env: {
    cosmicWriteKey: process.env.COSMIC_WRITE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  }
}

module.exports = nextConfig
