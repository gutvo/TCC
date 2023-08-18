import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { actions as actionsAnimal } from '@Redux/animals/slice'
import { RootState } from '@Redux/store'
import { useNavigate } from 'react-router-dom'
import { DeleteUserDialogProps } from '@Interfaces/pages/users'
import { useEffect } from 'react'

export function DeleteDialog({
  dialogIsVisible,
  setDialogIsVisible,
}: DeleteUserDialogProps) {
  const { deleteUserRequest } = actions
  const { listAnimalRequest } = actionsAnimal
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const data = useSelector((state: RootState) => state.users.data)
  const animalData = useSelector((state: RootState) => state.animals.list)
  function handleDelete() {
    if (data) {
      dispatch(deleteUserRequest(data.email, data.id, navigation))
    }
    handleClose()
  }
  useEffect(() => {
    if (data?.ongData) {
      dispatch(listAnimalRequest(0, 1, data.ongData.id))
    }
  }, [data, dispatch, listAnimalRequest])

  function handleClose() {
    setDialogIsVisible(false)
  }
  return (
    <Dialog open={dialogIsVisible} onClose={handleClose}>
      <DialogTitle>Deleção de Conta</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que dejesa deletar a sua conta?
        </DialogContentText>
        <DialogContentText color="error">
          {data?.ongData?.id && animalData.length
            ? 'Há animais cadastrados'
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          autoFocus
        >
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
