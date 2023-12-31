import { actions } from '@Redux/ongs/slice'
import { RootState } from '@Redux/store'
import {
  Box,
  Button,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import userNotFound from '@Images/userNotFound.png'
import { Loading } from '@Components/Loading'
import { TypographyDetail } from '@Components/TypographyDetail'
import { socket } from '@Functions'
import { roomsProps } from '@Interfaces/redux/chats'
import { ArrowBack, ExpandMore } from '@mui/icons-material'
import { TyphographyNoData } from '@Components/TyphographyNoData'

export function ShowOng() {
  const id = useLocation().state
  const { showOngRequest } = actions
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { breakpoints } = useTheme()

  const midiaQueryDownSm = useMediaQuery(breakpoints.down('sm'))

  const { ongData, loading } = useSelector((state: RootState) => state.ongs)
  const { data } = useSelector((state: RootState) => state.users)

  const [openDescription, setOpenDescription] = useState(false)

  function handleCreateRoom() {
    if (data?.id && ongData?.userData?.id) {
      function createRoom(data: roomsProps) {
        navigate('/chat', { state: { room: data } })
      }

      socket.emit('create.room', {
        userId: data.id,
        ongId: ongData?.userData.id,
      })
      socket.on('create.room', createRoom)

      return () => {
        socket.off('create.room', createRoom)
      }
    }
  }

  function handlePhones() {
    setOpenDescription(!openDescription)
  }
  useEffect(() => {
    if (id) {
      dispatch(showOngRequest(id))
    }
  }, [dispatch, id, showOngRequest])

  return (
    <Box>
      <Helmet title="Instituição"></Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Box
            marginBottom={2}
            display="flex"
            width="100%"
            justifyContent="space-between"
          >
            <Button
              onClick={() => {
                navigate(-1)
              }}
            >
              <ArrowBack fontSize="large" />
            </Button>
          </Box>
          {ongData ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Box
                      component="img"
                      src={ongData.userData.previewImage || userNotFound}
                      width={midiaQueryDownSm ? '25rem' : '17rem'}
                      height={midiaQueryDownSm ? '25rem' : '17rem'}
                      borderRadius="100%"
                    />
                  </Grid>
                  {!midiaQueryDownSm && (
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate('/chat', { state: ongData.id })}
                      >
                        Iniciar conversa
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <TypographyDetail
                      haveBorder
                      width="100%"
                      label="Nome:"
                      value={ongData.userData.name}
                      variant="h6"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TypographyDetail
                      haveBorder
                      label="Rua:"
                      value={ongData.road}
                      variant="h6"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TypographyDetail
                      haveBorder
                      label="Número:"
                      value={ongData.houseNumber}
                      variant="h6"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TypographyDetail
                      haveBorder
                      label="Bairro:"
                      value={ongData.neighborhood}
                      variant="h6"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TypographyDetail
                      haveBorder
                      label="Cidade"
                      value={ongData.city}
                      variant="h6"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TypographyDetail
                      haveBorder
                      label="Email"
                      value={ongData.userData.email}
                      variant="h6"
                    />
                  </Grid>
                  <Grid item xs={12} marginBottom={2}>
                    <Accordion
                      elevation={0}
                      expanded={openDescription}
                      sx={{ border: 'solid 1px #d4d4d4' }}
                      onChange={handlePhones}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography
                          fontWeight="bold"
                          variant="h6"
                          sx={{ flexShrink: 0 }}
                        >
                          Telefones:
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {ongData.userData.phoneData.length ? (
                          <>
                            {ongData.userData.phoneData.map((item, index) => {
                              return (
                                <TypographyDetail
                                  sx={{ marginBottom: 0.5, padding: 0 }}
                                  value={item.phone}
                                  label={`Telefone ${index + 1}:`}
                                  variant="subtitle1"
                                  key={item.id}
                                />
                              )
                            })}
                          </>
                        ) : (
                          <Typography
                            color="red"
                            fontWeight="bold"
                            variant="h6"
                          >
                            Sem Telefones registrados
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  {midiaQueryDownSm && (
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleCreateRoom}
                      >
                        Iniciar conversa
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <TyphographyNoData label="Organização não encontrada." />
          )}
        </Box>
      )}
    </Box>
  )
}
