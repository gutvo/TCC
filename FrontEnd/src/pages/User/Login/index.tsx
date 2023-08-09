import { Typography, Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { RootState } from '@Redux/store'
import { loginFormData } from '@Interfaces/pages/users'
import { LoginUser, loginFormDataSchema } from '@Validations/users/login'
import { TextFieldPassword } from '@Components/TextFieldPassword'

export function Login() {
  const { loading } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  const { loginRequest } = actions
  const navigation = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: zodResolver(loginFormDataSchema),
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
          InputLabelProps={{ shrink: true }}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          color="info"
          label="Email"
          type="email"
          placeholder="Digite o seu email."
          fullWidth
          {...register('email', { required: true })}
        />

        <TextFieldPassword
          errors={errors.password}
          label="Senha"
          name="password"
          placeholder="Digite a sua senha"
          register={register}
        />
        <Button disabled={loading} variant="contained" type="submit" fullWidth>
          Logar
        </Button>
      </form>
    </Box>
  )
}
