import { Outlet } from 'react-router-dom'
import { Container, ThemeProvider } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import lightTheme from '@Themes/lightTheme'
import { Alert } from '@Components/Alert'
import { Navbar } from '@Components/Navbar'
import { Footer } from '@Components/Footer'

interface DefaultLayoutProps {
  haveContainer?: boolean
}

export function DefaultLayout({ haveContainer }: DefaultLayoutProps) {
  return (
    <>
      {haveContainer ? (
        <ThemeProvider theme={lightTheme}>
          <Alert />
          <Navbar />
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: lightTheme.palette.background.paper,
            }}
          >
            <Container
              maxWidth="md"
              sx={{
                paddingY: '2rem',
                minHeight: '90vh',
                backgroundColor: lightTheme.palette.background.default,
              }}
            >
              <Outlet />
            </Container>
          </div>
          <Footer />
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={lightTheme}>
          <Alert />
          <Navbar />
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: lightTheme.palette.background.paper,
            }}
          >
            <Outlet />
          </div>
          <Footer />
        </ThemeProvider>
      )}
    </>
  )
}
