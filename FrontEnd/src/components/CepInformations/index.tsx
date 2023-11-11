import { ViaCepDTO } from '@Interfaces/pages/users'
import { Box, SxProps, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface CepInformationProps {
  CEP: ViaCepDTO | null | undefined
  editable?: boolean
  sx?: SxProps
}

export function CepInformation({
  CEP,
  editable = true,
  sx,
}: CepInformationProps) {
  const colorNotEditabled = '#777777'
  const colorEditabled = '#000000'

  const states = [
    { id: 'AC', name: 'Acre' },
    { id: 'AL', name: 'Alagoas' },
    { id: 'AP', name: 'Amapá' },
    { id: 'AM', name: 'Amazonas' },
    { id: 'BA', name: 'Bahia' },
    { id: 'CE', name: 'Ceará' },
    { id: 'DF', name: 'Distrito Federal' },
    { id: 'ES', name: 'Espírito Santo' },
    { id: 'GO', name: 'Goiás' },
    { id: 'MA', name: 'Maranhão' },
    { id: 'MT', name: 'Mato Grosso' },
    { id: 'MS', name: 'Mato Grosso do Sul' },
    { id: 'MG', name: 'Minas Gerais' },
    { id: 'PA', name: 'Pará' },
    { id: 'PB', name: 'Paraíba' },
    { id: 'PR', name: 'Paraná' },
    { id: 'PE', name: 'Pernambuco' },
    { id: 'PI', name: 'Piauí' },
    { id: 'RJ', name: 'Rio de Janeiro' },
    { id: 'RN', name: 'Rio Grande do Norte' },
    { id: 'RS', name: 'Rio Grande do Sul' },
    { id: 'RO', name: 'Rondônia' },
    { id: 'RR', name: 'Roraima' },
    { id: 'SC', name: 'Santa Catarina' },
    { id: 'SP', name: 'São Paulo' },
    { id: 'SE', name: 'Sergipe' },
    { id: 'TO', name: 'Tocantins' },
  ]

  const state = states.find((item) => item.id === CEP?.uf)
  return (
    <Box sx={sx}>
      {CEP ? (
        <Box sx={{ paddingLeft: '0.5rem' }}>
          {CEP.logradouro && (
            <Typography
              fontSize="1.15rem"
              color={!editable ? colorNotEditabled : colorEditabled}
            >
              Rua: {CEP.logradouro}
            </Typography>
          )}
          {CEP.bairro && (
            <Typography
              fontSize="1.15rem"
              color={!editable ? colorNotEditabled : colorEditabled}
            >
              Bairro: {CEP.bairro}
            </Typography>
          )}
          {CEP.localidade && (
            <Typography
              fontSize="1.15rem"
              color={!editable ? colorNotEditabled : colorEditabled}
            >
              Cidade: {CEP.localidade}
            </Typography>
          )}
          {CEP.uf && (
            <Typography
              fontSize="1.15rem"
              color={!editable ? colorNotEditabled : colorEditabled}
            >
              Estado: {state?.name}
            </Typography>
          )}
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
  )
}
