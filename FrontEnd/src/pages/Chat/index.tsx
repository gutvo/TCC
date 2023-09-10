import { RootState } from '@Redux/store'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { NavigateBar } from './NavigateBar'
import { Navbar } from '@Components/Navbar'
import { Footer } from '@Components/Footer'
import { Input } from './Input'
import { Content } from './Content'
import Grid from '@mui/material/Grid'
import socketIO from 'socket.io-client'

const socket = socketIO(import.meta.env.VITE_LINK as string, {
  autoConnect: false,
})

export function Chat() {
  const { isLogged } = useSelector((state: RootState) => state.users)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged) {
      navigate('/login')
      toast.info('Porfavor entre na sua conta ou cadastre-se')
    } else {
      socket.on('connect', () => console.log('[io] connect => new Connection'))
    }
  }, [isLogged, navigate])

  return (
    <Box>
      <Helmet title="Chat" />
      <Navbar />
      <Grid container height="90vh">
        <Grid width="30%" item>
          <NavigateBar />
        </Grid>
        <Grid width="70%" item>
          <Content />
          <Input />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  )
}
