/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty')
    return config
  },
}

module.exports = nextConfig
