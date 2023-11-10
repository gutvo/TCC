import { Outlet } from 'react-router-dom'
import { Box, Breakpoint, Container } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import { Alert } from '@Components/Alert'
import { Navbar } from '@Components/Navbar'
import { Footer } from '@Components/Footer'
import { lightTheme } from '@Themes/lightTheme'
import { Socket } from 'socket.io-client'

interface DefaultLayoutProps {
  container?: false | Breakpoint | undefined
  socket: Socket
}

export function DefaultLayout({ container, socket }: DefaultLayoutProps) {
  return (
    <>
      {container ? (
        <>
          <Alert />
          <Navbar socket={socket} />
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: lightTheme.palette.background.paper,
            }}
          >
            <Container
              maxWidth={container}
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
        </>
      ) : (
        <>
          <Alert />
          <Navbar socket={socket} />
          <div
            style={{
              width: '100%',
              minHeight: '100%',
              backgroundColor: lightTheme.palette.background.paper,
            }}
          >
            <Box minHeight="90vh">
              <Outlet />
            </Box>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}
