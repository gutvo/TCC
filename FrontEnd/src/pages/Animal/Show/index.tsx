import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { actions } from '@Redux/animals/slice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'

export function ShowAnimal() {
  const { id } = useLocation().state
  const dispatch = useDispatch()
  const { showAnimalRequest } = actions
  const { animalData } = useSelector((state: RootState) => state.animals)
  const data = useSelector((state: RootState) => state.users.data)
  useEffect(() => {
    if (id) {
      dispatch(showAnimalRequest(id, data?.ongData?.id))
    }
  }, [showAnimalRequest, dispatch, id, data])
  return (
    <Box>
      {animalData ? (
        <>
          {data?.ongData ? (
            <Box>
              <Typography variant="h2">Ong</Typography>
              <Typography variant="h3">Animal:</Typography>
              <Typography>{animalData.id}</Typography>
              <Typography>{animalData.name}</Typography>
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
