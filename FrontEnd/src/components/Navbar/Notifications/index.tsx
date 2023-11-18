import {
  IconButton,
  Badge,
  ListItemButton,
  Menu,
  Typography,
  List,
} from '@mui/material'
import { Notifications as NotificationIcon } from '@mui/icons-material'
import { useEffect, MouseEvent, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/chats/slice'
import { RootState } from '@Redux/store'
import { useNavigate } from 'react-router-dom'
import { roomsProps } from '@Interfaces/redux/chats'

interface NotificationsProps {
  socket: Socket
}

export function Notifications({ socket }: NotificationsProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setNotifications, setUsers } = actions

  const { notifications, users } = useSelector(
    (state: RootState) => state.chats,
  )
  function handleJoinRoom(item: roomsProps) {
    navigate('/chat', { state: { room: item } })
  }

  const { data } = useSelector((state: RootState) => state.users)

  const isOng = data?.ongData ? 'sender' : 'receiver'

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filterUsers, setFilterUsers] = useState<roomsProps[]>([])

  const open = Boolean(anchorEl)

  function handleClose() {
    setAnchorEl(null)
  }
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    if (data?.id) {
      function roomResponse(users: roomsProps[]) {
        dispatch(setUsers(users))
      }

      socket.emit('rooms', data.id)
      socket.on('rooms.response', roomResponse)

      return () => {
        socket.off('rooms.response', roomResponse)
      }
    }
  }, [socket, data?.id, setUsers, dispatch])

  useEffect(() => {
    const usersFiltered = users.filter((user) =>
      notifications.includes(user[isOng]),
    )
    setFilterUsers(usersFiltered)
  }, [notifications, users, isOng, socket, data?.id])

  useEffect(() => {
    const usersFiltered = users.find(
      (user) => !notifications.includes(user[isOng]),
    )
    if (usersFiltered) {
      if (data?.id) {
        socket.emit('rooms', data.id)
      }
    }
  }, [data?.id, isOng, notifications, socket, users])

  useEffect(() => {
    function getNotifications(notificationUserId: number) {
      dispatch(setNotifications([...notifications, notificationUserId]))
    }

    socket.on('get.notifications', getNotifications)

    return () => {
      socket.off('get.notifications', getNotifications)
    }
  }, [socket, notifications, dispatch, setNotifications])

  return (
    <>
      <IconButton
        id="button"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={!notifications.length}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationIcon />
        </Badge>
      </IconButton>

      {notifications.length ? (
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'button',
          }}
        >
          <Typography
            marginX={1}
            textAlign="center"
            fontWeight="bold"
            variant="h6"
          >
            Mensagens
          </Typography>

          <List>
            {filterUsers.map((item) => {
              const { id } = item

              const countNotifications = notifications.filter(
                (filterItem) => filterItem === item[isOng],
              ).length
              return (
                <ListItemButton
                  key={id}
                  onClick={() => {
                    handleJoinRoom(item)
                    handleClose()
                  }}
                >
                  <Badge
                    sx={{
                      '& .MuiBadge-badge': {
                        right: -12,
                        top: 4,
                      },
                    }}
                    badgeContent={countNotifications}
                    color="error"
                  >
                    <Typography>
                      {item.ongData
                        ? item.ongData?.name.split(' ')[0]
                        : item.userData?.name.split(' ')[0]}
                    </Typography>
                  </Badge>

                  {/* <span
                      style={{
                        marginLeft: 6,
                        color: 'white',
                        backgroundColor: palette.error.dark,
                        padding: 1,
                        height: 22,
                        width: 22,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      {countNotifications}
                    </span> */}
                </ListItemButton>
              )
            })}
          </List>
        </Menu>
      ) : null}
    </>
  )
}
