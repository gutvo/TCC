import { Logout } from '@mui/icons-material'
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { RootState } from '@Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { MouseEvent, useState } from 'react'
import { actions } from '@Redux/users/slice'
import { useNavigate } from 'react-router-dom'

export function Profile() {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const { logout } = actions

  const priviewImageUser = useSelector(
    (state: RootState) => state.users.data?.previewImage,
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Tooltip title="Perfil">
        <IconButton
          onClick={handleClick}
          sx={{ display: 'flex', alignItems: 'center' }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: '3rem', height: '3rem' }}
            src={priviewImageUser}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigator('usuario')}>
          <Avatar sx={{ marginRight: 1 }} src={priviewImageUser} /> Meu Perfil
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            dispatch(logout())
            navigator('/')
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  )
}
