import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { actions } from '@Redux/animals/slice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { FormAnimal } from './UpdateForm'
import { ArrowBack } from '@mui/icons-material'

export function ShowAnimal() {
  const { id } = useLocation().state
  const { showAnimalRequest } = actions

  const { animalData } = useSelector((state: RootState) => state.animals)

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
      <Button
        onClick={() => {
          navigate(-1)
        }}
      >
        <ArrowBack fontSize="large" />
      </Button>
      {animalData ? (
        <>
          {data?.ongData ? (
            <Box>
              <Typography
                sx={{ textAlign: 'center' }}
                variant="h3"
                fontWeight={'bold'}
                marginBottom={2}
              >
                Formulário de cadastro de animais
              </Typography>
              <FormAnimal animalData={animalData} />
            </Box>
          ) : (
            <Box>
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
