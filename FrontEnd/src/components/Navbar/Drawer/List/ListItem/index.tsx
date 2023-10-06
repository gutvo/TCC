import { listItemProps } from '@Interfaces/components/Navbar'
import { ListItemButton, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'

export function ListItem({
  label,
  path,
  toggleDrawer,
  paddinLeft,
  Icon,
}: listItemProps) {
  return (
    <ListItemButton
      sx={{ paddingX: '1rem', paddingLeft: paddinLeft ? 2 : 1 }}
      component={NavLink}
      to={path}
      key={label}
      onClick={toggleDrawer}
      divider={true}
    >
      {Icon && (
        <Icon
          color="primary"
          sx={{
            paddingRight: 1,
            fontSize: '2rem',
          }}
        />
      )}
      <ListItemText
        primaryTypographyProps={{
          style: {
            fontSize: '1.25rem',
          },
        }}
        primary={label}
      />
    </ListItemButton>
  )
}
