import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/animals/slice'
// import { actions as userActions } from '@Redux/users/slice'

import { Pagination, Typography, Box, Grid } from '@mui/material'
import { RootState } from '@Redux/store'
import { CardAnimal } from '@Components/CardAnimal'
import { Helmet } from 'react-helmet-async'
import { Loading } from '@Components/Loading'
import { animalFilterProps } from '@Interfaces/redux/animals'
import { Filter } from './Filter'
import { TyphographyNoData } from '@Components/TyphographyNoData'

export function ListAnimal() {
  const dispatch = useDispatch()
  const { listAnimalRequest } = actions

  const { list, pagination, loading } = useSelector(
    (state: RootState) => state.animals,
  )

  const { data, city } = useSelector((state: RootState) => state.users)
  const { filter } = useSelector((state: RootState) => state.animals)

  const [limit] = useState(pagination.limit)
  const [offset, setOffset] = useState(pagination.offset)
  const [animalFilter, setAnimalFilter] = useState<animalFilterProps>(filter)

  const ongId = data?.ongData ? data.ongData?.id : null

  useEffect(() => {
    dispatch(listAnimalRequest(offset, limit, ongId, city, animalFilter))
  }, [dispatch, limit, offset, listAnimalRequest, ongId, city, animalFilter])

  useEffect(() => {
    if (!list.length && offset) {
      setOffset(offset - limit)
    }
  }, [list, offset, limit])

  return (
    <Box>
      <Helmet title="Lista de Animais" />
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        marginBottom={4}
      >
        Lista de animais
      </Typography>
      <Filter setAnimalFilter={setAnimalFilter} />

      {loading ? (
        <Loading />
      ) : (
        <>
          {list.length ? (
            <>
              <Grid
                container
                minHeight="58vh"
                spacing={5}
                justifyContent="center"
              >
                {list.map((item) => (
                  <CardAnimal
                    navigatePath="/animal"
                    key={item.id}
                    data={item}
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
            </>
          ) : (
            <TyphographyNoData label="Nenhum animal foi encontrado." />
          )}
        </>
      )}
    </Box>
  )
}
