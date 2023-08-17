import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { RootState } from '@Redux/store'
import { loginFormData } from '@Interfaces/pages/users'
import { LoginUser, loginFormDataSchema } from './validations'
import { TextFieldStyled } from '@Components/TextFieldStyled'
import { Helmet } from 'react-helmet-async'

export function Login() {
  const { loading } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  const { loginRequest } = actions
  const navigation = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginUser>({ resolver: zodResolver(loginFormDataSchema) })

  function handleLogin(data: loginFormData) {
    dispatch(loginRequest(data, navigation))
  }

  return (
    <Box>
      <Helmet title="Login" />

      {/* <Typography textAlign="center" variant="h3">
        Login
      </Typography> */}
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        onSubmit={handleSubmit(handleLogin)}
      >
        <TextFieldStyled
          errors={errors.email}
          color="info"
          label="Email"
          customType="email"
          placeholder="Digite o seu email."
          {...register('email', { required: true })}
        />
        <TextFieldStyled
          errors={errors.password}
          label="Senha"
          placeholder="Digite a sua senha."
          fullWidth
          isPassword
          {...register('password', { required: true })}
        />
        <Button disabled={loading} variant="contained" type="submit" fullWidth>
          {loading ? 'Logando...' : 'Logar'}
        </Button>
      </form>
    </Box>
  )
}
