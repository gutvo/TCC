import { RootState } from '@Redux/store'
import { Box, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import userNotFound from '@Images/userNotFound.png'
import { ProfileForm, ProfileFormData } from './formProfile'
import { actions } from '@Redux/users/slice'
import { useState } from 'react'

export default function ShowUser() {
  const { updateUserRequest } = actions
  const { data } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()

  const [editable, setEditable] = useState(false)

  function handleUpdateUser(data: ProfileFormData) {
    dispatch(updateUserRequest(data, setEditable))
  }
  return (
    <Box>
      {data ? (
        <Grid container>
          <Grid item textAlign="center" lg={5} xs={12} marginBottom={4}>
            <img
              src={userNotFound}
              alt="Imagem do usuário"
              style={{ width: '20rem' }}
            />
          </Grid>

          <Grid item lg={7} xs={12}>
            <ProfileForm
              handleUpdateUser={handleUpdateUser}
              editable={editable}
              setEditable={setEditable}
              data={data}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography>Erro de Perfil</Typography>
      )}
    </Box>
  )
}
