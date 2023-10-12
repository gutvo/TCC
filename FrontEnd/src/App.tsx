import GlobalStyle from './styles/EstiloGlobal'
import MainRoutes from './routes'
import { HelmetProvider } from 'react-helmet-async'
import './styles/themes/extendTheme'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from '@Themes/lightTheme'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <HelmetProvider>
        <GlobalStyle />
        <MainRoutes />
      </HelmetProvider>
    </ThemeProvider>
  )
}
export default App
