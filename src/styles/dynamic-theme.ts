import { css } from '@emotion/react'

const base1 = 'hsl(var(--background))'
const base2 = 'hsl(var(--secondary))'
const base3 = 'hsl(var(--popover))'
const baseContent = 'hsl(var(--foreground))'

const faintBaseContent = 'hsl(var(--muted-foreground))'
const brandColor = 'hsl(var(--primary))'
const buttonColor = base2

const borderColor = 'hsl(var(--border))'
const borderStyle = '0.0625rem solid'
const border = `${borderStyle} ${borderColor}`
const borderRadius = 'var(--radius)'

const shadowDomOverWrites = css`
  .dynamic-shadow-dom {
    --dynamic-font-family-primary: 'Archivo';

    --dynamic-base-1: ${base1};
    --dynamic-base-2: ${base2};
    --dynamic-base-3: ${base3};
    --dynamic-base-4: ${borderColor};

    --dynamic-text-primary: ${baseContent};
    --dynamic-text-secondary: ${faintBaseContent};
    --dynamic-text-tertiary: ${faintBaseContent};

    --dynamic-brand-primary-color: ${brandColor};
    --dynamic-badge-dot-background: ${brandColor};
    --dynamic-footer-background-color: ${brandColor};

    --dynamic-search-bar-background: ${base2};
    --dynamic-search-bar-background-focus: ${base3};
    --dynamic-search-bar-background-hover: ${base3};
    --dynamic-search-bar-border: ${border};
    --dynamic-search-bar-border-hover: ${border};
    --dynamic-search-bar-border-focus: ${border};
    --dynamic-search-border-radius: ${borderRadius};

    --dynamic-badge-color: ${baseContent};
    --dynamic-badge-background: ${base2};

    --dynamic-button-primary-background: ${buttonColor};
    --dynamic-button-primary-border: ${border};

    --dynamic-wallet-list-tile-background: ${base2};
    --dynamic-wallet-list-tile-background-hover: ${base1};
    --dynamic-wallet-list-tile-border-radius: ${borderRadius};

    --dynamic-modal-border: ${border};
    --dynamic-hover: ${buttonColor};
    --dynamic-border-radius: ${borderRadius};
  }
`

const cssOverrides = `
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
`

export const dynamicTheme = {
  shadowDomOverWrites,
  cssOverrides,
}
