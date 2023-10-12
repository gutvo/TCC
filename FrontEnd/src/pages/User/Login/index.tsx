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
import { ArrowBack } from '@mui/icons-material'

export function Login() {
  const navigation = useNavigate()
  const { palette, breakpoints } = useTheme()

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
      <Grid item xs={12} md={8}>
        <Button
          onClick={() => navigation(-1)}
          sx={{ marginTop: 1, marginLeft: 1, justifyContent: 'start' }}
        >
          <ArrowBack fontSize="large" />
        </Button>
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
            marginX: mediaQueryMiddle ? 20 : mediaQuerySmall ? 10 : 2,
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
              {/* <Box component={NavLink} to="/cadastro" color="green">
                Não tenho conta?
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          paddingY="2rem"
          height="100%"
          width="100"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          bgcolor={palette.primary.main}
        >
          <Typography
            variant="h4"
            marginBottom={2}
            color={palette.primary.contrastText}
            fontWeight="bold"
          >
            Ainda não se cadastrou?
          </Typography>
          <Button
            color="secondary"
            sx={{ paddingX: '4rem' }}
            variant="contained"
            onClick={() => navigation('/cadastro')}
          >
            Cadastrar-se
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
