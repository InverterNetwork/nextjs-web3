import { dark, light } from '.'
import { css } from '@emotion/react'

export const getDynamicTheme = (isLight: boolean) => {
  const staticCssOVerrides = `
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
      `

  const borderColor = isLight ? light.border : dark.border
  const textColor = isLight ? 'black' : 'white'
  const dynamicBrandColor = isLight ? light.accent[400] : dark.accent[400]
  const base1 = isLight ? light.primary[50] : dark.primary[900]
  const base2 = isLight ? light.primary[100] : dark.primary[800]
  const base3 = isLight ? light.primary[200] : dark.primary[700]
  const buttonColor = isLight ? light.primary[50] : dark.primary[700]

  const shadowDomOverWrites = css`
    .dynamic-shadow-dom {
      --dynamic-font-family-primary: 'Open Sans', sans-serif;

      --dynamic-base-1: ${base1};
      --dynamic-base-2: ${base2};
      --dynamic-base-3: ${base3};
      --dynamic-base-4: ${borderColor};

      --dynamic-text-primary: ${textColor};
      --dynamic-text-secondary: ${borderColor};
      --dynamic-text-tertiary: ${borderColor};

      --dynamic-brand-primary-color: ${dynamicBrandColor};
      --dynamic-badge-dot-background: ${dynamicBrandColor};
      --dynamic-footer-background-color: ${dynamicBrandColor};

      --dynamic-search-bar-background: ${base2};
      --dynamic-search-bar-background-focus: ${base1};
      --dynamic-search-bar-background-hover: ${base3};
      --dynamic-search-bar-border: 0.0625rem solid ${base2};
      --dynamic-search-bar-border-hover: 0.0625rem solid ${borderColor};
      --dynamic-search-bar-border-focus: 0.0625rem solid ${borderColor};

      --dynamic-badge-color: ${textColor};
      --dynamic-badge-background: ${base2};

      --dynamic-button-primary-background: ${buttonColor};
      --dynamic-button-primary-border: 0.0625rem solid ${borderColor};

      --dynamic-wallet-list-tile-background: ${base2};
      --dynamic-wallet-list-tile-background-hover: ${base1};
    }
  `
  const cssOverrides =
    `
  .connect-button,
  .dynamic-widget-inline-controls {
    background: ${buttonColor};
    border: 1px solid ${borderColor}
  }
  ` + staticCssOVerrides

  return {
    shadowDomOverWrites,
    cssOverrides,
  }
}
