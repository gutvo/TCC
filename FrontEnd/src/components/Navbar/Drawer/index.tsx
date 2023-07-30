import { useState } from 'react'
import {
  Button,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import {
  DarkMode,
  ExpandLess,
  ExpandMore,
  LightMode,
} from '@mui/icons-material'
import { ListItem } from './ListItem'

interface drawerListProps {
  drawerOpen: boolean
  toggleDrawer: () => void
  handleThemeChange: () => void
  theme: boolean
}

export function DrawerList({
  drawerOpen,
  toggleDrawer,
  handleThemeChange,
  theme,
}: drawerListProps) {
  const [openAnimalList, setOpenAnimalList] = useState(false)
  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <List
        sx={{
          width: '40vw',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <ListItem toggleDrawer={toggleDrawer} path="/" label="home" />

        <ListItem
          toggleDrawer={toggleDrawer}
          path="/ongs"
          label="Instituições"
        />
        <ListItem toggleDrawer={toggleDrawer} path="/chat" label="Chat" />
        <ListItemButton
          onClick={() => {
            setOpenAnimalList(!openAnimalList)
          }}
        >
          <ListItemText
            primary="Animal"
            primaryTypographyProps={{ style: { fontSize: '1.35rem' } }}
          />
          {openAnimalList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAnimalList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              paddinLeft
              toggleDrawer={toggleDrawer}
              path="/animal/cadastrar"
              label="Cadastrar"
            />
            <ListItem
              paddinLeft
              toggleDrawer={toggleDrawer}
              path="/animal"
              label="Lista"
            />
          </List>
        </Collapse>

        <Button
          size="large"
          sx={{ width: '80%', marginTop: 1 }}
          variant="contained"
          onClick={handleThemeChange}
        >
          {theme ? <DarkMode /> : <LightMode />}
        </Button>
      </List>
    </Drawer>
  )
}
