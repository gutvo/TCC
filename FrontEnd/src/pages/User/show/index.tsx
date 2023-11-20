import { RootState } from '@Redux/store'
import { Box, Button, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { ProfileForm } from './updateForm'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { PhoneTable } from './updateForm/PhoneTable'
import { TyphographyNoData } from '@Components/TyphographyNoData'

export function ShowUser() {
  const { palette } = useTheme()
  const { primary } = palette

  const { data } = useSelector((state: RootState) => state.users)

  const [pageType, setPageType] = useState('profile')

  return (
    <Box>
      <Helmet title="Perfil" />
      <Box
        sx={{ display: 'flex', gap: 4, justifyContent: 'center', marginY: 4 }}
      >
        <Button
          disabled={pageType === 'profile'}
          onClick={() => {
            setPageType('profile')
          }}
          sx={{
            width: '8rem',
            ':disabled': {
              color: primary.contrastText,
              backgroundColor: primary.main,
            },
          }}
          variant={pageType === 'profile' ? 'contained' : 'outlined'}
        >
          Perfil
        </Button>
        <Button
          disabled={pageType === 'phones'}
          onClick={() => {
            setPageType('phones')
          }}
          sx={{
            width: '8rem',
            ':disabled': {
              color: primary.contrastText,
              backgroundColor: primary.main,
            },
          }}
          variant={pageType === 'phones' ? 'contained' : 'outlined'}
        >
          Telefones
        </Button>
      </Box>

      {data ? (
        <>
          {pageType === 'profile' && <ProfileForm data={data} />}
          {pageType === 'phones' && <PhoneTable />}
        </>
      ) : (
        <TyphographyNoData label="Erro de Perfil." />
      )}
    </Box>
  )
}
