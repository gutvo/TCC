import { RootState } from '@Redux/store'
import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { NavigateBar } from './NavigateBar'
// import { Input } from './Input'
// import { Content } from './Content'
import Grid from '@mui/material/Grid'
import { Socket } from 'socket.io-client'
import { NavigateBar } from './NavigateBar'
import { Input } from './Input'

interface ChatProps {
  socket: Socket
}
export interface messageProps {
  id: number
  name: string
  email: string
  message: string
}

export interface roomsProps {
  id: number
  name: string
  ongData?: { email: string; name: string }
  userData?: { email: string; name: string }
  receiver: number
  sender: number
}

export function Chat({ socket }: ChatProps) {
  const room = useLocation()?.state?.room
  const { palette } = useTheme()
  const { success } = palette
  const { isLogged, data } = useSelector((state: RootState) => state.users)

  const navigate = useNavigate()
  const [messages, setMessages] = useState<messageProps[]>([])
  const [selectedUser, setSelectedUser] = useState<roomsProps | null>(null)
  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (selectedUser) {
      socket.emit('get.messages', selectedUser)
      socket.on('get.messages', (data) => {
        setMessages(data)
      })
    }
  }, [socket, selectedUser])

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

  useEffect(() => {
    if (room) {
      setSelectedUser(room)
    }
  }, [room])
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
          <NavigateBar
            selectedUser={selectedUser}
            setMessages={setMessages}
            setSelectedUser={setSelectedUser}
            socket={socket}
          />
        </Grid>
        <Grid width="75%" item>
          <Box
            bgcolor="#e0dfdf"
            height="76vh"
            overflow="auto"
            sx={{
              '::-webkit-scrollbar': { width: 0, height: 0 },
            }}
            ref={messageListRef}
          >
            {selectedUser ? (
              <>
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
                        marginY="0.5rem"
                        paddingY="0.25rem"
                        paddingX="0.5rem"
                        borderRadius={2}
                        variant="h6"
                        bgcolor={compare ? success.main : 'white'}
                        color={compare ? 'white' : 'black'}
                      >
                        {item.message}
                      </Typography>
                    </Box>
                  )
                })}
              </>
            ) : (
              <Typography textAlign="center" variant="h4">
                Selecione uma converça
              </Typography>
            )}
          </Box>
          <Input selectedUser={selectedUser} socket={socket} />
        </Grid>
      </Grid>
    </Box>
  )
}
