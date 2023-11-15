import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  CircularProgress,
} from '@mui/material'
import { Send } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { Socket } from 'socket.io-client'
import { actions } from '@Redux/chats/slice'

interface InputProps {
  socket: Socket
}

export function Input({ socket }: InputProps) {
  const { setNotifications } = actions
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLogged, data } = useSelector((state: RootState) => state.users)
  const { selectedUser, notifications } = useSelector(
    (state: RootState) => state.chats,
  )
  const isOng = data?.ongData ? 'sender' : 'receiver'

  function handleMessageSubmit() {
    if (message.trim() && isLogged && data && selectedUser) {
      setLoading(true)
      socket.emit(
        'send.message',
        {
          id: data.id,
          name: data.name,
          email: data.email,
          roomId: selectedUser.id,
          message,
        },
        selectedUser,
      )
      socket.emit(
        'notifications',
        data?.ongData ? selectedUser.sender : selectedUser.receiver,
      )
      setLoading(false)
      setMessage('')
    }
  }
  return (
    <Box
      component="form"
      height="15%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingX={2}
      onSubmit={handleMessageSubmit}
    >
      <TextField
        fullWidth
        multiline
        disabled={!selectedUser}
        placeholder="Digite sua messagem"
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleMessageSubmit()
            const filteredNotifications = notifications.filter(
              (itemFilter) => itemFilter !== selectedUser?.[isOng],
            )
            dispatch(setNotifications(filteredNotifications))
          }
        }}
        value={message}
        onChange={(event) => {
          setMessage(event.target.value)
        }}
        maxRows={3}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleMessageSubmit} disabled={!selectedUser}>
              <InputAdornment disablePointerEvents position="end">
                {loading ? <CircularProgress /> : <Send />}
              </InputAdornment>
            </IconButton>
          ),
        }}
      />
    </Box>
  )
}
