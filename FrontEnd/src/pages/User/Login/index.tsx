import { Typography, Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { RootState } from '@Redux/store'

interface loginFormData {
  email: string
  password: string
}

const userFormDataSchema = zod.object({
  email: zod.string().email('Precisa ser um email válido'),
  password: zod.string(),
})

type User = zod.infer<typeof userFormDataSchema>

export function Login() {
  const { loading } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  const { loginRequest } = actions
  const navigation = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userFormDataSchema),
  })

  function handleLogin(data: loginFormData) {
    dispatch(loginRequest(data, navigation))
  }

  return (
    <Box>
      <Typography textAlign="center" variant="h3">
        Login
      </Typography>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        onSubmit={handleSubmit(handleLogin)}
      >
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
        <Button disabled={loading} variant="contained" type="submit" fullWidth>
          Logar
        </Button>
      </form>
    </Box>
  )
}
