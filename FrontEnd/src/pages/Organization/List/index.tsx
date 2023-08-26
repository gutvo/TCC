import { useEffect } from 'react'
import { RootState } from '@Redux/store'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/ongs/slice'
import { Helmet } from 'react-helmet-async'
import { List } from './ListItem'

export function ListOng() {
  const dispatch = useDispatch()
  const { listOngRequest } = actions
  const { data, loading } = useSelector((state: RootState) => state.ongs)

  useEffect(() => {
    dispatch(listOngRequest(0, 2))
  }, [dispatch, listOngRequest])

  return (
    <Box>
      <Helmet title="Lista das Organizações" />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {data ? (
            <>
              {data.map((item) => {
                return <List key={item.userData.email} OngData={item} />
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
