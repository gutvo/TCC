import { Box, Button } from '@mui/material'
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
import { PhoneTable } from './PhoneTable'
import { CepInformation } from '../../../../components/CepInformations'
import { CepMask, CnpjCpfMask } from '@Functions'

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
    clearErrors,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: zodResolver(updateUserFormSchema),
  })
  const loading = useSelector((state: RootState) => state.users.loading)

  const [dialogIsVisible, setDialogIsVisible] = useState(false)
  const [loadingCEP, setLoadingCEP] = useState(false)
  const [CEP, setCEP] = useState<ViaCepDTO | null>()
  const [inputCep, setInputCep] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')

  function onChangeCep(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    try {
      const { value } = event.target
      const formatValue = CepMask(value)
      setInputCep(formatValue)

      if (formatValue.length === 9) {
        getCepInfo(formatValue)
      }
      if (formatValue.length === 0) {
        setLoadingCEP(false)
        setCEP(null)
      }
    } catch (error) {}
  }

  async function getCepInfo(formatValue: string) {
    setLoadingCEP(true)
    const response: ViaCepDTO = await getInformationsByCEP(formatValue)
    setCEP(response)
    setValue('ongData.road', response.logradouro)
    setValue('ongData.neighborhood', response.bairro)
    setValue('ongData.city', response.localidade)
    setValue('ongData.uf', response.uf)
    setLoadingCEP(false)
  }

  useEffect(() => {
    const { email, name, ongData } = data
    setValue('name', name)
    setValue('email', email)
    if (ongData) {
      setValue('ongData', ongData)
      setCpfCnpj(ongData.cpfCnpj)
      setInputCep(ongData.CEP)
    }

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
    clearErrors()
  }, [setValue, data, editable, clearErrors])

  return (
    <Box>
      {dialogIsVisible ? (
        <DeleteDialog
          dialogIsVisible={dialogIsVisible}
          setDialogIsVisible={setDialogIsVisible}
        />
      ) : null}
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
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
                errors={errors.ongData?.cpfCnpj}
                disabled={!editable}
                label="CPF/CNPJ"
                value={cpfCnpj}
                style={{ marginBottom: '1rem' }}
                placeholder="Digite o CFP ou CNPJ."
                {...register('ongData.cpfCnpj', {
                  required: true,
                  onChange: (event) => {
                    const formatValue: string = CnpjCpfMask(event.target.value)
                    setCpfCnpj(formatValue)
                  },
                })}
              />
              <TextFieldStyled
                loading={loadingCEP}
                errors={errors.ongData?.CEP}
                disabled={!editable}
                label="CEP"
                inputProps={{ maxLength: 9 }}
                value={inputCep}
                style={{ marginBottom: '0.25rem' }}
                placeholder="Digite o CEP."
                {...register('ongData.CEP', {
                  required: true,
                  onChange: onChangeCep,
                })}
              />
              <CepInformation CEP={CEP} editable={editable} />
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
      <PhoneTable />
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
    </Box>
  )
}
