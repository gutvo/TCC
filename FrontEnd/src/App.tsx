import GlobalStyle from './styles/EstiloGlobal'
import MainRoutes from './routes'
import { HelmetProvider } from 'react-helmet-async'
import './styles/themes/extendTheme'

function App() {
  return (
    <HelmetProvider>
      <GlobalStyle />
      <MainRoutes />
    </HelmetProvider>
  )
}
export default App
