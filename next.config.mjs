/** @type {import('next').NextConfig} */

export default {
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty')
    return config
  },
}
