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
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(newUserFormSchema),
  })
  const loading = useSelector((state: RootState) => state.users.loading)

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

      <Box>
        <TextFieldStyled
          loading={loadingCEP}
          errors={errors.ongData?.CEP}
          label="CEP"
          value={inputCep}
          inputProps={{ maxLength: 9 }}
          sx={{ marginBottom: '0.25rem' }}
          placeholder="Digite o CEP."
          {...register('ongData.CEP', {
            required: true,
            onChange: onChangeCep,
          })}
        />
        <CepInformation CEP={CEP} />
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
