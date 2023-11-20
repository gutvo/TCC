import { Box, Grid, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { useEffect } from 'react'
import { actions } from '@Redux/reports/slice'
import { actions as animalActions } from '@Redux/animals/slice'
import { CardAnimal } from '@Components/CardAnimal'
import { Kpi } from './Kpi'
import { firstName } from '@Functions'

export function Home() {
  const dispatch = useDispatch()
  const { getDashboardDataRequest } = actions
  const { listRandomAnimalRequest } = animalActions

  const name = useSelector((state: RootState) => state.users.data?.name)
  const city = useSelector((state: RootState) => state.users.city)

  const list = useSelector((state: RootState) => state.animals.list)

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
      >
        Bem-vindo ao site{name ? ' ' + firstName(name) : ''}!
      </Typography>

      <Kpi />

      <Typography
        variant="h4"
        fontWeight="bold"
        // textAlign="center"
        marginBottom={2}
      >
        Animais
      </Typography>

      <Grid container spacing={2} display="flex" justifyContent="center">
        {list.map((item) => {
          return (
            <Grid item key={item.id}>
              <CardAnimal id={item.id} navigatePath="/animal" data={item} />
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
