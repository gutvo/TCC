import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { UserForm } from './UserForm/index'
import { NewUserFormData } from '@Interfaces/pages/users'
import { useNavigate } from 'react-router-dom'
import { OngForm } from './OngForm'

export function SignIn() {
  const { createUserRequest } = actions
  const dispatch = useDispatch()
  const navigation = useNavigate()
  function handleAddUser(data: NewUserFormData) {
    dispatch(createUserRequest(data, navigation))
  }

  const [isOng, setIsOng] = useState(false)
  return (
    <Box>
      <Typography variant="h3" textAlign="center">
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
          sx={{ width: '8rem' }}
          variant="outlined"
        >
          Usuário
        </Button>
        <Button
          disabled={isOng}
          onClick={() => {
            setIsOng(!isOng)
          }}
          sx={{ width: '8rem' }}
          variant="outlined"
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
  )
}
