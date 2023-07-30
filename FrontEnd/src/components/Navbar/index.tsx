import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Box, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { DrawerList } from './Drawer'

interface HeaderProps {
  handleThemeChange: () => void
  theme: boolean
}

export function Navbar({ handleThemeChange, theme }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigation = useNavigate()

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ fontSize: '5rem' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
            onClick={toggleDrawer}
          >
            <Menu sx={{ width: '2rem', height: '2rem' }} />
          </IconButton>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Button
              color="inherit"
              onClick={() => {
                navigation('/cadastro')
              }}
            >
              Sign in
            </Button>
            <Button
              onClick={() => {
                navigation('/login')
              }}
              color="inherit"
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerList
        drawerOpen={drawerOpen}
        handleThemeChange={handleThemeChange}
        theme={theme}
        toggleDrawer={toggleDrawer}
      />
    </Box>
  )
}
