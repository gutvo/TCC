import { RootState } from '@Redux/store'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'
import { NavigateBar } from './NavigateBar'
import { Input } from './Input'
import { Content } from './Content'
import { actions } from '@Redux/chats/slice'
import { socket } from '@Functions'

export function Chat() {
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
  }, [selectedUser])

  return (
    <Box>
      <Helmet title="Chat" />
      <Grid container minHeight="90vh">
        <Grid xs={12} mobile={4} item>
          <NavigateBar />
        </Grid>
        <Grid item xs={12} mobile={8}>
          <Grid container>
            <Grid item xs={12}>
              <Content />
            </Grid>
            <Grid paddingY={2} item xs={12}>
              <Input />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
