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
import { RootState } from '@Redux/store'
import { useNavigate } from 'react-router-dom'
import { DeleteDialogProps } from '@Interfaces/pages/users'

export function DeleteDialog({
  dialogIsVisible,
  setDialogIsVisible,
}: DeleteDialogProps) {
  const { deleteUserRequest } = actions
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const data = useSelector((state: RootState) => state.users.data)

  function handleDelete() {
    if (data) {
      dispatch(deleteUserRequest(data.email, data.id, navigation))
    }
    handleClose()
  }

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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button color="error" onClick={handleDelete} autoFocus>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
