import type { Config as TailwindConfig } from 'tailwindcss'
import type { Config as DaisyUIConfig } from 'daisyui'
import { dark, light } from './src/styles'

type Config = TailwindConfig & {
  daisyui: DaisyUIConfig
}

const config: Config = {
  theme: {
    extend: {
      borderColor: {
        faint: 'var(--fallback-bc,oklch(var(--bc)/0.2))',
      },
    },
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  daisyui: {
    themes: [
      {
        light,
        dark,
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

export default config
