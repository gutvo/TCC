import { AnimalData } from '@Interfaces/redux/animals'
import { Close } from '@mui/icons-material'
import { Modal, Box, Typography, IconButton, Grid } from '@mui/material'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useTheme } from '@mui/material/styles'
import { api } from '@Services/backendApi'
import ImageNotFound from '@Images/isNotFound.jpg'
import userNotFound from '@Images/userNotFound.png'
import { TypographyDetail } from '@Components/TypographyDetail'

interface DetailModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  type: string
  animalValue: AnimalData | null
  userValue: { id: number; name: string; email: string } | null
}

export function DetailModal({
  setOpen,
  open,
  type,
  animalValue,
  userValue,
}: DetailModalProps) {
  const { palette } = useTheme()
  const { primary } = palette
  function handleClose() {
    setOpen(!open)
  }

  const [imageUrl, setImageUrl] = useState<string | null>('')
  const animalBirthDay = new Date(
    animalValue?.birthday ? animalValue.birthday : '',
  ).toLocaleDateString('pt')
  const fetchAnimalImage = useCallback(async () => {
    try {
      const result: { data: Blob } = await api.get(
        `/${type === 'animal' ? 'animal' : 'user'}/images/${
          type === 'animal' ? animalValue?.id : userValue?.email
        }`,
        {
          responseType: 'blob',
        },
      )
      setImageUrl(URL.createObjectURL(result.data))
    } catch (error) {
      setImageUrl(null)
    }
  }, [userValue?.email, animalValue?.id, type])

  useEffect(() => {
    if (animalValue?.id && userValue?.email) {
      fetchAnimalImage()
    }
  }, [animalValue?.id, fetchAnimalImage, userValue?.email])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 1,
        }}
      >
        <Box display="flex" justifyContent="flex-end" bgcolor={primary.main}>
          <IconButton onClick={handleClose}>
            <Close sx={{ color: '#ffffff' }} />
          </IconButton>
        </Box>
        <Box sx={{ paddingX: 2, paddingBottom: 2 }}>
          <Typography
            variant="h6"
            marginTop={1}
            marginBottom={1}
            textAlign="center"
            fontWeight="bold"
          >
            {type === 'animal' ? 'Dados do animal' : 'Dados do usuário'}
          </Typography>
          {type === 'animal' ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={imageUrl || ImageNotFound}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    opacity: 1,
                    transition: 'opacity 5s ease-in',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TypographyDetail
                  haveBorder
                  label="Nome:"
                  value={animalValue?.name}
                />
                <TypographyDetail
                  haveBorder
                  label="Raça:"
                  value={animalValue?.race}
                />
                <TypographyDetail
                  haveBorder
                  label="Nascimento:"
                  value={animalBirthDay || animalValue?.birthday}
                />
                <TypographyDetail
                  haveBorder
                  label="Color:"
                  value={animalValue?.color}
                />
                <TypographyDetail
                  haveBorder
                  label="Sexo:"
                  value={animalValue?.sex}
                />
                <TypographyDetail
                  haveBorder
                  label="Tipo:"
                  value={animalValue?.type}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} justifyContent="center" display="flex">
                <Box
                  component="img"
                  src={imageUrl || userNotFound}
                  sx={{ width: '200px', height: '200px', borderRadius: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TypographyDetail
                  haveBorder
                  label="Nome:"
                  value={userValue?.name}
                />
                <TypographyDetail
                  haveBorder
                  label="Email:"
                  value={userValue?.email}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
