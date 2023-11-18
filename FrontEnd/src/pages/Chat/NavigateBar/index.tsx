import { RootState } from '@Redux/store'
import {
  Box,
  useTheme,
  List,
  ListItemText,
  ListItem,
  Stack,
  useMediaQuery,
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/chats/slice'
import { ListItemAvatar } from '@Components/ListItemAvatar'
import { firstName, socket } from '@Functions'
import { roomsProps } from '@Interfaces/redux/chats'

export function NavigateBar() {
  const dispatch = useDispatch()
  const { setMessages, setSelectedUser, setNotifications, setUsers } = actions
  const { palette, breakpoints } = useTheme()
  const { Chat } = palette

  const mediaQueryUpMobile = useMediaQuery(breakpoints.up('mobile'))

  const { selectedUser, notifications, users } = useSelector(
    (state: RootState) => state.chats,
  )

  const { data } = useSelector((state: RootState) => state.users)

  const isOng = data?.ongData ? 'sender' : 'receiver'

  function handleChoiceUser(item: roomsProps) {
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
  }

  useEffect(() => {
    if (data?.id) {
      function roomsResponse(users: roomsProps[]) {
        dispatch(setUsers(users))
      }

      socket.emit('rooms', data?.id)
      socket.on('rooms.response', roomsResponse)

      return () => {
        socket.off('rooms.response', roomsResponse)
      }
    }
  }, [data?.id, dispatch, setUsers])

  return (
    <Box
      bgcolor={palette.Chat.dark}
      color="white"
      height="100%"
      overflow="auto"
      sx={{
        '::-webkit-scrollbar': { width: 0, height: 0 },
      }}
    >
      {mediaQueryUpMobile ? (
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
                    selectedUser?.id === item.id ? Chat.main : Chat.dark,
                  cursor: 'pointer',
                  ':hover': { background: palette.Chat.main },
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
                  primaryTypographyProps={{
                    variant: 'h6',
                    style: { fontWeight: 'bold' },
                  }}
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
      ) : (
        <Stack
          spacing={1}
          direction="row"
          maxWidth={breakpoints.values.mobile}
          overflow="auto"
        >
          {users.map((item) => {
            const countNotifications = notifications.filter(
              (filterItem) => filterItem === item[isOng],
            ).length
            return (
              <ListItem
                key={item.id}
                onClick={() => handleChoiceUser(item)}
                alignItems="center"
                sx={{
                  background:
                    selectedUser?.id === item.id ? Chat.main : Chat.dark,
                  cursor: 'pointer',
                  ':hover': { background: palette.Chat.main },
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
                  primaryTypographyProps={{
                    variant: 'h6',
                    style: { fontWeight: 'bold' },
                  }}
                  primary={
                    item.ongData
                      ? firstName(item.ongData?.name)
                      : firstName(item.userData?.name)
                  }
                  sx={{
                    overflow: 'hidden',
                    overflowWrap: 'break-word',
                  }}
                />
              </ListItem>
            )
          })}
        </Stack>
      )}
    </Box>
  )
}
