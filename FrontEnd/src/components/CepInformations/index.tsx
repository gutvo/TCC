import { ViaCepDTO } from '@Interfaces/pages/users'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface CepInformationProps {
  CEP: ViaCepDTO | null | undefined
  editable?: boolean
}

export function CepInformation({ CEP, editable = true }: CepInformationProps) {
  const colorNotEditabled = '#777777'
  const colorEditabled = '#000000'
  return (
    <>
      {CEP ? (
        <Box sx={{ paddingLeft: '0.5rem' }}>
          <Typography color={!editable ? colorNotEditabled : colorEditabled}>
            Rua: {CEP.logradouro}
          </Typography>
          <Typography color={!editable ? colorNotEditabled : colorEditabled}>
            Bairro: {CEP.bairro}
          </Typography>
          <Typography color={!editable ? colorNotEditabled : colorEditabled}>
            Cidade: {CEP.localidade}
          </Typography>
          <Typography color={!editable ? colorNotEditabled : colorEditabled}>
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
    </>
  )
}
