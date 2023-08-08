import { listItemProps } from '@Interfaces/components/Navbar'
import { ListItemButton, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'

export function ListItem({
  label,
  path,
  toggleDrawer,
  paddinLeft,
}: listItemProps) {
  return (
    <ListItemButton
      sx={{ paddingX: '1.5rem' }}
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
