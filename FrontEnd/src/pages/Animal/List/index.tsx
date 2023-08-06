import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/animals/slice'
import { Pagination, Typography, CircularProgress, Box } from '@mui/material'
import { RootState } from '@Redux/store'
import { CardAnimal } from './Card'

export default function ListAnimal() {
  const dispatch = useDispatch()
  const { listAnimalRequest } = actions
  const { list, pagination, loading } = useSelector(
    (state: RootState) => state.animals,
  )
  const { data } = useSelector((state: RootState) => state.users)

  const [limit] = useState(4)
  const [offset, setOffset] = useState(0)
  const ongId = (data && data.ongData?.id) || null
  useEffect(() => {
    dispatch(listAnimalRequest(offset, limit, ongId))
  }, [dispatch, limit, offset, listAnimalRequest, ongId])
  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color="error" size={'10rem'} />
        </Box>
      ) : (
        <>
          {list.length ? (
            <Box>
              <CardAnimal data={list} />
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
            <Typography>Nenhum animal foi encontrado</Typography>
          )}
        </>
      )}
    </Box>
  )
}
