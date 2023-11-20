import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import animalNotFound from '@Images/isNotFound.jpg'
import { TypographyDetail } from '@Components/TypographyDetail'
import { useEffect, useState } from 'react'
import { Loading } from '@Components/Loading'
import { AdoptedAnimalData } from '@Interfaces/redux/adoptions'
import { format } from 'date-fns'

interface AnimalDetailProps {
  id: string
  adoptedAnimalData: AdoptedAnimalData
  loading: boolean
}

export function AnimalDetail({
  adoptedAnimalData,
  loading,
}: AnimalDetailProps) {
  const { breakpoints } = useTheme()
  const midiaQueryDownMd = useMediaQuery(breakpoints.down('sm'))
  const midiaQueryDownSm = useMediaQuery(breakpoints.down('md'))
  const { animalData } = adoptedAnimalData
  const [date, setDate] = useState('')
  const [adoptedDate, setAdoptedDate] = useState('')

  useEffect(() => {
    if (animalData) {
      const formatDate = new Date(animalData.birthday).toLocaleDateString('pt')
      setDate(formatDate)

      const formatAdoptedDate = format(
        new Date(animalData.updatedAt),
        "dd/MM/yyyy 'às' HH:mm",
      )
      setAdoptedDate(formatAdoptedDate)
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
              <Typography marginBottom={1} variant="h5" fontWeight="bold">
                Informações do animal:
              </Typography>
              <TypographyDetail
                haveBorder
                label="Nome:"
                variant="h6"
                value={animalData.name}
              />
              <TypographyDetail
                haveBorder
                label="Data de nascimento:"
                variant="h6"
                value={date}
              />
              <TypographyDetail
                haveBorder
                label="Cor:"
                variant="h6"
                value={animalData.color}
              />
              <TypographyDetail
                haveBorder
                label="Raça:"
                variant="h6"
                value={animalData.race}
              />
              <TypographyDetail
                haveBorder
                label="Sexo:"
                variant="h6"
                value={animalData.sex}
              />
              <TypographyDetail
                haveBorder
                label="Tipo:"
                variant="h6"
                value={animalData.type}
              />
              <TypographyDetail
                haveBorder
                label="Adotado em:"
                variant="h6"
                value={adoptedDate}
              />
              <TypographyDetail
                haveBorder
                label="Descrição:"
                variant="h6"
                noDescription={!animalData.description}
                value={
                  animalData.description.length
                    ? animalData.description
                    : 'Sem descrição'
                }
              />
              <Typography
                marginBottom={1}
                marginTop={2}
                variant="h5"
                fontWeight="bold"
              >
                Informações do adotante:
              </Typography>
              <TypographyDetail
                haveBorder
                label="Nome:"
                variant="h6"
                value={adoptedAnimalData.userName}
              />
              <TypographyDetail
                haveBorder
                label="Email:"
                variant="h6"
                value={adoptedAnimalData.userEmail}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}
