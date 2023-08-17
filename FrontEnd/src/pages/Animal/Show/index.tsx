import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { actions } from '@Redux/animals/slice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { FormAnimal } from './UpdateForm'
import { ArrowBack, Delete } from '@mui/icons-material'
import { DeleteAnimalDialog } from './deleteDialog'
import { Helmet } from 'react-helmet-async'

export function ShowAnimal() {
  const { id } = useLocation().state
  const { showAnimalRequest } = actions

  const { animalData, loading } = useSelector(
    (state: RootState) => state.animals,
  )

  const [dialogIsVisible, setDialogIsVisible] = useState(false)

  function handleChangeVisibleDialog() {
    setDialogIsVisible(!dialogIsVisible)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state: RootState) => state.users.data)

  useEffect(() => {
    if (id) {
      dispatch(showAnimalRequest(id, data?.ongData?.id))
    }
  }, [showAnimalRequest, dispatch, id, data])
  return (
    <Box>
      <Helmet title={`Pet ` + animalData?.name} />

      {animalData ? (
        <>
          {data?.ongData ? (
            <Box>
              {dialogIsVisible ? (
                <DeleteAnimalDialog
                  id={animalData.id}
                  dialogIsVisible={dialogIsVisible}
                  setDialogIsVisible={handleChangeVisibleDialog}
                  name={animalData.name}
                />
              ) : null}
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
                <Button color="error" onClick={handleChangeVisibleDialog}>
                  <Delete fontSize="large" />
                </Button>
              </Box>

              <Box>
                <FormAnimal loading={loading} animalData={animalData} />
              </Box>
            </Box>
          ) : (
            <Box>
              <Box>
                <Button
                  sx={{ marginBottom: 2 }}
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  <ArrowBack fontSize="large" />
                </Button>
              </Box>
              <Typography variant="h3">Animal:</Typography>
              <Typography>{animalData.id}</Typography>
              <Typography>{animalData.name}</Typography>
            </Box>
          )}
        </>
      ) : (
        <Typography color="error" variant="h3" textAlign="center">
          Animal não foi encontrado.
        </Typography>
      )}
    </Box>
  )
}
