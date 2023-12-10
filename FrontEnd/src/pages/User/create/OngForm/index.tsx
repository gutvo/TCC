import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInformationsByCEP } from '@Services/othersApis'
import { ChangeEvent, useState } from 'react'
import { CreateUser, newUserFormSchema } from '../validations'
import { CreateFormProps, ViaCepDTO } from '@Interfaces/pages/users'
import { TextFieldStyled } from '@Components/TextFieldStyled'
import { useSelector } from 'react-redux'
import { RootState } from '@Redux/store'
import { CepInformation } from '@Components/CepInformations'
import { CepMask, CnpjCpfMask } from '@Functions'

export function OngForm({ handleAddUser }: CreateFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(newUserFormSchema),
  })
  const loading = useSelector((state: RootState) => state.users.loading)

  const [loadingCEP, setLoadingCEP] = useState(false)
  const [CEP, setCEP] = useState<ViaCepDTO | null>()
  const [inputCep, setInputCep] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleAddUser)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        paddingX: 4,
      }}
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

      <TextFieldStyled
        errors={errors.ongData?.cpfCnpj}
        label="CPF/CNPJ"
        value={cpfCnpj}
        sx={{ marginBottom: '0.25rem' }}
        placeholder="Digite o CPF ou CNPJ."
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
        label="CEP"
        value={inputCep}
        inputProps={{ maxLength: 9 }}
        placeholder="Digite o CEP."
        {...register('ongData.CEP', {
          required: true,
          onChange: onChangeCep,
        })}
      />
      <TextFieldStyled
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
      <Box display={isInVisibleRoad || isInVisibleRoad ? 'none' : 'flex'}>
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

      <CepInformation CEP={CEP} />

      <Box>
        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ marginBottom: 1 }}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar-se'}
        </Button>
      </Box>
    </Box>
  )
}
