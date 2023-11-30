export const { light, dark } = {
  light: {
    primary: { 50: 'white', 100: '#ECFDF5', 200: '#D1FAE5', 300: '#6EE7B7' },
    accent: { 300: '#86EFAC', 400: '#4ADE80', 500: '#ECFDF5' },
    border: '#A7C3B8',
  },

  dark: {
    primary: { 700: '#1F1F1F', 800: '#1D1C1D', 900: '#101110' },
    accent: { 300: '#4ADE80', 400: '#74D674', 900: '#5EEAD4' },
    border: '#74D674',
  },
}

export const bg = {
  dark: dark.primary[700],
  light: light.primary[50],
}

export const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

export const shadows = {
  accent: '0 0 10px 0 rgb(116, 214, 116, 0.7)',
  accentSide: '-4px 4px 6px -3px rgb(116, 214, 116, 0.7)',
  light: `-4px 4px 6px -3px rgba(0, 0, 0, 0.1)`,
  dark: `-4px 4px 6px -3px rgba(0, 0, 0, 0.5)`,
}
