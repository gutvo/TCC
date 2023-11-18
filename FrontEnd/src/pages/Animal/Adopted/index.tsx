import { actions } from '@Redux/adoptions/slice'
import { RootState } from '@Redux/store'
import { Box, Grid, Pagination, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Loading } from '@Components/Loading'
import { CardAnimal } from '@Components/CardAnimal'
import { Filter } from './Filter'
import { animalFilterProps } from '@Interfaces/redux/adoptions'

export function AdoptedAnimal() {
  const { listAdoptedAnimalsRequest } = actions
  const disptach = useDispatch()

  const { data } = useSelector((state: RootState) => state.users)
  const { loading, adoptedAnimalList, pagination, filter } = useSelector(
    (state: RootState) => state.adoptions,
  )
  const [limit] = useState(pagination.limit)
  const [offset, setOffset] = useState(pagination.offset)
  const [animalFilter, setAnimalFilter] = useState<animalFilterProps>(filter)

  useEffect(() => {
    if (data?.ongData?.id) {
      disptach(
        listAdoptedAnimalsRequest(data.ongData.id, offset, limit, animalFilter),
      )
    }
  }, [
    data?.ongData?.id,
    offset,
    limit,
    listAdoptedAnimalsRequest,
    disptach,
    animalFilter,
  ])
  return (
    <Box>
      <Helmet title="Animais Adotados" />
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        marginBottom={4}
      >
        Lista de animais adotados
      </Typography>
      <Filter setAnimalFilter={setAnimalFilter} />

      {loading ? (
        <Loading />
      ) : (
        <>
          {adoptedAnimalList.length ? (
            <Box>
              <Grid
                container
                minHeight="58vh"
                spacing={5}
                justifyContent="center"
              >
                {adoptedAnimalList.map((item) => (
                  <CardAnimal
                    navigatePath="/animal/adotado"
                    key={item.id}
                    data={item.animalData}
                    id={item.id}
                  />
                ))}
              </Grid>
              <Pagination
                boundaryCount={1}
                sx={{
                  display: 'flex',
                  height: '100%',
                  justifyContent: 'center',
                  paddingTop: 4,
                }}
                page={Math.ceil(offset / limit) + 1}
                color="secondary"
                count={Math.ceil(pagination.count / limit)}
                shape="rounded"
                variant="outlined"
                size="large"
                onChange={(_, value) => {
                  setOffset(value * limit - limit)
                }}
              />
            </Box>
          ) : (
            <Typography
              display="flex"
              alignItems="center"
              height="100vh"
              variant="h3"
              textAlign="center"
              justifyContent="center"
            >
              Nenhum animal foi encontrado.
            </Typography>
          )}
        </>
      )}
    </Box>
  )
}
