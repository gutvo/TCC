import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInformationsByCEP } from '@Services/othersApis'
import { ChangeEvent, useState } from 'react'
import { CreateUser, newUserFormSchema } from '../validations'
import { CreateFormProps, ViaCepDTO } from '@Interfaces/pages/users'
import { TextFieldStyled } from '@Components/TextFieldStyled'
import { useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { NavLink } from 'react-router-dom'

export function OngForm({ handleAddUser }: CreateFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(newUserFormSchema),
  })
  const loading = useSelector((state: RootState) => state.users.loading)

  const [loadingCEP, setLoadingCEP] = useState(false)
  const [CEP, setCEP] = useState<ViaCepDTO | null>()

  async function getInformation(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value } = event.target
    try {
      if (value.length >= 8 && value.length <= 9) {
        setLoadingCEP(true)
        const response: ViaCepDTO = await getInformationsByCEP(value)
        setCEP(response)
        setValue('ongData.road', response.logradouro)
        setValue('ongData.neighborhood', response.bairro)
        setValue('ongData.city', response.localidade)
        setValue('ongData.uf', response.uf)
        setLoadingCEP(false)
      }
      if (value.length === 0) {
        setLoadingCEP(false)
        setCEP(null)
      }
    } catch (error) {}
  }
  return (
    <form
      onSubmit={handleSubmit(handleAddUser)}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
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

      <Box>
        <TextFieldStyled
          loading={loadingCEP}
          errors={errors.ongData?.CEP}
          label="CEP"
          sx={{ marginBottom: '0.25rem' }}
          placeholder="Digite o CEP."
          {...register('ongData.CEP', {
            required: true,
            onChange: getInformation,
          })}
        />
        {CEP ? (
          <Box sx={{ paddingLeft: '0.5rem' }}>
            <Typography>Rua: {CEP.logradouro}</Typography>
            <Typography>Bairro: {CEP.bairro}</Typography>
            <Typography>Cidade: {CEP.localidade}</Typography>
            <Typography>Estado: {CEP.uf}</Typography>
          </Box>
        ) : (
          <Box
            component={NavLink}
            target="_blank"
            sx={{ paddingLeft: '0.25rem' }}
            to="http://www.buscacep.correios.com.br"
          >
            Não sei qual é o meu CEP.
          </Box>
        )}
      </Box>

      <TextFieldStyled
        sx={{ display: 'none' }}
        {...register('ongData.road', {
          required: true,
        })}
      />
      <TextFieldStyled
        sx={{ display: 'none' }}
        {...register('ongData.city', {
          required: true,
        })}
      />
      <TextFieldStyled
        sx={{ display: 'none' }}
        {...register('ongData.uf', {
          required: true,
        })}
      />
      <TextFieldStyled
        sx={{ display: 'none' }}
        {...register('ongData.neighborhood', {
          required: true,
        })}
      />

      <Box>
        <Button
          disabled={loading}
          variant="contained"
          color="success"
          type="submit"
          fullWidth
        >
          {loading ? 'Cadastrando...' : 'Cadastrar-se'}
        </Button>
      </Box>
    </form>
  )
}
