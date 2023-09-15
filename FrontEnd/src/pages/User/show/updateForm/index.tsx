import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInformationsByCEP } from '@Services/othersApis'
import { ChangeEvent, useEffect, useState } from 'react'
import { ProfileFormProps, ViaCepDTO } from '@Interfaces/pages/users'
import { UserUpdate, updateUserFormSchema } from './validations'
import { TextFieldStyled } from '@Components/TextFieldStyled'
import { DeleteDialog } from './DeleteDialog'
import { useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import userNotFound from '@Images/userNotFound.png'
import { NavLink } from 'react-router-dom'
import { PhoneTable } from './PhoneTable'

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

  const loading = useSelector((state: RootState) => state.users.loading)

  const [dialogIsVisible, setDialogIsVisible] = useState(false)
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
        setLoadingCEP(false)
      }
      if (value.length === 0) {
        setLoadingCEP(false)
        setCEP(undefined)
      }
    } catch (error) {}
  }

  useEffect(() => {
    setValue('name', data.name)
    setValue('email', data.email)
    setValue('ongData', data.ongData)

    if (data.ongData) {
      const { city, neighborhood, road, uf } = data.ongData
      setCEP({
        bairro: neighborhood,
        localidade: city,
        logradouro: road,
        uf,
        complemento: '',
      })
    }
  }, [setValue, data, editable])

  return (
    <Box>
      {dialogIsVisible ? (
        <DeleteDialog
          dialogIsVisible={dialogIsVisible}
          setDialogIsVisible={setDialogIsVisible}
        />
      ) : null}
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        onSubmit={handleSubmit(handleUpdateUser)}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={userNotFound}
            alt="Imagem do usuário"
            style={{ width: '20rem', height: '20rem' }}
          />
        </Box>

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
            <Box>
              <TextFieldStyled
                loading={loadingCEP}
                errors={errors.ongData?.CEP}
                disabled={!editable}
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
                  <Typography color={!editable ? '#acacac' : 'black'}>
                    Rua: {CEP.logradouro}
                  </Typography>
                  <Typography color={!editable ? '#acacac' : 'black'}>
                    Bairro: {CEP.bairro}
                  </Typography>
                  <Typography color={!editable ? '#acacac' : 'black'}>
                    Cidade: {CEP.localidade}
                  </Typography>
                  <Typography color={!editable ? '#acacac' : 'black'}>
                    Estado: {CEP.uf}
                  </Typography>
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
              {loading ? 'Salvando...' : 'Salvar'}
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
      <Button
        disabled={dialogIsVisible}
        onClick={() => {
          setDialogIsVisible(true)
        }}
        sx={{ marginTop: 1 }}
        color="error"
      >
        Deletar Conta
      </Button>
      <PhoneTable />
    </Box>
  )
}
