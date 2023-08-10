import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInformationsByCEP } from '@Services/othersApis'
import { ChangeEvent, useEffect } from 'react'
import { ProfileFormProps, ViaCepDTO } from '@Interfaces/pages/users'
import { UserUpdate, updateUserFormSchema } from './validations'
import { TextFieldStyled } from '@Components/TextFieldStyled'

export function ProfileForm({
  data,
  handleUpdateUser,
  editable,
  setEditable,
}: ProfileFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: zodResolver(updateUserFormSchema),
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

  useEffect(() => {
    setValue('name', data.name)
    setValue('email', data.email)
    setValue('ongData', data.ongData)
  }, [setValue, data])

  return (
    <Box>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        onSubmit={handleSubmit(handleUpdateUser)}
      >
        <TextFieldStyled
          errors={errors.name}
          label="Nome"
          placeholder="Digite o seu nome."
          {...register('name', { required: true })}
          disabled={!editable}
        />

        <TextFieldStyled
          errors={errors.email}
          label="Email"
          disabled={!editable}
          customType="email"
          placeholder="Digite o seu email."
          {...register('email', { required: true })}
        />

        {data.ongData ? (
          <>
            <TextFieldStyled
              disabled={!editable}
              errors={errors.ongData?.CEP}
              label="CEP"
              placeholder="Digite o seu CEP."
              {...register('ongData.CEP', {
                required: true,
                onChange: getInformation,
              })}
            />
            <Box>
              <TextFieldStyled
                disabled={!editable}
                errors={errors.ongData?.road}
                label="Rua"
                sx={{ width: '68%', marginRight: '2%' }}
                placeholder="Digite a sua rua."
                {...register('ongData.road', {
                  required: true,
                })}
              />
              <TextFieldStyled
                disabled={!editable}
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
              disabled={!editable}
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
        {editable ? (
          <Box>
            <Button
              sx={{ width: '48%', marginRight: '4%' }}
              variant="contained"
              color="success"
              type="submit"
            >
              Salvar
            </Button>
            <Button
              sx={{ width: '48%' }}
              variant="contained"
              onClick={() => {
                setEditable(false)
              }}
              color="inherit"
            >
              cancelar
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setEditable(true)
            }}
          >
            Editar
          </Button>
        )}
      </form>
    </Box>
  )
}
