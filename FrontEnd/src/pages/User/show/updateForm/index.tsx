import { Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInformationsByCEP } from '@Services/othersApis'
import { ChangeEvent, useEffect } from 'react'
import { ProfileFormProps, ViaCepDTO } from '@Interfaces/pages/users'
import { UserUpdate, updateUserFormSchema } from '@Validations/users/update'

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
        <TextField
          disabled={!editable}
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
          disabled={!editable}
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
        {data.ongData ? (
          <>
            <TextField
              disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
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
              disabled={!editable}
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
