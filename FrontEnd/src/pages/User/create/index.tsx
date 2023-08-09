import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { UserForm } from './form/index'
import { NewUserFormData } from '@Interfaces/pages/users'

export function SignIn() {
  const { createUserRequest } = actions
  const dispatch = useDispatch()

  function handleAddUser(data: NewUserFormData) {
    dispatch(createUserRequest(data))
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
      <UserForm handleAddUser={handleAddUser} isOng={isOng} />
    </Box>
  )
}
