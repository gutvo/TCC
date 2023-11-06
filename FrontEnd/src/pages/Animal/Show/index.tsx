import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { FormAnimal } from './UpdateForm'
import { ArrowBack, Delete } from '@mui/icons-material'
import { DeleteAnimalDialog } from './DeleteDialog'
import { Helmet } from 'react-helmet-async'
import { AnimalDetail } from './AnimalDetail'
import { actions } from '@Redux/animals/slice'

export function ShowAnimal() {
  const { id } = useLocation().state
  const { showAnimalRequest } = actions
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { animalData, loading } = useSelector(
    (state: RootState) => state.animals,
  )
  const { data } = useSelector((state: RootState) => state.users)

  const [dialogIsVisible, setDialogIsVisible] = useState(false)

  function handleChangeVisibleDialog() {
    setDialogIsVisible(!dialogIsVisible)
  }

  useEffect(() => {
    if (id) {
      dispatch(showAnimalRequest(id))
    }
  }, [showAnimalRequest, dispatch, id])

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
            <AnimalDetail loading={loading} id={id} animalData={animalData} />
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
