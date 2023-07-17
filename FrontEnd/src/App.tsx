import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Animal } from './pages/Animal/index'
import { NotFound } from './pages/NotFound'
import { Chat } from './pages/Chat'
import { Ong } from './pages/Organization'
import { Doacao } from './pages/Doacao'
import { Contato } from './pages/Contato'
import { Cadastro } from './pages/Cadastro'
import { Login } from './pages/Login/Login'
import { DefaultLayout } from './layouts/DefaultLayout/index'
import GlobalStyle from './styles/EstiloGlobal'
import { CadastroAnimal } from './pages/Animal/Cadastrar'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/Animal" element={<Animal />} />
            <Route path="/Animal/Cadastrar" element={<CadastroAnimal />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Ongs" element={<Ong />} />
            <Route path="/Doacoes" element={<Doacao />} />
            <Route path="/Contatos" element={<Contato />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App
