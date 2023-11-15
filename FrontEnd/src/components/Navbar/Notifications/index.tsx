import { IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material'
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
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (data?.id) {
      socket.emit('rooms', data?.id)
      socket.on('rooms.response', (users) => {
        dispatch(setUsers(users))
      })
    }
  }, [socket, data?.id, setUsers, dispatch])

  useEffect(() => {
    const usersFiltered = users.filter((user) =>
      notifications.includes(user[isOng]),
    )
    setFilterUsers(usersFiltered)
  }, [notifications, users, isOng])

  useEffect(() => {
    socket.on('get.notifications', (notificationUserId: number) => {
      dispatch(setNotifications([...notifications, notificationUserId]))
    })
  }, [socket, notifications, dispatch, setNotifications])

  return (
    <>
      <IconButton
        id="button"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
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
          <Typography marginLeft={1}>Mensagens:</Typography>
          {filterUsers.map((item) => {
            const { id } = item

            const countNotifications = notifications.filter(
              (filterItem) => filterItem === item[isOng],
            ).length
            return (
              <MenuItem key={id} onClick={() => handleJoinRoom(item)}>
                {item.ongData
                  ? item.ongData?.name.split(' ')[0]
                  : item.userData?.name.split(' ')[0]}
                :
                <span style={{ marginLeft: 10, color: 'darkred' }}>
                  {countNotifications}
                </span>
              </MenuItem>
            )
          })}
        </Menu>
      ) : null}
    </>
  )
}
