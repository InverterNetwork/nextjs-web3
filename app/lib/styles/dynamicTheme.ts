import { dark, light } from '@/lib/styles/theme'
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

  const dynamicBrandColor = isLight ? light.accent[400] : dark.accent[400]
  const shadowDomOverWrites = css`
    .dynamic-shadow-dom {
      --dynamic-font-family-primary: 'Open Sans', sans-serif;
      --dynamic-base-1: ${isLight ? light.primary[100] : dark.primary[900]};
      --dynamic-base-2: ${isLight ? light.primary[50] : dark.primary[700]};
      --dynamic-button-primary-background: ${isLight
        ? light.primary[100]
        : dark.primary[700]};
      --dynamic-brand-primary-color: ${dynamicBrandColor};
      --dynamic-badge-dot-background: ${dynamicBrandColor};
      --dynamic-footer-background-color: ${dynamicBrandColor};
      --dynamic-search-bar-background-focus: ${isLight
        ? light.primary[50]
        : dark.primary[700]};
      --dynamic-search-bar-background-hover: ${isLight
        ? light.primary[50]
        : dark.primary[700]};
    }
  `
  const cssOverrides =
    `
  .connect-button,
  .dynamic-widget-inline-controls {
    background: ${isLight ? light.primary[50] : dark.primary[700]};
    border: 1px solid ${isLight ? light.border : dark.border}
  }
  ` + staticCssOVerrides

  return {
    shadowDomOverWrites,
    cssOverrides,
  }
}
