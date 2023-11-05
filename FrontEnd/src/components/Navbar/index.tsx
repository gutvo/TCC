import { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Menu as MenuIcon, Login } from '@mui/icons-material'
import { DrawerList } from './Drawer'
import { RootState } from '@Redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { NavLinkList } from './NavLinkList'
import { NavLinkButton } from './NavLinkButton'
import { Profile } from './Profile'

export function Navbar() {
  const dispatch = useDispatch()
  const { breakpoints } = useTheme()
  const mobile = useMediaQuery(breakpoints.down('mobile'))
  const { showUserRequest, listCityRequest } = actions

  const { isLogged, data } = useSelector((state: RootState) => state.users)

  const user = localStorage.getItem('user')
  const email = user ? JSON.parse(user).email : null
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [flag, setFlag] = useState(true)

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }

  useEffect(() => {
    if (!mobile) {
      setDrawerOpen(false)
    }
  }, [mobile])

  useEffect(() => {
    if (!data?.ongData) {
      dispatch(listCityRequest())
    }
  }, [dispatch, listCityRequest, data])

  useEffect(() => {
    if (isLogged && flag) {
      dispatch(showUserRequest(email))
      setFlag(false)
    }
  }, [isLogged, showUserRequest, email, dispatch, flag])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ fontSize: '5rem' }} elevation={0}>
        <Toolbar>
          {mobile ? (
            <IconButton
              edge="start"
              color="inherit"
              sx={{ marginRight: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon sx={{ width: '2rem', height: '2rem' }} />
            </IconButton>
          ) : (
            <NavLinkList />
          )}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            {isLogged ? (
              <Profile />
            ) : (
              <NavLinkButton label="Entrar" href="/login" Icon={Login} />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerList drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </Box>
  )
}
