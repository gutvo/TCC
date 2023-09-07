import { Outlet } from 'react-router-dom'
import { Container, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import darkTheme from '@Themes/darkTheme'
import lightTheme from '@Themes/lightTheme'
import { Alert } from '@Components/Alert'
import { Navbar } from '@Components/Navbar'
import { Footer } from '@Components/Footer'

export function DefaultLayout() {
  const [theme, setTheme] = useState(false)
  const handleThemeChange = () => {
    setTheme(!theme)
  }
  const choiceTheme = theme ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={choiceTheme}>
      <Alert />
      <Navbar handleThemeChange={handleThemeChange} theme={theme} />
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: choiceTheme.palette.background.paper,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            paddingY: '2rem',
            minHeight: '90vh',
            backgroundColor: choiceTheme.palette.background.default,
          }}
        >
          <Outlet />
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  )
}
