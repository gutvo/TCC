import { RootState } from '@Redux/store'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileForm } from './updateForm'
import { actions } from '@Redux/users/slice'
import { useState } from 'react'
import { ProfileFormData } from '@Interfaces/pages/users'
import { Helmet } from 'react-helmet-async'
import { useTheme } from '@mui/material/styles'
import { PhoneTable } from './updateForm/PhoneTable'

export function ShowUser() {
  const { palette } = useTheme()
  const dispatch = useDispatch()

  const { primary } = palette
  const { updateUserRequest } = actions
  const { data } = useSelector((state: RootState) => state.users)

  const [editable, setEditable] = useState(false)
  const [pageType, setPageType] = useState('profile')

  function handleUpdateUser(data: ProfileFormData) {
    dispatch(updateUserRequest(data, setEditable))
  }

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
          {pageType === 'profile' && (
            <ProfileForm
              handleUpdateUser={handleUpdateUser}
              editable={editable}
              setEditable={setEditable}
              data={data}
            />
          )}
          {pageType === 'phones' && <PhoneTable />}
        </>
      ) : (
        <Typography>Erro de Perfil</Typography>
      )}
    </Box>
  )
}
