import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
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
import { useEffect, useState } from 'react'
import { encryptStorage } from '@Functions'
import loginImage from '@Images/loginImage.jpg'

export function Login() {
  const navigation = useNavigate()
  const { breakpoints } = useTheme()

  const mediaQuerySmall = useMediaQuery(breakpoints.up('sm'))
  const mediaQueryMiddle = useMediaQuery(breakpoints.up('md'))

  const { loading } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  const { loginRequest } = actions

  const [remenber, setRemenber] = useState(true)

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<LoginUser>({ resolver: zodResolver(loginFormDataSchema) })

  function handleLogin(data: loginFormData) {
    dispatch(loginRequest(data, navigation))
    if (remenber) {
      encryptStorage.setItem('remenberData', JSON.stringify(data))
    } else {
      encryptStorage.removeItem('remenberData')
    }
  }

  useEffect(() => {
    const remenberData = encryptStorage.getItem('remenberData')
    if (remenberData) {
      setValue('email', remenberData.email)
      setValue('password', remenberData.password)
    }
  }, [setValue])

  return (
    <Grid container>
      <Helmet title="Login" />
      <Grid item xs={12} md={7}>
        <Box
          component="form"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.5rem',
            paddingX: 2,
            borderRadius: 2,
            marginX: mediaQueryMiddle ? 10 : mediaQuerySmall ? 14 : 2,
          }}
          onSubmit={handleSubmit(handleLogin)}
        >
          <Typography textAlign="center" variant="h3" fontWeight="bold">
            Login
          </Typography>
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
          <Box>
            <Button
              disabled={loading}
              variant="contained"
              type="submit"
              fullWidth
              // sx={{ borderRadius: 2 }}
            >
              {loading ? 'Logando...' : 'Logar'}
            </Button>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={remenber}
                    onChange={() => {
                      setRemenber(!remenber)
                    }}
                    checked={remenber}
                  />
                }
                label="Lembrar de login"
              />
              <Button onClick={() => navigation('/cadastro')} color="primary">
                Não tem uma conta?
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      {mediaQueryMiddle && (
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            alt="Foto de cachorro tirada por Alvan Nee na Unsplash"
            src={loginImage}
            width="100%"
            height="100%"
          />
        </Grid>
      )}
    </Grid>
  )
}
