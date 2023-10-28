import { useState } from 'react'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import {
  ExpandLess,
  ExpandMore,
  Home,
  Apartment,
  Chat,
  Pets,
  Add,
  List as ListIcon,
  Assessment,
  Favorite,
} from '@mui/icons-material'
import { ListItem } from './ListItem/index'
import { useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { ListDrawerProps } from '@Interfaces/components/Navbar'

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
        <ListItem
          toggleDrawer={toggleDrawer}
          path="/"
          Icon={Home}
          label="Home"
        />

        {isLogged && data && (
          <ListItem
            toggleDrawer={toggleDrawer}
            path="/chat"
            label="Chat"
            Icon={Chat}
          />
        )}

        {!data?.ongData && (
          <ListItem
            toggleDrawer={toggleDrawer}
            path="/ongs"
            label="Organizações"
            Icon={Apartment}
          />
        )}
        {isLogged && data?.ongData ? (
          <>
            <ListItem
              toggleDrawer={toggleDrawer}
              path="/relatorios"
              label="Relatórios"
              Icon={Assessment}
            />
            <ListItem
              toggleDrawer={toggleDrawer}
              path="/adocoes"
              label="Adoções"
              Icon={Favorite}
            />

            <ListItemButton
              onClick={() => {
                setOpenAnimalList(!openAnimalList)
              }}
            >
              <Pets
                color="primary"
                sx={{ paddingRight: 1, fontSize: '2rem' }}
              />
              <ListItemText
                primary="Animal"
                primaryTypographyProps={{ style: { fontSize: '1.35rem' } }}
              />
              {openAnimalList ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>

            <Collapse in={openAnimalList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  paddinLeft
                  toggleDrawer={toggleDrawer}
                  path="/animal/cadastrar"
                  label="Cadastrar"
                  Icon={Add}
                />
                <ListItem
                  paddinLeft
                  toggleDrawer={toggleDrawer}
                  path="/animals"
                  label="Lista"
                  Icon={ListIcon}
                />
              </List>
            </Collapse>
          </>
        ) : (
          <ListItem
            toggleDrawer={toggleDrawer}
            path="/animals"
            label="Lista de Animais"
            Icon={Pets}
          />
        )}
      </List>
    </>
  )
}
