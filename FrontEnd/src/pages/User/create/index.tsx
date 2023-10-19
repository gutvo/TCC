import { Box, Button, Typography, useMediaQuery, Paper } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { UserForm } from './UserForm/index'
import { NewUserFormData } from '@Interfaces/pages/users'
import { useNavigate } from 'react-router-dom'
import { OngForm } from './OngForm'
import { Helmet } from 'react-helmet-async'
import { useTheme } from '@mui/material/styles'

export function SignIn() {
  const { breakpoints, palette } = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const { primary } = palette
  const { createUserRequest } = actions
  const mediaQuerySmall = useMediaQuery(breakpoints.down('sm'))

  function handleAddUser(data: NewUserFormData) {
    dispatch(createUserRequest(data, navigation))
  }

  const [isOng, setIsOng] = useState(false)
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Helmet title="Cadastro de Conta" />
      <Box
        width="45rem"
        paddingY={5}
        marginY={5}
        borderRadius={2}
        component={Paper}
        elevation={5}
      >
        <Typography
          variant={mediaQuerySmall ? 'h4' : 'h3'}
          textAlign="center"
          fontWeight="bold"
        >
          Cadastro de {isOng ? 'Organização' : 'Usuário'}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          marginY={2}
          justifyContent="center"
        >
          <Button
            disabled={!isOng}
            onClick={() => {
              setIsOng(!isOng)
            }}
            sx={{
              width: '8rem',
              ':disabled': {
                color: primary.contrastText,
                backgroundColor: primary.main,
              },
            }}
            variant={!isOng ? 'contained' : 'outlined'}
          >
            Usuário
          </Button>
          <Button
            disabled={isOng}
            onClick={() => {
              setIsOng(!isOng)
            }}
            sx={{
              width: '8rem',
              ':disabled': {
                color: primary.contrastText,
                backgroundColor: primary.main,
              },
            }}
            variant={isOng ? 'contained' : 'outlined'}
          >
            Organização
          </Button>
        </Box>
        {isOng ? (
          <OngForm handleAddUser={handleAddUser} />
        ) : (
          <UserForm handleAddUser={handleAddUser} />
        )}
      </Box>
    </Box>
  )
}
