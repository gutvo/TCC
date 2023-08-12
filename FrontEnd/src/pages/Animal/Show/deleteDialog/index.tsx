import { DeleteAnimalDialogProps } from '@Interfaces/pages/animals'
import { actions } from '@Redux/animals/slice'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function DeleteAnimalDialog({
  setDialogIsVisible,
  dialogIsVisible,
  name,
  id,
}: DeleteAnimalDialogProps) {
  const dispatch = useDispatch()
  const { deleteAnimalRequest } = actions
  const navigation = useNavigate()

  function handleDeleteAnimal() {
    dispatch(deleteAnimalRequest(id, navigation))
  }

  return (
    <Dialog open={dialogIsVisible} keepMounted onClose={setDialogIsVisible}>
      <DialogTitle>Deleção</DialogTitle>
      <DialogContent>
        <DialogContentText>
          O animal <span style={{ color: 'red' }}>{name}</span> esta preste a
          ser deletado, você tem certeza?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={setDialogIsVisible}>Cancelar</Button>
        <Button color="error" onClick={handleDeleteAnimal}>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
