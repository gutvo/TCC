import { RootState } from '@Redux/store'
import { Box, useTheme, List, ListItemText, ListItem } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { actions } from '@Redux/chats/slice'
import { ListItemAvatar } from './ListItemAvatar'
import { firstName } from '@Functions'

interface NavigateBarProps {
  socket: Socket
}

export function NavigateBar({ socket }: NavigateBarProps) {
  const dispatch = useDispatch()
  const { setMessages, setSelectedUser, setNotifications, setUsers } = actions
  const { palette } = useTheme()
  const { primary } = palette

  const { selectedUser, notifications, users } = useSelector(
    (state: RootState) => state.chats,
  )

  const { data } = useSelector((state: RootState) => state.users)

  const isOng = data?.ongData ? 'sender' : 'receiver'

  useEffect(() => {
    if (data?.id) {
      socket.emit('rooms', data?.id)
      socket.on('rooms.response', (users) => {
        dispatch(setUsers(users))
      })
    }
  }, [socket, data?.id, dispatch, setUsers])

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
                dispatch(setSelectedUser(item))
                dispatch(setMessages([]))

                const filteredNotifications = notifications.filter(
                  (itemFilter) => itemFilter !== item[isOng],
                )
                dispatch(setNotifications(filteredNotifications))
              }}
              alignItems="center"
              sx={{
                background:
                  selectedUser?.id === item.id ? primary.main : primary.dark,
                cursor: 'pointer',
                ':hover': { background: palette.primary.main },
              }}
            >
              <ListItemAvatar
                countNotifications={countNotifications}
                email={
                  isOng === 'receiver'
                    ? item.ongData?.email
                    : item.userData?.email
                }
                image={
                  isOng === 'receiver'
                    ? item.ongData?.image
                    : item.userData?.image
                }
              />

              <ListItemText
                primary={
                  item.ongData
                    ? firstName(item.ongData?.name)
                    : firstName(item.userData?.name)
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
