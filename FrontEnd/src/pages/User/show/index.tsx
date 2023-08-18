import { RootState } from '@Redux/store'
import { Box, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import userNotFound from '@Images/userNotFound.png'
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
        <Grid container gap={10}>
          <Grid
            display="flex"
            alignItems="start"
            justifyContent="center"
            item
            lg={4}
            xs={12}
          >
            <img
              src={userNotFound}
              alt="Imagem do usuário"
              style={{ width: '20rem', height: '20rem' }}
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
