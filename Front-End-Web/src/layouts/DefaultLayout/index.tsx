import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Container, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import temaEscuro from '../../styles/themes/TemaEscuro'
import temaClaro from '../../styles/themes/TemaClaro'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function DefaultLayout() {
  const [tema, setTema] = useState(false)
  const handleTemaChange = () => {
    setTema(!tema)
  }
  const theme = tema ? temaEscuro : temaClaro
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar handleTemaChange={handleTemaChange} tema={tema} />
      <div style={{ backgroundColor: theme.palette.primary.dark }}>
        <Container
          maxWidth="lg"
          sx={{
            paddingY: '3rem',
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
