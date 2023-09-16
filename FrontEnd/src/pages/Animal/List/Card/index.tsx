import isNotFound from '@Images/isNotFound.jpg'
import { CardAnimalProps } from '@Interfaces/pages/animals'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'

export function CardAnimal({ data }: CardAnimalProps) {
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
              src={
                data.image
                  ? `data:image/jpeg;base64,${data.previewImage}`
                  : isNotFound
              }
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
