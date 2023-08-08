import { Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInformationsByCEP } from '@Services/othersApis'
import { ChangeEvent } from 'react'
import { UserFormProps, ViaCepDTO } from '@Interfaces/pages/users'
import { CreateUser, newUserFormSchema } from '@Validations/users/create'

export function UserForm({ handleAddUser, isOng }: UserFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(newUserFormSchema),
  })

  async function getInformation(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value } = event.target
    try {
      if (value.length >= 8 && value.length <= 9) {
        const response: ViaCepDTO = await getInformationsByCEP(value)
        setValue('ongData.road', response.logradouro)
        setValue('ongData.neighborhood', response.bairro)
        setValue('ongData.city', response.localidade)
      }
    } catch (error) {}
  }
  return (
    <Box>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        onSubmit={handleSubmit(handleAddUser)}
      >
        <TextField
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          InputLabelProps={{ shrink: true }}
          color="info"
          label="Nome"
          type="text"
          placeholder="Digite o seu nome."
          fullWidth
          {...register('name', { required: true })}
        />
        <TextField
          error={!!errors.email?.message}
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
          helperText={errors.password?.message}
          color="info"
          label="Senha"
          type="password"
          placeholder="Digite o sua Senha."
          fullWidth
          {...register('password', { required: true })}
        />
        <TextField
          error={!!errors.confirmPassword?.message}
          InputLabelProps={{ shrink: true }}
          helperText={errors.confirmPassword?.message}
          color="info"
          label="Confirmação de senha"
          type="password"
          placeholder="Digite novamente a sua senha."
          fullWidth
          {...register('confirmPassword', { required: true })}
        />
        {isOng ? (
          <>
            <TextField
              error={!!errors.ongData?.CEP?.message}
              InputLabelProps={{ shrink: true }}
              helperText={errors.ongData?.CEP?.message}
              color="info"
              label="CEP"
              type="text"
              placeholder="Digite a cidade."
              {...register('ongData.CEP', {
                required: true,
                onChange: getInformation,
              })}
            />
            <Box>
              <TextField
                error={!!errors.ongData?.city?.message}
                InputLabelProps={{ shrink: true }}
                helperText={errors.ongData?.road?.message}
                color="info"
                label="Rua"
                type="text"
                sx={{ width: '68%', marginRight: '2%' }}
                placeholder="Digite a rua."
                {...register('ongData.road', {
                  required: true,
                })}
              />
              <TextField
                error={!!errors.ongData?.city?.message}
                InputLabelProps={{ shrink: true }}
                helperText={errors.ongData?.city?.message}
                color="info"
                label="Cidade"
                sx={{ width: '30%' }}
                type="text"
                placeholder="Digite a cidade."
                {...register('ongData.city', { required: true })}
              />
            </Box>
            <TextField
              error={!!errors.ongData?.neighborhood?.message}
              InputLabelProps={{ shrink: true }}
              helperText={errors.ongData?.neighborhood?.message}
              color="info"
              label="Bairro"
              type="text"
              placeholder="Digite o bairro."
              {...register('ongData.neighborhood', { required: true })}
            />
          </>
        ) : (
          <input
            style={{ display: 'none' }}
            {...register('ongData', { required: true, value: null })}
          />
        )}

        <Box>
          <Button variant="contained" color="success" type="submit" fullWidth>
            Cadastrar-se
          </Button>
        </Box>
      </form>
    </Box>
  )
}
