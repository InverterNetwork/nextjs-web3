/** @type {import('tailwindcss').Config} */

const { dark, light } = require('./styles')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          ...light,
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          ...dark,
        },
      },
    ],
  },
}
