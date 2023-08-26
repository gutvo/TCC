import { RootState } from '@Redux/store'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileForm } from './updateForm'
import { actions } from '@Redux/users/slice'
import { useState } from 'react'
import { ProfileFormData } from '@Interfaces/pages/users'
import { Helmet } from 'react-helmet-async'

export function ShowUser() {
  const { updateUserRequest } = actions
  const { data } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()

  const [editable, setEditable] = useState(false)

  function handleUpdateUser(data: ProfileFormData) {
    dispatch(updateUserRequest(data, setEditable))
  }
  return (
    <Box>
      <Helmet title="Perfil" />

      {data ? (
        <ProfileForm
          handleUpdateUser={handleUpdateUser}
          editable={editable}
          setEditable={setEditable}
          data={data}
        />
      ) : (
        <Typography>Erro de Perfil</Typography>
      )}
    </Box>
  )
}
