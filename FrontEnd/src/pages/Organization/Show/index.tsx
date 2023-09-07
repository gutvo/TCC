import { actions } from '@Redux/ongs/slice'
import { RootState } from '@Redux/store'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import imageProfile from '@Images/userNotFound.png'
import Grid from '@mui/material/Unstable_Grid2'
import { StyledTypography } from './StyledTypography'

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
            <Grid container spacing={5}>
              <Grid lg={4}>
                <Box component="img" src={imageProfile} width="100%" />
              </Grid>
              <Grid
                lg={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontSize="1.6rem" fontWeight="bold">
                  {ongData.userData.name}
                </Typography>
              </Grid>

              <Grid
                lg={12}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <StyledTypography label="Rua" value={ongData.road} />

                <StyledTypography label="Bairro" value={ongData.neighborhood} />

                <StyledTypography label="Cidade" value={ongData.city} />

                <StyledTypography
                  label="Email"
                  value={ongData.userData.email}
                />
                <StyledTypography label="Telefone" value="(14) 997918422" />

                <Button
                  variant="contained"
                  onClick={() => navigate('/chat', { state: ongData.id })}
                >
                  Iniciar conversa
                </Button>
              </Grid>
            </Grid>
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
