import { userOngData } from '@Interfaces/redux/ongs'
import {
  ListItem as ListItemMui,
  ListItemText,
  Typography,
} from '@mui/material'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListItemAvatar } from '@Components/ListItemAvatar'

interface ListOngProps {
  OngData: userOngData
}

export function ListItem({ OngData }: ListOngProps) {
  const navigation = useNavigate()

  return (
    <ListItemMui
      alignItems="flex-start"
      sx={{ cursor: 'pointer', ':hover': { background: '#d4d4d4' } }}
      onClick={() => navigation('/ong', { state: OngData.id })}
    >
      <ListItemAvatar
        email={OngData.userData.email}
        image={OngData.userData.image}
      />
      <ListItemText
        primary={OngData.userData.name}
        secondary={
          <Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Rua: {OngData.road} - Número: {OngData.houseNumber} - Bairro:{' '}
              {OngData.neighborhood}
            </Typography>
          </Fragment>
        }
      />
    </ListItemMui>
  )
}
