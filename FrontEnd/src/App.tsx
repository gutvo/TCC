import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import GlobalStyle from './styles/EstiloGlobal'
import MainRoutes from './routes'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <MainRoutes />
      </ThemeProvider>
    </>
  )
}
export default App
