import { ListItemButton, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface listItemProps {
  toggleDrawer: () => void
  label: string
  path: string
  paddinLeft?: boolean
}

export function ListItem({
  label,
  path,
  toggleDrawer,
  paddinLeft,
}: listItemProps) {
  return (
    <ListItemButton
      content="button"
      color="primary"
      component={NavLink}
      to={path}
      key={label}
      onClick={toggleDrawer}
      divider={true}
    >
      <ListItemText
        sx={{ paddingLeft: paddinLeft ? 4 : 0 }}
        primaryTypographyProps={{ style: { fontSize: '1.35rem' } }}
        primary={label}
      />
    </ListItemButton>
  )
}
