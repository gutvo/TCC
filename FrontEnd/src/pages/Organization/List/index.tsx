import { useEffect, useState } from 'react'
import { RootState } from '@Redux/store'
import { Box, Typography, Pagination } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/ongs/slice'

import { Helmet } from 'react-helmet-async'
import { ListItem } from './ListItem'
import { Loading } from '@Components/Loading'
import { Filter } from './Filter'
import { OngFilter } from '@Interfaces/redux/ongs'

export function ListOng() {
  const dispatch = useDispatch()
  const { listOngRequest } = actions

  const {
    data,
    loading,
    pagination,
    filter: ongFilter,
  } = useSelector((state: RootState) => state.ongs)

  const { city } = useSelector((state: RootState) => state.users)

  const [offset, setOffset] = useState(pagination.offset)
  const [limit] = useState(pagination.limit)
  const [filter, setFilter] = useState<OngFilter>(ongFilter)

  useEffect(() => {
    dispatch(listOngRequest(offset, limit, city, filter))
  }, [dispatch, listOngRequest, offset, limit, city, filter])

  return (
    <Box>
      <Helmet title="Lista das Organizações" />

      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        marginBottom={4}
      >
        Lista das Organizações
      </Typography>

      <Filter setOngFilter={setFilter} />

      {loading ? (
        <Loading />
      ) : (
        <>
          {data ? (
            <>
              <Box sx={{ minHeight: '58vh' }}>
                {data.map((item) => {
                  return <ListItem key={item.userData.email} OngData={item} />
                })}
              </Box>

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
            <Typography color="red">Nenhuma Ong Encontrada</Typography>
          )}
        </>
      )}
    </Box>
  )
}
