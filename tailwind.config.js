/** @type {import('tailwindcss').Config} */

const { dark, light } = require('./src/styles')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
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
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
