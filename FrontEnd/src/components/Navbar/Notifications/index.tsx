import { IconButton, Badge } from '@mui/material'
import { Notifications as NotificationIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

interface NotificationsProps {
  socket: Socket
}

export function Notifications({ socket }: NotificationsProps) {
  const [count, setCout] = useState(0)
  useEffect(() => {
    socket.on('get.notifications', () => {
      console.log('aqui')
      setCout(count + 1)
    })
  }, [count, socket])

  return (
    <IconButton>
      <Badge badgeContent={count} color="error">
        <NotificationIcon />
      </Badge>
    </IconButton>
  )
}
