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
import { CepInformation } from '../../../../components/CepInformations'
import { CepMask, CnpjCpfMask } from '@Functions'
import { TextFieldImage } from '@Components/TextFieldImage'

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
    resetField,
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
  const [isInVisibleRoad, setIsInVisibleRoad] = useState(true)
  const [isInVisibleNeighborhood, setIsInVisibleNeighborhood] = useState(true)

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
        setIsInVisibleNeighborhood(true)
        setIsInVisibleRoad(true)
        setCEP(null)
      }
    } catch (error) {}
  }

  async function getCepInfo(formatValue: string) {
    setLoadingCEP(true)
    const response: ViaCepDTO = await getInformationsByCEP(formatValue)
    setCEP(response)

    const { localidade, uf, logradouro, bairro } = response

    setValue('ongData.city', localidade)
    setValue('ongData.uf', uf)

    if (!bairro.length) {
      resetField('ongData.neighborhood')
      setIsInVisibleNeighborhood(false)
    } else {
      setValue('ongData.neighborhood', bairro)
    }

    if (!logradouro.length) {
      resetField('ongData.road')
      setIsInVisibleRoad(false)
    } else {
      setValue('ongData.road', logradouro)
    }

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

      const { city, neighborhood, road, uf } = ongData
      setCEP({
        bairro: neighborhood,
        localidade: city,
        logradouro: road,
        uf,
        complemento: '',
      })
    }

    if (!editable) {
      setIsInVisibleRoad(true)
      setIsInVisibleNeighborhood(true)
    }
    clearErrors()
  }, [setValue, data, editable, clearErrors])

  return (
    <Box>
      {dialogIsVisible && (
        <DeleteDialog
          dialogIsVisible={dialogIsVisible}
          setDialogIsVisible={setDialogIsVisible}
        />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '50rem',
          }}
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <Box display="flex" justifyContent="center">
            <TextFieldImage
              isDisabled={!editable}
              register={register}
              name="imageData"
              profileEmail={data.email}
              isProfile
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
              <TextFieldStyled
                errors={errors.ongData?.cpfCnpj}
                disabled={!editable}
                label="CPF/CNPJ"
                value={cpfCnpj}
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
              <Box
                display={isInVisibleRoad || isInVisibleRoad ? 'none' : 'flex'}
              >
                <TextFieldStyled
                  isInvisible={isInVisibleRoad}
                  label="Rua"
                  placeholder="Digite o nome da rua."
                  errors={errors.ongData?.road}
                  style={{ width: '49%', marginRight: '2%' }}
                  {...register('ongData.road', {
                    required: true,
                  })}
                />
                <TextFieldStyled
                  isInvisible={isInVisibleNeighborhood}
                  label="Bairro"
                  style={{ width: '49%' }}
                  placeholder="Digite o nome da bairro."
                  errors={errors.ongData?.neighborhood}
                  {...register('ongData.neighborhood', {
                    required: true,
                  })}
                />
              </Box>
              <TextFieldStyled
                isInvisible={true}
                {...register('ongData.city', {
                  required: true,
                })}
              />
              <TextFieldStyled
                isInvisible={true}
                {...register('ongData.uf', {
                  required: true,
                })}
              />

              <CepInformation CEP={CEP} editable={editable} />
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

          <Button
            disabled={dialogIsVisible}
            onClick={() => {
              setDialogIsVisible(true)
            }}
            sx={{ marginTop: 1, justifyContent: 'start', width: '7rem' }}
            color="error"
          >
            Deletar Conta
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
