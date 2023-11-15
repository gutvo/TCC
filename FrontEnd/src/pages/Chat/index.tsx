import { RootState } from '@Redux/store'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'
import { Socket } from 'socket.io-client'
import { NavigateBar } from './NavigateBar'
import { Input } from './Input'
import { Content } from './Content'
import { actions } from '@Redux/chats/slice'

interface ChatProps {
  socket: Socket
}

export function Chat({ socket }: ChatProps) {
  const { setSelectedUser } = actions
  const dispatch = useDispatch()

  const room = useLocation()?.state?.room

  const { isLogged } = useSelector((state: RootState) => state.users)

  const { selectedUser } = useSelector((state: RootState) => state.chats)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged) {
      toast.info('Porfavor entre na sua conta ou cadastre-se')
      navigate('/login')
    }
  }, [isLogged, navigate])

  useEffect(() => {
    if (room) {
      dispatch(setSelectedUser(room))
    }
  }, [room, dispatch, setSelectedUser])

  useEffect(() => {
    if (selectedUser) {
      socket.emit('join.room', selectedUser)
    }
  }, [socket, selectedUser])

  return (
    <Box>
      <Helmet title="Chat" />
      <Grid container height="90vh">
        <Grid width="25%" item>
          <NavigateBar socket={socket} />
        </Grid>
        <Grid width="75%" item>
          <Content socket={socket} />
          <Input socket={socket} />
        </Grid>
      </Grid>
    </Box>
  )
}
