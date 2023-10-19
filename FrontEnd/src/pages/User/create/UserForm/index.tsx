import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUser, newUserFormSchema } from '../validations'
import { CreateFormProps } from '@Interfaces/pages/users'
import { TextFieldStyled } from '@Components/TextFieldStyled'
import { useSelector } from 'react-redux'
import { RootState } from '@Redux/store'

export function UserForm({ handleAddUser }: CreateFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(newUserFormSchema),
  })
  const loading = useSelector((state: RootState) => state.users.loading)

  return (
    <Box>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingX: 4,
        }}
        onSubmit={handleSubmit(handleAddUser)}
      >
        <TextFieldStyled
          errors={errors.name}
          label="Nome"
          placeholder="Digite o seu nome."
          {...register('name', { required: true })}
        />
        <TextFieldStyled
          errors={errors.email}
          label="Email"
          customType="email"
          placeholder="Digite o seu email."
          {...register('email', { required: true })}
        />

        <TextFieldStyled
          errors={errors.password}
          label="Senha"
          customType="password"
          isPassword
          placeholder="Digite a sua senha."
          {...register('password', { required: true })}
        />

        <TextFieldStyled
          errors={errors.confirmPassword}
          label="Confirmação de senha"
          customType="password"
          isPassword
          placeholder="Digite novamente a sua senha."
          {...register('confirmPassword', { required: true })}
        />
        <input
          style={{ display: 'none' }}
          {...register('ongData', { required: true, value: null })}
        />

        <Box>
          <Button
            disabled={loading}
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            sx={{ marginBottom: 1 }}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar-se'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
