import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { actions } from '@Redux/animals/slice'
import { actions as adoptionActions } from '@Redux/adoptions/slice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { FormAnimal } from './UpdateForm'
import { ArrowBack, Delete } from '@mui/icons-material'
import { DeleteAnimalDialog } from './deleteDialog'
import { Helmet } from 'react-helmet-async'
import animalNotFound from '@Images/isNotFound.jpg'
import { toast } from 'react-toastify'
import { TypographyDetail } from '@Components/TypographyDetail'

export function ShowAnimal() {
  const { id } = useLocation().state
  const { showAnimalRequest } = actions
  const { createAdoptionRequests } = adoptionActions

  const { animalData, loading } = useSelector(
    (state: RootState) => state.animals,
  )

  const [dialogIsVisible, setDialogIsVisible] = useState(false)
  const [date, setDate] = useState('')

  function handleChangeVisibleDialog() {
    setDialogIsVisible(!dialogIsVisible)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, isLogged } = useSelector((state: RootState) => state.users)

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

  useEffect(() => {
    if (id) {
      dispatch(showAnimalRequest(id, data?.ongData?.id))
    }
  }, [showAnimalRequest, dispatch, id, data])

  return (
    <Box>
      <Helmet title={`Pet ` + animalData?.name} />

      {dialogIsVisible && animalData && (
        <DeleteAnimalDialog
          id={animalData.id}
          dialogIsVisible={dialogIsVisible}
          setDialogIsVisible={handleChangeVisibleDialog}
          name={animalData.name}
        />
      )}

      <Box
        marginBottom={2}
        display="flex"
        width="100%"
        justifyContent="space-between"
      >
        <Button
          onClick={() => {
            navigate(-1)
          }}
        >
          <ArrowBack fontSize="large" />
        </Button>
        {data?.ongData && (
          <Button color="error" onClick={handleChangeVisibleDialog}>
            <Delete fontSize="large" />
          </Button>
        )}
      </Box>

      {animalData ? (
        <>
          {data?.ongData ? (
            <FormAnimal loading={loading} animalData={animalData} />
          ) : (
            <Grid container spacing={2}>
              <Grid textAlign="center" item sm={12} md={6}>
                <Box
                  component="img"
                  src={animalData?.previewImage || animalNotFound}
                  width="80%"
                  borderRadius={2}
                />
              </Grid>
              <Grid item sm={12} md={6}>
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
                <Button
                  fullWidth
                  sx={{ marginTop: '2rem' }}
                  variant="contained"
                  onClick={handleAdoptionRequest}
                >
                  Solicitar adoção de animal
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <Typography variant="h4" textAlign="center">
          Animal não foi encontrado.
        </Typography>
      )}
    </Box>
  )
}
