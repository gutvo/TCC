import isNotFound from '@Images/dog.jpg'
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
    <Grid container spacing={1} justifyContent="center">
      {data.map((animal) => (
        <Grid item key={animal.id}>
          <NavLink to={`/animal`} state={{ id: animal.id }}>
            <Card
              sx={{
                width: '17.4rem',
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
                    animal.image
                      ? `data:image/jpeg;base64,${animal.image}`
                      : isNotFound
                  }
                  alt="Imagem do animal"
                />
                <CardContent sx={{ height: '10.375rem' }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    component="div"
                  >
                    {animal.name}
                  </Typography>
                  {animal.description ? (
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
                      {animal.description}
                    </Typography>
                  ) : (
                    <Typography color="red">Sem descrição</Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </NavLink>
        </Grid>
      ))}
    </Grid>
  )
}
