import { css } from '@/utils'

const background = 'hsl(var(--background))'
const secondary = 'hsl(var(--secondary))'
const muted = 'hsl(var(--muted))'
const popover = 'hsl(var(--popover))'
const card = 'hsl(var(--card))'
const baseContent = 'hsl(var(--foreground))'

const secondaryForeground = 'hsl(var(--secondary-foreground))'
const faintBaseContent = 'hsl(var(--muted-foreground))'
const brandColor = 'hsl(var(--primary))'
const buttonColor = secondary

const borderColor = 'hsl(var(--border))'
const borderStyle = '0.0625rem solid'
const border = `${borderStyle} ${borderColor}`
const borderRadius = 'var(--radius)'

const shadowDomOverWrites = css`
  .dynamic-shadow-dom {
    --dynamic-font-family-primary: 'Archivo';

    --dynamic-base-1: ${background};
    --dynamic-base-2: ${card};
    --dynamic-base-3: ${popover};
    --dynamic-base-4: ${borderColor};

    --dynamic-text-primary: ${baseContent};
    --dynamic-text-secondary: ${secondaryForeground};
    --dynamic-text-tertiary: ${faintBaseContent};

    --dynamic-brand-primary-color: ${brandColor};
    --dynamic-badge-dot-background: ${brandColor};
    --dynamic-footer-background-color: ${brandColor};

    --dynamic-search-bar-background: ${muted};
    --dynamic-search-bar-background-focus: ${popover};
    --dynamic-search-bar-background-hover: ${popover};
    --dynamic-search-bar-border: ${border};
    --dynamic-search-bar-border-hover: ${border};
    --dynamic-search-bar-border-focus: ${border};
    --dynamic-search-border-radius: ${borderRadius};

    --dynamic-badge-color: ${baseContent};
    --dynamic-badge-background: ${secondary};

    --dynamic-button-primary-background: ${buttonColor};
    --dynamic-button-primary-border: ${border};

    --dynamic-wallet-list-tile-background: ${secondary};
    --dynamic-wallet-list-tile-background-hover: ${background};
    --dynamic-wallet-list-tile-border-radius: ${borderRadius};

    --dynamic-modal-border: ${border};
    --dynamic-hover: ${buttonColor};
    --dynamic-border-radius: ${borderRadius};
  }
`

const cssOverrides = css`
  .connect-button,
  .dynamic-widget-inline-controls,
  .dynamic-widget-inline-controls__account-control,
  .dynamic-widget-inline-controls__account-control-container,
  .dynamic-widget-inline-controls__network-picker {
    max-height: 2rem;
    border-radius: 1rem;
  }

  .evm-network-control__container--error {
    border-radius: 1rem;
  }

  .popper-content {
    z-index: 3;
  }

  .dynamic-widget-card,
  .modal-card {
    border: ${border};
  }

  .dynamic-widget-inline-controls {
    background: ${buttonColor};
  }

  .single-wallet-buttons__copied {
    color: ${baseContent};
  }

  .input__container .input {
    background: ${muted} !important;
  }

  .focus:input__container .focus:input {
    background: ${background} !important;
  }

  .hover:input__container .hover:input {
    background: ${background} !important;
  }
`

export const dynamicTheme = {
  shadowDomOverWrites,
  cssOverrides,
}
