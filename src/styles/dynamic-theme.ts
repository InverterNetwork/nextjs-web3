import { css } from '@inverter-network/react'

const background = 'hsl(var(--background))'
const primary = 'hsl(var(--primary))'
const secondary = 'hsl(var(--secondary))'
const muted = 'hsl(var(--muted))'
const popover = 'hsl(var(--popover))'
const card = 'hsl(var(--card))'

const foreground = 'hsl(var(--foreground))'
const primaryForeground = 'hsl(var(--primary-foreground))'
const secondaryForeground = 'hsl(var(--secondary-foreground))'
const mutedForeground = 'hsl(var(--muted-foreground))'
const popoverForeground = 'hsl(var(--popover-foreground))'
const cardForeground = 'hsl(var(--card-foreground))'

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

    --dynamic-text-primary: ${foreground};
    --dynamic-text-secondary: ${foreground};
    --dynamic-text-tertiary: ${mutedForeground};

    --dynamic-brand-primary-color: ${primary};
    --dynamic-badge-dot-background: ${primary};
    --dynamic-footer-background-color: ${primary};

    --dynamic-search-bar-background: ${card};
    --dynamic-search-bar-background-focus: ${background};
    --dynamic-search-bar-background-hover: ${background};
    --dynamic-search-bar-border: ${border};
    --dynamic-search-bar-border-hover: ${border};
    --dynamic-search-bar-border-focus: ${border};
    --dynamic-search-border-radius: ${borderRadius};

    --dynamic-badge-background: ${background};
    --dynamic-badge-color: ${foreground};

    --dynamic-button-primary-background: ${primary};
    --dynamic-button-primary-border: ${border};

    --dynamic-wallet-list-tile-background: ${card};
    --dynamic-wallet-list-tile-background-hover: ${background};
    --dynamic-wallet-list-tile-border-radius: ${borderRadius};

    --dynamic-modal-border: ${border};
    --dynamic-hover: ${primary};
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
    background: ${primary};
  }

  .single-wallet-buttons__copied {
    color: ${foreground};
  }

  .input__container .input {
    background: ${card} !important;
  }

  .input__container .input:not(.input_error):focus {
    background: ${background} !important;
  }

  .input__container .input:not(.input_error):hover {
    background: ${background} !important;
  }
`

export const dynamicTheme = {
  shadowDomOverWrites,
  cssOverrides,
}
