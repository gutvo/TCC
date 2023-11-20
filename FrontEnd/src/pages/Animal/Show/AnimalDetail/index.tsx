import { RootState } from '@Redux/store'
import {
  Box,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import animalNotFound from '@Images/isNotFound.jpg'
import { toast } from 'react-toastify'
import { TypographyDetail } from '@Components/TypographyDetail'
import { useEffect, useState } from 'react'
import { actions as adoptionActions } from '@Redux/adoptions/slice'
import { useNavigate } from 'react-router-dom'
import { AnimalData } from '@Interfaces/redux/animals'
import { Socket } from 'socket.io-client'
import { ExpandMore } from '@mui/icons-material'
import { roomsProps } from '@Interfaces/redux/chats'

interface AnimalDetailProps {
  id: string
  animalData: AnimalData
  loading: boolean
  socket: Socket
}

export function AnimalDetail({
  animalData,
  loading,
  socket,
}: AnimalDetailProps) {
  const { breakpoints } = useTheme()

  const midiaQueryUpMd = useMediaQuery(breakpoints.up('md'))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { createAdoptionRequests } = adoptionActions
  const { data, isLogged } = useSelector((state: RootState) => state.users)

  const [date, setDate] = useState('')
  const [openDescription, setOpenDescription] = useState(false)

  function handleCreateRoom() {
    socket.emit('create.room', {
      userId: data?.id,
      ongId: animalData.ongData?.userData.id,
    })

    function createRoom(data: roomsProps) {
      navigate('/chat', { state: { room: data } })
    }

    socket.on('create.room', createRoom)

    return () => {
      socket.off('create.room', createRoom)
    }
  }

  function handleAdoptionRequest() {
    if (!isLogged) {
      navigate('/login')
      toast.info('Logue para solicitar adoção')
    }
    if (data?.id && animalData?.id && animalData?.ongId)
      dispatch(createAdoptionRequests(data.id, animalData.id, animalData.ongId))
  }

  useEffect(() => {
    if (animalData) {
      const date = new Date(animalData.birthday).toLocaleDateString('pt')
      setDate(date)
    }
  }, [animalData])

  function handleDescription() {
    setOpenDescription(!openDescription)
  }

  return (
    <Grid container spacing={midiaQueryUpMd ? 1 : 2}>
      <Grid textAlign="center" item xs={12} md={6}>
        <Box
          component="img"
          src={animalData?.previewImage || animalNotFound}
          width="25rem"
          height="17rem"
          borderRadius={2}
        />
        {midiaQueryUpMd && (
          <Grid container marginTop={1} spacing={1}>
            <Grid item xs={6}>
              <Button
                fullWidth
                sx={{ width: '90%' }}
                variant="contained"
                disabled={loading}
                onClick={handleAdoptionRequest}
              >
                {loading ? 'Solicitando...' : 'Solicitar adoção de animal'}
              </Button>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                sx={{ width: '90%' }}
                disabled={loading}
                onClick={handleCreateRoom}
              >
                Conversar com Organização
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} md={6}>
        <Box>
          <TypographyDetail
            haveBorder
            label="Nome:"
            variant="h6"
            value={animalData.name}
          />
          <TypographyDetail
            haveBorder
            label="Data de nascimento:"
            variant="h6"
            value={date}
          />
          <TypographyDetail
            haveBorder
            label="Cor:"
            variant="h6"
            value={animalData.color}
          />
          <TypographyDetail
            haveBorder
            label="Raça:"
            variant="h6"
            value={animalData.race}
          />
          <TypographyDetail
            haveBorder
            label="Sexo:"
            variant="h6"
            value={animalData.sex}
          />
          <TypographyDetail
            haveBorder
            label="Tipo:"
            variant="h6"
            value={animalData.type}
          />
          <Accordion
            elevation={0}
            expanded={openDescription}
            sx={{ border: 'solid 1px #d4d4d4' }}
            onChange={handleDescription}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" variant="h6" sx={{ flexShrink: 0 }}>
                Descrição:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {animalData.description.length ? (
                <Typography>{animalData.description}</Typography>
              ) : (
                <Typography color="red" fontWeight="bold" variant="h6">
                  Sem descrição
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
      {!midiaQueryUpMd && (
        <Grid item xs={12} display="flex" justifyContent="center">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={handleAdoptionRequest}
              >
                {loading ? 'Solicitando...' : 'Solicitar adoção de animal'}
              </Button>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                disabled={loading}
                onClick={handleCreateRoom}
              >
                Conversar com Organização
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
