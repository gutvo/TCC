import { useEffect, useState } from 'react'
import { RootState } from '@Redux/store'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/ongs/slice'
import { Helmet } from 'react-helmet-async'
import { ListItem } from './ListItem'
import { Loading } from '@Components/Loading'

export function ListOng() {
  const dispatch = useDispatch()
  const { listOngRequest } = actions
  const { data, loading, pagination } = useSelector(
    (state: RootState) => state.ongs,
  )
  const { city } = useSelector((state: RootState) => state.users)

  const [offset, setOffest] = useState(pagination.offset)
  const [limit, setLimit] = useState(pagination.limit)

  useEffect(() => {
    dispatch(listOngRequest(offset, limit, city))
  }, [dispatch, listOngRequest, offset, limit, city])

  return (
    <Box>
      <Helmet title="Lista das Organizações" />

      {loading ? (
        <Loading />
      ) : (
        <>
          {data ? (
            <>
              {data.map((item) => {
                return <ListItem key={item.userData.email} OngData={item} />
              })}
            </>
          ) : (
            <Typography color="red">Nenhuma Ong Encontrada</Typography>
          )}
        </>
      )}
    </Box>
  )
}
