import { userOngData } from '@Interfaces/redux/users'
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

interface ListOngProps {
  OngData: userOngData
}

export function List({ OngData }: ListOngProps) {
  const navigation = useNavigate()
  return (
    <>
      <Divider />
      <ListItem
        alignItems="flex-start"
        sx={{ cursor: 'pointer', ':hover': { background: '#d4d4d4' } }}
        onClick={() => navigation('/ong', { state: OngData.id })}
      >
        <ListItemAvatar>
          <Avatar alt="Avatar" sizes="100%" />
        </ListItemAvatar>
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
                {OngData.road}
              </Typography>
            </Fragment>
          }
        />
      </ListItem>
      <Divider />
    </>
  )
}
