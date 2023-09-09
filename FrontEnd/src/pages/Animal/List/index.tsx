import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/animals/slice'
import { Pagination, Typography, Box, Grid } from '@mui/material'
import { RootState } from '@Redux/store'
import { CardAnimal } from './Card'
import { Helmet } from 'react-helmet-async'
import { Loading } from '@Components/Loading'

export function ListAnimal() {
  const dispatch = useDispatch()
  const { listAnimalRequest } = actions

  const { list, pagination, loading } = useSelector(
    (state: RootState) => state.animals,
  )
  const { data, city } = useSelector((state: RootState) => state.users)

  const [limit] = useState(pagination.limit)
  const [offset, setOffset] = useState(pagination.offset)

  const ongId = data?.ongData ? data.ongData?.id : null
  useEffect(() => {
    dispatch(listAnimalRequest(offset, limit, ongId, city))
  }, [dispatch, limit, offset, listAnimalRequest, ongId, city])

  useEffect(() => {
    if (!list.length && offset) {
      setOffset(offset - limit)
    }
  }, [list, offset, limit])

  return (
    <Box>
      <Helmet title="Lista de Animais" />

      {loading ? (
        <Loading />
      ) : (
        <>
          {list.length ? (
            <Box>
              <Grid container spacing={2} justifyContent="center">
                {list.map((item) => (
                  <CardAnimal key={item.id} data={item} />
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
            <Typography color="error" variant="h3" textAlign="center">
              Nenhum animal foi encontrado.
            </Typography>
          )}
        </>
      )}
    </Box>
  )
}
