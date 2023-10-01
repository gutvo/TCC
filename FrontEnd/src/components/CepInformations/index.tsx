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
  return (
    <Box sx={sx}>
      {CEP ? (
        <Box sx={{ paddingLeft: '0.5rem' }}>
          {CEP.logradouro && (
            <Typography color={!editable ? colorNotEditabled : colorEditabled}>
              Rua: {CEP.logradouro}
            </Typography>
          )}
          {CEP.bairro && (
            <Typography color={!editable ? colorNotEditabled : colorEditabled}>
              Bairro: {CEP.bairro}
            </Typography>
          )}
          {CEP.localidade && (
            <Typography color={!editable ? colorNotEditabled : colorEditabled}>
              Cidade: {CEP.localidade}
            </Typography>
          )}
          {CEP.uf && (
            <Typography color={!editable ? colorNotEditabled : colorEditabled}>
              Estado: {CEP.uf}
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
