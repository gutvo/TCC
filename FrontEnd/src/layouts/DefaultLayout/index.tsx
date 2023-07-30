import { Outlet } from 'react-router-dom'
import { Container, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import temaEscuro from '@themes/TemaEscuro'
import temaClaro from '@themes/TemaClaro'
import { Alert } from '@components/Alert'
import { Navbar } from '@components/Navbar'
import { Footer } from '@components/Footer'

export function DefaultLayout() {
  const [tema, setTema] = useState(false)
  const handleTemaChange = () => {
    setTema(!tema)
  }
  const theme = tema ? temaEscuro : temaClaro
  return (
    <ThemeProvider theme={theme}>
      <Alert />
      <Navbar handleThemeChange={handleTemaChange} theme={tema} />
      <div style={{ backgroundColor: theme.palette.primary.dark }}>
        <Container
          sx={{
            paddingY: '2rem',
            minHeight: '100vh',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Outlet />
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  )
}
