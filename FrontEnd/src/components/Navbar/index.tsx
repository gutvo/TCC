import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Box, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { DrawerList } from './Drawer'
import { RootState } from '@Redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { DictionaryPaths } from './DictionaryPaths'

export function Navbar() {
  const dispatch = useDispatch()

  const { showUserRequest, logout } = actions

  const { data, isLogged } = useSelector((state: RootState) => state.users)

  const user = localStorage.getItem('user')
  const email = user ? JSON.parse(user).email : null
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [flag, setFlag] = useState(true)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  useEffect(() => {
    if (isLogged && flag) {
      dispatch(showUserRequest(email))
      setFlag(false)
    }
  }, [isLogged, showUserRequest, email, dispatch, flag])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ fontSize: '5rem', backgroundColor: '#454545' }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ marginRight: 2 }}
            onClick={toggleDrawer}
          >
            <Menu sx={{ width: '2rem', height: '2rem' }} />
          </IconButton>
          <DictionaryPaths />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
            gap={2}
          >
            {isLogged ? (
              <NavLink
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: 'white',
                }}
                to="/"
                color="inherit"
                onClick={() => {
                  dispatch(logout())
                }}
              >
                Sair
              </NavLink>
            ) : (
              <>
                <NavLink
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                  to="/cadastro"
                >
                  Cadastrar-se
                </NavLink>
                <NavLink
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                  to="/login"
                  color="inherit"
                >
                  Entrar
                </NavLink>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerList
        drawerOpen={drawerOpen}
        data={data}
        toggleDrawer={toggleDrawer}
      />
    </Box>
  )
}
