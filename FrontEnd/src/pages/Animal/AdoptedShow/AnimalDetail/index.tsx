import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import animalNotFound from '@Images/isNotFound.jpg'
import { TypographyDetail } from '@Components/TypographyDetail'
import { useEffect, useState } from 'react'
import { AnimalData } from '@Interfaces/redux/animals'
import { Loading } from '@Components/Loading'

interface AnimalDetailProps {
  id: string
  animalData: AnimalData
  loading: boolean
}

export function AnimalDetail({ animalData, loading }: AnimalDetailProps) {
  const { breakpoints } = useTheme()
  const midiaQueryDownMd = useMediaQuery(breakpoints.down('sm'))
  const midiaQueryDownSm = useMediaQuery(breakpoints.down('md'))

  const [date, setDate] = useState('')

  useEffect(() => {
    if (animalData) {
      const date = new Date(animalData.birthday).toLocaleDateString('pt')
      setDate(date)
    }
  }, [animalData])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          <Grid textAlign="center" item xs={12} md={6}>
            <Box
              component="img"
              src={animalData?.previewImage || animalNotFound}
              width="80%"
              borderRadius={2}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box marginLeft={midiaQueryDownMd ? 7 : midiaQueryDownSm ? 10 : 0}>
              <TypographyDetail
                label="Nome:"
                variant="h6"
                value={animalData.name}
              />
              <TypographyDetail
                label="Data de nascimento:"
                variant="h6"
                value={date}
              />
              <TypographyDetail
                label="Cor:"
                variant="h6"
                value={animalData.color}
              />
              <TypographyDetail
                label="Raça:"
                variant="h6"
                value={animalData.race}
              />
              <TypographyDetail
                label="Sexo:"
                variant="h6"
                value={animalData.sex}
              />
              <TypographyDetail
                label="Tipo:"
                variant="h6"
                value={animalData.type}
              />
              <TypographyDetail
                label="Descrição:"
                variant="h6"
                value={animalData.description}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}
