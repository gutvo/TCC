import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import GlobalStyle from './styles/EstiloGlobal'
import MainRoutes from './routes'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <MainRoutes />
      </ThemeProvider>
    </HelmetProvider>
  )
}
export default App
