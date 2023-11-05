import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    CustomTheme?: Palette['primary']
    navLink?: Palette['primary']
  }
  interface PaletteOptions {
    CustomTheme?: PaletteOptions['primary']
    navLink?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsColorOverrides {
    navLink: true
  }
}
declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface BreakpointOverrides {
    mobile: true
    // tablet: true
    // laptop: true
    // desktop: true
  }
}
