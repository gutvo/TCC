// import { UserData } from '@Interfaces/redux/users'
import { SvgIconComponent } from '@mui/icons-material'

// -------------------------------------------
// Drawer

export interface drawerListProps {
  drawerOpen: boolean
  toggleDrawer: () => void
  // data: UserData | null
}

// -------------------------------------------
// List

export interface ListDrawerProps {
  toggleDrawer: () => void
}

// -------------------------------------------
// List Items

export interface listItemProps {
  toggleDrawer: () => void
  label: string
  path: string
  paddinLeft?: boolean
  Icon?: SvgIconComponent
}
