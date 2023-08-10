import { UserData } from '@Interfaces/redux/users'

// Navbar

export interface NavbarProps {
  handleThemeChange: () => void
  theme: boolean
}

// -------------------------------------------
// Drawer

export interface drawerListProps {
  drawerOpen: boolean
  toggleDrawer: () => void
  handleThemeChange: () => void
  theme: boolean
  data: UserData | null
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
}
