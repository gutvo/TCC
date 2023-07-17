import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material'
import { DarkMode, LightMode, Menu } from '@mui/icons-material'

interface HeaderProps {
  handleTemaChange: () => void
  tema: boolean
}

export function Navbar({ handleTemaChange, tema }: HeaderProps) {
  const [titulo, setTitulo] = useState('Home')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const menuItems = useMemo(
    () => [
      { path: '/', label: 'Home' },
      { path: '/Animal', label: 'Animal' },
      { path: '/Chat', label: 'Chat' },
      { path: '/Ongs', label: 'Instituições' },
      { path: '/Doacoes', label: 'Doações' },
      { path: '/contatos', label: 'Contatos' },
      { path: '/Animal/Cadastrar', label: 'Cadastrar Animais' },
      { path: '/Cadastro', label: 'Cadastrar' },
      { path: '/Login', label: 'Logar' },
    ],
    [],
  )
  useEffect(() => {
    const rotaName = location.pathname.toUpperCase()
    const menuItem = menuItems.find(
      (item) => item.path.toUpperCase() === rotaName,
    )
    if (menuItem) {
      setTitulo(menuItem.label)
    } else {
      setTitulo('Não encontrado')
    }
  }, [location, menuItems])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ fontSize: '5rem' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titulo}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        // sx={{ opacity: 0.95 }}

        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List
          sx={{
            width: '40vw',
            height: '100%',
            textAlign: 'center',
          }}
        >
          {menuItems.map((item) => (
            <ListItemButton
              content="button"
              color="primary"
              component={NavLink}
              to={item.path}
              key={item.label}
              onClick={toggleDrawer}
              divider={true}
            >
              <ListItemText
                primaryTypographyProps={{ style: { fontSize: '1.35rem' } }}
                primary={item.label}
              />
            </ListItemButton>
          ))}

          <Button
            size="large"
            sx={{ width: '80%', marginTop: 1 }}
            variant="contained"
            onClick={handleTemaChange}
          >
            {tema ? <DarkMode /> : <LightMode />}
          </Button>
        </List>
      </Drawer>
    </Box>
  )
}
