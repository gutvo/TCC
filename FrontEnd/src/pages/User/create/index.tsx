import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { NewUserFormData, UserForm } from './form/index'

export function SignIn() {
  const dispatch = useDispatch()
  const { createUserRequest } = actions

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
          color="secondary"
          onClick={() => {
            setIsOng(!isOng)
          }}
          sx={{ width: '8rem' }}
          variant="outlined"
        >
          Usuário
        </Button>
        <Button
          color="secondary"
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
