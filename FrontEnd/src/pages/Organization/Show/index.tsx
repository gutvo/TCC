import { actions } from '@Redux/ongs/slice'
import { RootState } from '@Redux/store'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export function ShowOng() {
  const { showOngRequest } = actions
  const dispatch = useDispatch()
  const id = useLocation().state
  const navigate = useNavigate()

  const { ongData, loading } = useSelector((state: RootState) => state.ongs)

  useEffect(() => {
    if (id) {
      dispatch(showOngRequest(id))
    }
  }, [dispatch, id, showOngRequest])

  return (
    <Box>
      <Helmet title="Instituição"></Helmet>
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
        <Box>
          {ongData ? (
            <Box>
              <Typography>{ongData.userData.name}</Typography>
              <Typography>{ongData.userData.email}</Typography>

              <Typography>{ongData.CEP}</Typography>

              <Typography>{ongData.city}</Typography>

              <Button
                variant="contained"
                onClick={() => navigate('/chat', { state: ongData.id })}
              >
                Iniciar conversa
              </Button>
            </Box>
          ) : (
            <Box textAlign="center">
              <Typography color="red" variant="h4">
                Organização não encontrada
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
