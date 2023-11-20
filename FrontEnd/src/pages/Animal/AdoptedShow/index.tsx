import { Box, Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { ArrowBack } from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'
import { AnimalDetail } from './AnimalDetail'
import { actions } from '@Redux/adoptions/slice'
import { TyphographyNoData } from '@Components/TyphographyNoData'

export function AdoptedAnimalShow() {
  const { id } = useLocation().state
  const { showAdoptedAnimalRequest } = actions
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { animalData, loading } = useSelector(
    (state: RootState) => state.adoptions,
  )

  useEffect(() => {
    if (id) {
      dispatch(showAdoptedAnimalRequest(id))
    }
  }, [showAdoptedAnimalRequest, dispatch, id])

  return (
    <Box>
      <Helmet title={`Pet ${animalData?.animalData.name}`} />

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
      </Box>

      {animalData ? (
        <AnimalDetail
          loading={loading}
          id={id}
          adoptedAnimalData={animalData}
        />
      ) : (
        <TyphographyNoData label="Animal não foi encontrado." />
      )}
    </Box>
  )
}
