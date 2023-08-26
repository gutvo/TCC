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
    <Grid container spacing={6} justifyContent="center">
      {data.map((animal) => (
        <Grid item key={animal.id}>
          <NavLink to={`/animal`} state={{ id: animal.id }}>
            <Card
              sx={{
                width: '18rem',
                height: '22rem',
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
                <CardContent sx={{ height: '10.375rem', overflow: 'hidden' }}>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    fontWeight="bold"
                    component="div"
                  >
                    {animal.name}
                  </Typography>
                  {animal.description ? (
                    <Typography>{animal.description}</Typography>
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
