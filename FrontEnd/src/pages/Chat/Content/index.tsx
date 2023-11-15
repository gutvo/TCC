import { RootState } from '@Redux/store'
import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { actions } from '@Redux/chats/slice'
import { messageProps } from '@Interfaces/redux/chats'

interface ContentProps {
  socket: Socket
}

export function Content({ socket }: ContentProps) {
  const dispatch = useDispatch()
  const { setMessages } = actions
  const { palette } = useTheme()
  const { success } = palette

  const { data } = useSelector((state: RootState) => state.users)
  const { messages, selectedUser } = useSelector(
    (state: RootState) => state.chats,
  )

  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedUser) {
      socket.emit('get.messages', selectedUser)
      socket.on('get.messages', (data) => {
        dispatch(setMessages(data))
      })
    }
  }, [socket, selectedUser, setMessages, dispatch])

  useEffect(() => {
    socket.on('message.response', (data: messageProps) =>
      dispatch(setMessages([...messages, data])),
    )
  }, [socket, messages, setMessages, dispatch])

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  return (
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
          Selecione uma conversa
        </Typography>
      )}
    </Box>
  )
}
