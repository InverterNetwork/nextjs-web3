const lightBase = {
  primary: '#2e5de8',
  'primary-focus': '#1949d0',
  'primary-content': '#f2f2f2',

  secondary: '#ffd139',
  'secondary-focus': '#ffbb1f',
  'secondary-content': '#1A171B',

  accent: '#c5bbab',
  'accent-focus': '#98886d',
  'accent-content': '#1A171B',

  neutral: '#b3b0ad',
  'neutral-focus': '#73716e',
  'neutral-content': '#f2f2f2',

  'base-100': '#f2f2f2',
  'base-200': '#f2f2f2',
  'base-300': '#F2EFE9',
  'base-content': '#1A171B',

  info: '#4996ee',
  success: '#48c75f',
  warning: '#e19741',
  error: '#b82332',

  '--rounded-box': '0.5rem',
  '--rounded-btn': '.25rem',
  '--rounded-badge': '0.8rem',

  '--animation-btn': '.25s',
  '--animation-input': '.2s',

  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
}

const darkBase = {
  primary: '#547EFF',
  'primary-focus': '#2E5CE8',
  'primary-content': '#F7F7FF',

  secondary: '#fae28d',
  'secondary-focus': '#ffdb5a',
  'secondary-content': '#1a171b',

  accent: '#fff9f0',
  'accent-focus': '#DDD6CB',
  'accent-content': '#1a171b',

  neutral: '#9d9a90',
  'neutral-focus': '#53514E',
  'neutral-content': '#F7F7FF',

  'base-100': '#1a171b',
  'base-200': '#1a171b',
  'base-300': '#0d0c0d',
  'base-content': '#F7F7FF',

  info: '#5FA7FB',
  success: '#53DD6C',
  warning: '#FFDB5A',
  error: '#D30C54',

  '--rounded-box': '0.5rem',
  '--rounded-btn': '.25rem',
  '--rounded-badge': '0.8rem',

  '--animation-btn': '.25s',
  '--animation-input': '.2s',

  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
}

export const initialTheme = 'light' as 'light' | 'dark'

const extend = (base: typeof darkBase | typeof lightBase) => ({
  ...base,
  '.card': {
    'background-color': base['base-100'],
    'border-color': `var(--fallback-bc,oklch(var(--bc)/0.2))`,
  } as any,
  '.skeleton': {
    'background-color': base['base-content'],
    'background-image': `linear-gradient(105deg,transparent 0%,transparent 40%,${base['base-300']} 50%,transparent 60%,transparent 100%)`,
  } as any,
})

export const light = extend(lightBase)
export const dark = extend(darkBase)
