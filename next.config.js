/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
  },
  env:{
    API_KEY: process.env.API_KEY,
  }
}

module.exports = nextConfig
