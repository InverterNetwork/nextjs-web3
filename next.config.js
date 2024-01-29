/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { instrumentationHook: true },
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty')
    return config
  },
}

module.exports = nextConfig
