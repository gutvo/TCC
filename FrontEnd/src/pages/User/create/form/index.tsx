import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInformationsByCEP } from '@Services/othersApis'
import { ChangeEvent } from 'react'
import { CreateUser, newUserFormSchema } from './validations'
import { UserFormProps, ViaCepDTO } from '@Interfaces/pages/users'
import { TextFieldStyled } from '@Components/TextFieldStyled'

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

        {isOng ? (
          <>
            <TextFieldStyled
              errors={errors.ongData?.CEP}
              label="CEP"
              placeholder="Digite o CEP."
              {...register('ongData.CEP', {
                required: true,
                onChange: getInformation,
              })}
            />
            <Box>
              <TextFieldStyled
                errors={errors.ongData?.road}
                label="Rua"
                sx={{ width: '68%', marginRight: '2%' }}
                placeholder="Digite a sua rua."
                {...register('ongData.road', {
                  required: true,
                })}
              />
              <TextFieldStyled
                errors={errors.ongData?.city}
                label="Cidade"
                sx={{ width: '30%' }}
                placeholder="Digite a sua cidade."
                {...register('ongData.city', {
                  required: true,
                })}
              />
            </Box>

            <TextFieldStyled
              errors={errors.ongData?.neighborhood}
              label="Bairro"
              placeholder="Digite o seu bairro."
              {...register('ongData.neighborhood', {
                required: true,
              })}
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
