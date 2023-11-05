import { RootState } from '@Redux/store'
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { NavigateBar } from './NavigateBar'
// import { Input } from './Input'
// import { Content } from './Content'
import Grid from '@mui/material/Grid'
import { Socket } from 'socket.io-client'
import { Send } from '@mui/icons-material'
import { api } from '@Services/backendApi'

interface ChatProps {
  socket: Socket
}
interface messageProps {
  id: number
  name: string
  email: string
  message: string
}

export function Chat({ socket }: ChatProps) {
  const { palette } = useTheme()
  const { success } = palette
  const { isLogged, loading, data } = useSelector(
    (state: RootState) => state.users,
  )
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<messageProps[]>([])
  const [users, setUsers] = useState<
    { id: number; userId: number; userName: string }[]
  >([])

  const getUser = useCallback(() => {
    if (users) {
      users.map(async (user) => {
        const result = await api.get('/chat', {
          params: { userId: user.userId },
        })
        user.userName = result.data.data
      })
    }

    setUsers(users)
  }, [users])

  useEffect(() => {
    getUser()
  }, [getUser])

  useEffect(() => {
    socket.on('users', (users) => {
      setUsers(users)
    })
  }, [socket])

  useEffect(() => {
    if (data?.email) {
      socket.emit('get.messages')
      socket.on('get.messages', (data) => {
        console.log(data)
      })
    }
  }, [socket, data?.email])

  function handleMessageSubmit() {
    if (message.trim() && isLogged && data) {
      socket.emit('chat.message', {
        id: data.id,
        name: data.name,
        email: data.email,
        message,
      })
      setMessage('')
    }
  }

  useEffect(() => {
    socket.on('message.response', (data: messageProps) =>
      setMessages([...messages, data]),
    )
  }, [socket, messages])

  useEffect(() => {
    if (!isLogged) {
      toast.info('Porfavor entre na sua conta ou cadastre-se')
      navigate('/login')
    }
  }, [isLogged, navigate])

  return (
    <Box>
      <Helmet title="Chat" />
      <Grid container height="90vh">
        <Grid width="30%" item>
          <Box bgcolor={palette.primary.dark} color="white" height="100%">
            {users.map((item) => {
              return (
                <Box key={item.id}>
                  <Typography color="white">{item.userName}</Typography>
                </Box>
              )
            })}
          </Box>
        </Grid>
        <Grid width="70%" item>
          <Box bgcolor="#d4d4d4" height="80%">
            {messages.map((item, index) => {
              const compare = item.email === data?.email
              return (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={compare ? 'end' : 'start'}
                >
                  <Typography
                    marginX="1rem"
                    marginY="1rem"
                    paddingY="0.25rem"
                    paddingX="0.5rem"
                    borderRadius={2}
                    bgcolor={compare ? success.main : 'white'}
                    color={compare ? 'white' : 'black'}
                  >
                    {item.message}
                  </Typography>
                </Box>
              )
            })}
          </Box>
          <Box
            component="form"
            height="20%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingX={2}
            onSubmit={handleMessageSubmit}
          >
            <TextField
              fullWidth
              multiline
              placeholder="Digite sua messagem"
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  handleMessageSubmit()
                }
              }}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
              }}
              maxRows={3}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleMessageSubmit}>
                    <InputAdornment disablePointerEvents position="end">
                      {loading ? <CircularProgress /> : <Send />}
                    </InputAdornment>
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
