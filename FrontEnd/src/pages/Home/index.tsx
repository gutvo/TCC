import { Box, Grid, Typography, useTheme } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { CardHome } from './CardHome'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { useEffect } from 'react'
import { actions } from '@Redux/reports/slice'
import { actions as animalActions } from '@Redux/animals/slice'
import { CardAnimal } from '@Components/CardAnimal'

export function Home() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { getDashboardDataRequest } = actions
  const { listRandomAnimalRequest } = animalActions
  const { palette } = theme

  const name = useSelector((state: RootState) => state.users.data?.name)
  const city = useSelector((state: RootState) => state.users.city)

  const list = useSelector((state: RootState) => state.animals.list)
  const dashboadHomeData = useSelector(
    (state: RootState) => state.reports.dashboadHomeData,
  )

  useEffect(() => {
    dispatch(getDashboardDataRequest())
  }, [dispatch, getDashboardDataRequest])

  useEffect(() => {
    if (city) {
      dispatch(listRandomAnimalRequest(city))
    }
  }, [listRandomAnimalRequest, dispatch, city])
  return (
    <Box>
      <Helmet title="Home" />
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        marginBottom={4}
        color={palette.primary.dark}
      >
        Bem-vindo ao nosso site{' ' + name ? name?.split(' ')[0] : ''}!
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        marginBottom={2}
      >
        Cards
      </Typography>

      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        marginBottom={4}
      >
        <Grid item>
          <CardHome
            value={dashboadHomeData?.countTotalOngs}
            label="Organizações cadastrados"
          />
        </Grid>
        <Grid item>
          <CardHome
            value={dashboadHomeData?.countAvailableAnimals}
            label="Animais disponiveis"
          />
        </Grid>
        <Grid item>
          <CardHome
            value={dashboadHomeData?.countAdoptedAnimals}
            label="Animais adotados"
          />
        </Grid>
        <Grid item>
          <CardHome
            value={dashboadHomeData?.countTotalAnimals}
            label="Animais no total"
          />
        </Grid>
      </Grid>

      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        marginBottom={2}
      >
        Animais
      </Typography>

      <Grid container spacing={2} display="flex" justifyContent="center">
        {list.map((item) => {
          return (
            <Grid item key={item.id}>
              <CardAnimal data={item} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

// const greetingMessages = [
//   `Olá${name ? ', ' + name.split(' ')[0] : ''}! Que bom ter você por aqui.`,
//   `Ei${name ? ', ' + name.split(' ')[0] : ''}, seja bem-vindo ao nosso site.`,
//   `Bem-vindo${
//     name ? ', ' + name.split(' ')[0] : ''
//   }! Esperamos que você goste do que vê.`,
// ]

// const randomGreeting =
//   greetingMessages[Math.floor(Math.random() * greetingMessages.length)]
