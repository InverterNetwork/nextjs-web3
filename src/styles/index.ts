const base = {
  primary: '#389fff',
  'primary-focus': '#0e64aa',
  'primary-content': '#ffffff',

  secondary: '#24c285',
  'secondary-focus': '#1c825b',
  'secondary-content': '#ffffff',

  accent: '#FF7F50',
  'accent-focus': '#E65E2D',
  'accent-content': '#ffffff',

  neutral: '#797A85',
  'neutral-focus': '#383C46',
  'neutral-content': '#ffffff',

  info: '#2F67A7',
  success: '#22C340',
  warning: '#AF7431',
  error: '#BD2837',

  '--rounded-box': '6px',
  '--rounded-btn': '4px',
  '--rounded-badge': '12px',

  '--animation-btn': '.25s',
  '--animation-input': '.2s',

  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
}

const lightBase = {
  'base-100': '#ffffff',
  'base-200': '#fffbf4',
  'base-300': '#fef6e9',
  'base-content': '#1A171B',
  ...base,
}

const darkBase = {
  'base-300': '#1C202B',
  'base-200': '#151720',
  'base-100': '#050609',
  'base-content': '#F2EEEE',
  ...base,
}

export const borderColor = 'var(--fallback-bc,oklch(var(--bc)/0.2))'
export const borderStyle = '0.0625rem solid'
export const border = `${borderStyle} ${borderColor}`

export const initialTheme = 'dark' as 'light' | 'dark'

const extend = (base: typeof darkBase | typeof lightBase) => ({
  ...base,
  ...({
    '.collapse:not(.collapse-close) > :where(input[name="accordion"][type="radio"]:checked ~ .collapse-content)':
      {
        'border-top': border,
        'padding-top': '1rem',
        'padding-bottom': '1rem',
      },
    '.badge': {
      border,
    },
    '.card': {
      'background-color': base['base-200'],
      border,
    },
    '.input': {
      'background-color': base['base-200'],
    },
    '.skeleton': {
      border,
    },
    '.btn': {
      '&:not(.btn-link, .btn-outline, .btn-ghost)': {
        border,
      },
    },
    '.menu': {
      gap: '0.5rem',
      border,
    },
    '.modal-box': {
      border,
    },
    '.btn-active': {
      'background-color': base['base-content'],
      color: base['base-100'],
    },
    '.alert': {
      border,
    },
    '.tabs': {
      border,
    },
  } as unknown as Record<string, string>),
})

export const light = extend(lightBase)
export const dark = extend(darkBase)
