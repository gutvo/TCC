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
          <NavLink to={`/Animal/${animal.id}`}>
            <Card
              sx={{
                width: '20rem',
                height: '26rem',
                borderRadius: 3,
                ':hover': {
                  transform: 'scale(1.06)',
                  transition: '400ms',
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={'250'}
                  src={
                    animal.image
                      ? `data:image/jpeg;base64,${animal.image}`
                      : isNotFound
                  }
                  alt="Imagem do animal"
                />
                <CardContent sx={{ height: '100%' }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight="bold"
                    component="div"
                  >
                    {animal.name}
                  </Typography>

                  <Typography color="text.secondary">
                    Tipo: {animal.type}
                  </Typography>
                  <Typography color="text.secondary">
                    Raça: {animal.race}
                  </Typography>
                  <Typography color="text.secondary">
                    Sexo: {animal.sex}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </NavLink>
        </Grid>
      ))}
    </Grid>
  )
}
