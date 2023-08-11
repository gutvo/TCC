import { Button, Drawer, Box, Typography } from '@mui/material'
import { DarkMode, LightMode, Edit } from '@mui/icons-material'
import { ListDrawer } from './List'
import userIsNotFound from '@Images/userNotFound.png'
import { NavLink } from 'react-router-dom'
import { drawerListProps } from '@Interfaces/components/Navbar'

export function DrawerList({
  drawerOpen,
  toggleDrawer,
  handleThemeChange,
  theme,
  data,
}: drawerListProps) {
  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Box width="15rem">
        {data ? (
          <Box
            flex={1}
            justifyContent="center"
            textAlign="center"
            borderBottom={1}
            paddingBottom={1}
          >
            <Box
              component={NavLink}
              to="/usuario"
              sx={{
                '&:hover': {
                  '.profileImage': {
                    filter: 'brightness(0.7)',
                  },
                  '.iconProfile': {
                    opacity: 0.8,
                  },
                },
              }}
            >
              <Box
                className="profileImage"
                sx={{
                  position: 'relative',
                  width: '8rem',
                  height: '8rem',
                  display: 'inline-block',
                }}
              >
                <Edit
                  color="primary"
                  fontSize="large"
                  className="iconProfile"
                  sx={{
                    position: 'absolute',
                    opacity: 0,
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
                <Box
                  component="img"
                  src={userIsNotFound}
                  sx={{
                    width: '100%',
                    height: '100%',
                    marginTop: '1rem',
                  }}
                  alt="Foto de usuário"
                />
              </Box>
              <Typography
                sx={{ textDecoration: 'none' }}
                fontSize="1rem"
                fontWeight="bold"
                color="seagreen"
              >
                Bem vindo {data.name && data.name.split(' ')[0]}!!
              </Typography>
            </Box>
          </Box>
        ) : null}

        <ListDrawer toggleDrawer={toggleDrawer} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Button
            sx={{ width: '80%', marginBottom: '1rem' }}
            size="large"
            variant="contained"
            color="warning"
            onClick={handleThemeChange}
          >
            {theme ? <DarkMode /> : <LightMode />}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
