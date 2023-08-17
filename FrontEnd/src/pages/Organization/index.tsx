import { useEffect } from 'react'
import { RootState } from '@Redux/store'
import { Box, Typography, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { Helmet } from 'react-helmet-async'

export function Ong() {
  const dispatch = useDispatch()
  const { listOngRequest } = actions
  const { ongList, loading } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(listOngRequest(0, 2))
  }, [dispatch, listOngRequest])

  return (
    <Box>
      <Helmet title="Lista das Organizações" />

      {loading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {ongList.map((item, index) => {
            return (
              <Box key={index}>
                <Typography>nome:{item.userData.name}</Typography>
              </Box>
            )
          })}
        </>
      )}
    </Box>
  )
}
