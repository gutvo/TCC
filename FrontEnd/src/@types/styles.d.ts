import 'styled-components'
import { defaultTheme } from '../styles/themes/default'
type ThemeType = typeof defaultTheme

// adiciona tipagem ao styled componentes
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
