import { RootState } from '@Redux/store'
import {
  Avatar,
  Box,
  ListItemAvatar,
  useTheme,
  List,
  ListItemText,
  ListItem,
  Badge,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { messageProps, roomsProps } from '..'

interface NavigateBarProps {
  socket: Socket
  setSelectedUser: (data: roomsProps) => void
  setMessages: (data: messageProps[]) => void
  selectedUser: roomsProps | null
}

export function NavigateBar({
  socket,
  setMessages,
  setSelectedUser,
  selectedUser,
}: NavigateBarProps) {
  const { palette } = useTheme()
  const { primary } = palette
  const { data } = useSelector((state: RootState) => state.users)
  const isOng = data?.ongData ? 'sender' : 'receiver'

  const [users, setUsers] = useState<roomsProps[]>([])
  const [notifications, setNotifications] = useState<number[]>([])

  useEffect(() => {
    if (data?.id) {
      socket.emit('rooms', data?.id)
      socket.on('rooms.response', (users) => {
        setUsers(users)
      })
    }
  }, [socket, data?.id])

  useEffect(() => {
    socket.on('get.notifications', (data) => {
      setNotifications(notifications.concat(data))
    })
  }, [socket, notifications])
  console.log(notifications)

  return (
    <Box
      bgcolor={palette.primary.dark}
      color="white"
      height="100%"
      overflow="auto"
      sx={{
        '::-webkit-scrollbar': { width: 0, height: 0 },
      }}
    >
      <List>
        {users.map((item) => {
          const countNotifications = notifications.filter(
            (filterItem) => filterItem === item[isOng],
          ).length
          return (
            <ListItem
              key={item.id}
              onClick={() => {
                if (selectedUser?.id === item.id) {
                  return
                }
                socket.emit('leave.room', item)
                setSelectedUser(item)
                setMessages([])

                const filteredNotifications = notifications.filter(
                  (itemFilter) => itemFilter !== item[isOng],
                )
                setNotifications(filteredNotifications)
              }}
              alignItems="center"
              sx={{
                background:
                  selectedUser?.id === item.id ? primary.main : primary.dark,
                cursor: 'pointer',
                ':hover': { background: palette.primary.main },
              }}
            >
              <ListItemAvatar>
                <Badge badgeContent={countNotifications} color="error">
                  <Avatar alt="Avatar" sizes="100%" />
                </Badge>
              </ListItemAvatar>

              <ListItemText
                primary={
                  item.ongData
                    ? item.ongData?.name.split(' ')[0]
                    : item.userData?.name.split(' ')[0]
                }
                sx={{ overflow: 'hidden', overflowWrap: 'break-word' }}
              />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
