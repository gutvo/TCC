import GlobalStyle from './styles/EstiloGlobal'
import MainRoutes from './routes'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <GlobalStyle />
      <MainRoutes />
    </HelmetProvider>
  )
}
export default App
