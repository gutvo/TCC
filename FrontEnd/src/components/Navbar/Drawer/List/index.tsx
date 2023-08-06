import { useState } from 'react'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ListItem } from './ListItem/index'
import { useSelector } from 'react-redux'
import { RootState } from '@Redux/store'

interface ListDrawerProps {
  toggleDrawer: () => void
}

export function ListDrawer({ toggleDrawer }: ListDrawerProps) {
  const [openAnimalList, setOpenAnimalList] = useState(false)
  const { data, isLogged } = useSelector((state: RootState) => state.users)

  return (
    <>
      <Typography
        marginLeft={1}
        fontSize="2rem"
        fontWeight="bold"
        marginTop={3}
      >
        Menu
      </Typography>
      <List
        sx={{
          height: '100%',
          textAlign: 'center',
        }}
      >
        <ListItem toggleDrawer={toggleDrawer} path="/" label="Home" />
        <ListItem
          toggleDrawer={toggleDrawer}
          path="/ongs"
          label="Organizações"
        />
        {data ? (
          <ListItem toggleDrawer={toggleDrawer} path="/chat" label="Chat" />
        ) : null}
        {isLogged && data?.ongData ? (
          <>
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
          </>
        ) : (
          <ListItem
            toggleDrawer={toggleDrawer}
            path={'/animal'}
            label={'Lista de Animais'}
          />
        )}
      </List>
    </>
  )
}
