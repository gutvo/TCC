import { Drawer, Box } from '@mui/material'
import { ListDrawer } from './List'
import { drawerListProps } from '@Interfaces/components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { actions } from '@Redux/users/slice'
import { NavLinkButton } from '../NavLinkButton'

export function DrawerList({ drawerOpen, toggleDrawer }: drawerListProps) {
  const dispatch = useDispatch()
  const { logout } = actions

  const { isLogged } = useSelector((state: RootState) => state.users)

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
        ></Box>
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
