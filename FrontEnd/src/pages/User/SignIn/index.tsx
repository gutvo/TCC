import { Typography, Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { actions } from '@redux/users/slice'

interface newUserFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const newUserFormValidationSchema = zod
  .object({
    name: zod.string(),
    email: zod.string().email('Precisa ser um email válido'),
    password: zod.string().min(8, 'tem que ter no minímo 8 caracteres'),
    confirmPassword: zod.string().min(8, 'tem que ter no minímo 8 caracteres'),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'As senhas não batem',
    path: ['confirmPassword'],
  })

type User = zod.infer<typeof newUserFormValidationSchema>

export function SignIn() {
  const dispatch = useDispatch()
  const { createUserRequest } = actions

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(newUserFormValidationSchema),
  })

  function handleAddUser(data: newUserFormData) {
    dispatch(createUserRequest(data))
  }

  return (
    <Box>
      <Typography variant="h3" textAlign="center">
        Cadastro
      </Typography>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        onSubmit={handleSubmit(handleAddUser)}
      >
        <TextField
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          color="info"
          label="Nome"
          type="text"
          placeholder="Digite o seu nome."
          fullWidth
          {...register('name', { required: true })}
        />
        <TextField
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          color="info"
          label="Email"
          type="email"
          placeholder="Digite o seu email."
          fullWidth
          {...register('email', { required: true })}
        />
        <TextField
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          color="info"
          label="Senha"
          type="password"
          placeholder="Digite a sua senha."
          fullWidth
          {...register('password', { required: true })}
        />
        <TextField
          error={!!errors.confirmPassword?.message}
          helperText={errors.confirmPassword?.message}
          color="info"
          label="Confirmar senha"
          type="password"
          placeholder="Digite a sua senha novamente."
          fullWidth
          {...register('confirmPassword', { required: true })}
        />
        <Button variant="contained" color="success" type="submit" fullWidth>
          Cadastrar-se
        </Button>
      </form>
    </Box>
  )
}
