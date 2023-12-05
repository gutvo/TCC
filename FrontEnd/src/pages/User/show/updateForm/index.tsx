import { Box, Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInformationsByCEP } from '@Services/othersApis'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  ProfileFormProps,
  ViaCepDTO,
  ProfileFormData,
} from '@Interfaces/pages/users'
import { UserUpdate, updateUserFormSchema } from './validations'
import { TextFieldStyled } from '@Components/TextFieldStyled'
import { DeleteDialog } from './DeleteDialog'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { CepInformation } from '@Components/CepInformations'
import { CepMask, CnpjCpfMask } from '@Functions'
import { TextFieldImage } from '@Components/TextFieldImage'
import { toast } from 'react-toastify'
import { actions } from '@Redux/users/slice'

export function ProfileForm({ data }: ProfileFormProps) {
  const dispatch = useDispatch()

  const { updateUserRequest } = actions

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
  const [houseNumber, setHouseNumber] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [isInVisibleRoad, setIsInVisibleRoad] = useState(true)
  const [isInVisibleNeighborhood, setIsInVisibleNeighborhood] = useState(true)
  const [editable, setEditable] = useState(false)

  function handleUpdateUser(data: ProfileFormData) {
    dispatch(updateUserRequest(data, setEditable))
  }

  async function onChangeCep(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    try {
      const { value } = event.target
      const formatValue = CepMask(value)
      setInputCep(formatValue)

      if (formatValue.length === 9) {
        await getCepInfo(formatValue)
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
    try {
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
    } catch (error) {
      toast.error('CEP inválido')
      setLoadingCEP(false)
    }
  }

  useEffect(() => {
    const { email, name, ongData } = data
    setValue('name', name)
    setValue('email', email)

    if (ongData) {
      setValue('ongData', ongData)
      setCpfCnpj(ongData.cpfCnpj)
      setInputCep(ongData.CEP)
      setHouseNumber(ongData.houseNumber)

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
        <Grid
          container
          component="form"
          spacing={2}
          sx={{
            maxWidth: '50rem',
          }}
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <Grid xs={12} item display="flex" justifyContent="center">
            <TextFieldImage
              isDisabled={!editable}
              register={register}
              name="imageData"
              profileEmail={data.email}
              isProfile
            />
          </Grid>

          <Grid item xs={12} mobile={6}>
            <TextFieldStyled
              errors={errors.name}
              label="Nome"
              placeholder="Digite o seu nome."
              {...register('name', { required: true })}
              disabled={!editable}
            />
          </Grid>
          <Grid xs={12} mobile={6} item>
            <TextFieldStyled
              errors={errors.email}
              label="Email"
              disabled={!editable}
              customType="email"
              placeholder="Digite o seu email."
              {...register('email', { required: true })}
            />
          </Grid>

          {data.ongData ? (
            <>
              <Grid xs={12} sm={4} item>
                <TextFieldStyled
                  errors={errors.ongData?.cpfCnpj}
                  disabled={!editable}
                  label="CPF/CNPJ"
                  value={cpfCnpj}
                  placeholder="Digite o CFP ou CNPJ."
                  {...register('ongData.cpfCnpj', {
                    required: true,
                    onChange: (event) => {
                      const formatValue: string = CnpjCpfMask(
                        event.target.value,
                      )
                      setCpfCnpj(formatValue)
                    },
                  })}
                />
              </Grid>
              <Grid xs={12} sm={4} item>
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
              </Grid>
              <Grid xs={12} sm={4} item>
                <TextFieldStyled
                  disabled={!editable}
                  errors={errors.ongData?.houseNumber}
                  label="Numero da residência"
                  customType="number"
                  value={houseNumber}
                  inputProps={{ min: 0, max: 9999 }}
                  placeholder="Digite o numero da residência."
                  {...register('ongData.houseNumber', {
                    required: true,
                    onChange: (e) => {
                      const { value } = e.target
                      if (!value) {
                        setHouseNumber('')
                        return
                      }

                      if (value <= 9999 && value >= 0) {
                        setHouseNumber(value)
                      }
                    },
                  })}
                />
              </Grid>
              <Grid
                item
                xs={12}
                display={isInVisibleRoad || isInVisibleRoad ? 'none' : 'flex'}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextFieldStyled
                      isInvisible={isInVisibleRoad}
                      label="Rua"
                      placeholder="Digite o nome da rua."
                      errors={errors.ongData?.road}
                      {...register('ongData.road', {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextFieldStyled
                      isInvisible={isInVisibleNeighborhood}
                      label="Bairro"
                      placeholder="Digite o nome da bairro."
                      errors={errors.ongData?.neighborhood}
                      {...register('ongData.neighborhood', {
                        required: true,
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>
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
              <Grid xs={12} item>
                <CepInformation CEP={CEP} editable={editable} />
              </Grid>
            </>
          ) : (
            <input
              style={{ display: 'none' }}
              {...register('ongData', { required: true, value: null })}
            />
          )}
          <Grid item xs={12}>
            {editable ? (
              <Grid container spacing={2}>
                <Grid xs={6} item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    {loading ? 'Salvando...' : 'Salvar'}
                  </Button>
                </Grid>
                <Grid xs={6} item>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setEditable(false)
                    }}
                    color="inherit"
                  >
                    cancelar
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid xs={12} item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setEditable(true)
                  }}
                >
                  Editar
                </Button>
              </Grid>
            )}
            <Grid xs={12} item>
              <Button
                disabled={dialogIsVisible}
                onClick={() => {
                  setDialogIsVisible(true)
                }}
                sx={{ justifyContent: 'start', width: '7rem' }}
                color="error"
              >
                Deletar Conta
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
