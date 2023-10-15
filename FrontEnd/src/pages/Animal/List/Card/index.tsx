import isNotFound from '@Images/isNotFound.jpg'
import { CardAnimalProps } from '@Interfaces/pages/animals'
import { api } from '@Services/backendApi'
import { CalendarMonth, Pets } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function CardAnimal({ data }: CardAnimalProps) {
  const navigation = useNavigate()
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
      <Card
        sx={{
          width: '17rem',
          height: '20rem',
          borderRadius: 1,
        }}
      >
        <CardMedia
          component="img"
          height="186"
          src={previewImage || isNotFound}
          alt="Imagem do animal"
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">
            Nome: {data.name}
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonth color="primary" sx={{ paddingRight: 1 }} />
            {new Date(data.birthday).toLocaleDateString('pt')}
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <Pets color="primary" sx={{ paddingRight: 1 }} /> {data.race}
          </Typography>

          <CardActionArea sx={{ width: '50%' }}>
            <Button
              onClick={() => navigation('/animal', { state: { id: data.id } })}
              size="small"
            >
              Visualizar animal
            </Button>
          </CardActionArea>
        </CardContent>
      </Card>
    </Grid>
  )
}
