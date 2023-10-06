import { Drawer, Box, Typography, Select, MenuItem } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { ListDrawer } from './List'
import userIsNotFound from '@Images/userNotFound.png'
import { NavLink } from 'react-router-dom'
import { drawerListProps } from '@Interfaces/components/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { actions } from '@Redux/users/slice'

export function DrawerList({
  drawerOpen,
  toggleDrawer,
  data,
}: drawerListProps) {
  const dispatch = useDispatch()
  const { listCityRequest, choiceCity } = actions

  const userData = useSelector((state: RootState) => state.users.data)
  const { citys, city } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    if (!userData?.ongData) {
      dispatch(listCityRequest())
    }
  }, [dispatch, listCityRequest, userData])

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Box
        width="15rem"
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        {data ? (
          <Box
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
                  src={userData?.previewImage || userIsNotFound}
                  sx={{
                    width: '100%',
                    height: '100%',
                    marginTop: '1rem',
                    borderRadius: '100%',
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
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: '1rem',
            gap: '1rem',
          }}
        >
          {!userData?.ongData && city.length && (
            <Select
              variant="outlined"
              sx={{ height: '2.75rem', width: '95%' }}
              value={city}
              onChange={(event) => {
                const { value } = event.target
                dispatch(choiceCity(value.toString()))
                localStorage.setItem('city', `${value}`)
              }}
            >
              {citys.map((item) => {
                return (
                  <MenuItem key={item.label} value={item.label}>
                    {item.label}
                  </MenuItem>
                )
              })}
            </Select>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}
