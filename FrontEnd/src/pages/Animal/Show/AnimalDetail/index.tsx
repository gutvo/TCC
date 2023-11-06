import { RootState } from '@Redux/store'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import animalNotFound from '@Images/isNotFound.jpg'
import { toast } from 'react-toastify'
import { TypographyDetail } from '@Components/TypographyDetail'
import { useEffect, useState } from 'react'
import { actions as adoptionActions } from '@Redux/adoptions/slice'
import { useNavigate } from 'react-router-dom'
import { AnimalData } from '@Interfaces/redux/animals'

interface AnimalDetailProps {
  id: string
  animalData: AnimalData
  loading: boolean
}

export function AnimalDetail({ animalData, loading }: AnimalDetailProps) {
  const { breakpoints } = useTheme()
  const midiaQueryDownMd = useMediaQuery(breakpoints.down('sm'))
  const midiaQueryDownSm = useMediaQuery(breakpoints.down('md'))
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { createAdoptionRequests } = adoptionActions
  const { data, isLogged } = useSelector((state: RootState) => state.users)

  const [date, setDate] = useState('')

  function handleAdoptionRequest() {
    if (!isLogged) {
      navigate('/login')
      toast.info('Logue para solicitar adoção')
    }
    if (data?.id && animalData?.id && animalData?.ongId)
      dispatch(createAdoptionRequests(data.id, animalData.id, animalData.ongId))
  }

  useEffect(() => {
    if (animalData) {
      const date = new Date(animalData.birthday).toLocaleDateString('pt')
      setDate(date)
    }
  }, [animalData])

  return (
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
          <TypographyDetail label="Sexo:" variant="h6" value={animalData.sex} />
          <TypographyDetail
            label="Tipo:"
            variant="h6"
            value={animalData.type}
          />
          <TypographyDetail
            label="Descrição:"
            variant="h6"
            noDescription={!animalData.description}
            value={
              animalData.description.length
                ? animalData.description
                : 'Sem descrição'
            }
          />
        </Box>
        <Button
          fullWidth
          sx={{ marginTop: '2rem' }}
          variant="contained"
          disabled={loading}
          onClick={handleAdoptionRequest}
        >
          {loading ? 'Solicitando...' : 'Solicitar adoção de animal'}
        </Button>
      </Grid>
    </Grid>
  )
}
