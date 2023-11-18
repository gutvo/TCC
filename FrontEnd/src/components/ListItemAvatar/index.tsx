import { api } from '@Services/backendApi'
import {
  ListItemAvatar as MuiListItemAvatar,
  Badge,
  Avatar,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import userNotFound from '@Images/userNotFound.png'

interface ListItemAvatarProps {
  countNotifications?: number
  email: string | undefined
  image: string | undefined
}

export function ListItemAvatar({
  countNotifications,
  email,
  image,
}: ListItemAvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | null>('')
  const getUserImage = useCallback(async () => {
    if (image) {
      await api
        .get(`/user/images/${email}`, {
          responseType: 'blob',
        })
        .then((result: { data: Blob }) => {
          setImageUrl(URL.createObjectURL(result.data))
        })
        .catch(() => {
          setImageUrl(null)
        })
    }
  }, [email, image])

  useEffect(() => {
    getUserImage()
  }, [getUserImage])
  return (
    <MuiListItemAvatar>
      <Badge badgeContent={countNotifications} color="error">
        <Avatar src={imageUrl || userNotFound} alt="Avatar" sizes="100%" />
      </Badge>
    </MuiListItemAvatar>
  )
}
