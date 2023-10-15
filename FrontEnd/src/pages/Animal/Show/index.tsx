import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { actions } from '@Redux/animals/slice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { FormAnimal } from './UpdateForm'
import { ArrowBack, Delete } from '@mui/icons-material'
import { DeleteAnimalDialog } from './deleteDialog'
import { Helmet } from 'react-helmet-async'
import animalNotFound from '@Images/isNotFound.jpg'

export function ShowAnimal() {
  const { id } = useLocation().state
  const { showAnimalRequest } = actions

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

  const data = useSelector((state: RootState) => state.users.data)

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
            <Grid container spacing={1}>
              <Grid textAlign="center" item xs={12} sm={6} lg={4}>
                <Box
                  component="img"
                  src={animalData?.previewImage || animalNotFound}
                  width={'270px'}
                  borderRadius={2}
                  height="200px"
                />
              </Grid>
              <Grid item sm={6}>
                <Typography variant="h5">Nome: {animalData.name}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography>Data de nascimento: {date}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography>Cor: {animalData.color}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography>Descrição: {animalData.description}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography>Raça: {animalData.race}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography>Sexo: {animalData.sex}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography>Tipo: {animalData.type}</Typography>
              </Grid>
              <Button variant="contained">Solicitar adoção de animal</Button>
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
