import isNotFound from '@Images/isNotFound.jpg'
import { CardAnimalProps } from '@Interfaces/pages/animals'
import { api } from '@Services/backendApi'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export function CardAnimal({ data }: CardAnimalProps) {
  const [previewImage, setPreviewImage] = useState('')

  const fetchAnimalImage = useCallback(async () => {
    const image: string = await api
      .get(`/animal/images/${data?.id}`, {
        responseType: 'blob',
      })
      .then((response) => {
        return URL.createObjectURL(response.data)
      })

    setPreviewImage(image)
  }, [setPreviewImage, data?.id])

  useEffect(() => {
    if (data?.image) {
      fetchAnimalImage()
    }
  }, [data.image, fetchAnimalImage])
  return (
    <Grid item key={data.id}>
      <NavLink to={`/animal`} state={{ id: data.id }}>
        <Card
          sx={{
            width: '17rem',
            height: '19rem',
            borderRadius: 1,
            margin: 'auto',
            ':hover': {
              transform: 'scale(1.06)',
              transition: '400ms',
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="186"
              src={previewImage || isNotFound}
              alt="Imagem do animal"
            />
            <CardContent sx={{ height: '10.375rem' }}>
              <Typography variant="subtitle1" fontWeight="bold" component="div">
                {data.name}
              </Typography>
              {data.description ? (
                <Typography
                  sx={{
                    height: '100%',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    wordBreak: 'break-all',
                  }}
                >
                  {data.description}
                </Typography>
              ) : (
                <Typography color="red">Sem descrição</Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </NavLink>
    </Grid>
  )
}
