import { Drawer, Box, Select, MenuItem } from '@mui/material'
import { ListDrawer } from './List'
import { drawerListProps } from '@Interfaces/components/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { actions } from '@Redux/users/slice'
import { NavLinkButton } from '../NavLinkButton'

export function DrawerList({ drawerOpen, toggleDrawer }: drawerListProps) {
  const dispatch = useDispatch()
  const { listCityRequest, choiceCity, logout } = actions

  const userData = useSelector((state: RootState) => state.users.data)
  const { citys, city, isLogged } = useSelector(
    (state: RootState) => state.users,
  )

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
        {isLogged && (
          <NavLinkButton
            onClick={() => {
              dispatch(logout())
            }}
            label="Sair"
            href="/"
            variant="outlined"
          />
        )}
      </Box>
    </Drawer>
  )
}
