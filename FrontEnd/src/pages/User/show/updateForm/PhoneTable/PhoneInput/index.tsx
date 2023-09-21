import { Box, Button, SxProps } from '@mui/material'
import { useState, Dispatch, SetStateAction } from 'react'
import MuiPhoneNumber from 'material-ui-phone-number-2'
import { Add, Check, Close } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { RootState } from '@Redux/store'

interface updateProps {
  id: number
  index: number
  setEditIndex: Dispatch<SetStateAction<number | null>>
}

interface PhoneInputProps {
  defaultValues?: string
  sx?: SxProps
  update?: updateProps
  width?: string
}

export default function PhoneInput({
  defaultValues,
  update,
  sx,
  width = '74%',
}: PhoneInputProps) {
  const { createPhoneRequest, updatePhoneRequest } = actions

  const ongId = useSelector((state: RootState) => state.users.data?.ongData?.id)

  // const styleUpdate = update && { '& fieldset': { border: 'none' } }

  const dispatch = useDispatch()

  const [phone, setPhone] = useState(defaultValues || '')
  const [textHelp, setTextHelp] = useState('')

  function handlePhone() {
    if (phone.length < 18) {
      return setTextHelp('Coloque um numero válido.')
    } else {
      setTextHelp('')
    }

    if (update) {
      const { id, index, setEditIndex } = update
      return dispatch(updatePhoneRequest(phone, id, index, setEditIndex))
    }
    if (ongId) {
      dispatch(createPhoneRequest(phone, ongId, setPhone))
    }
  }

  return (
    <Box display="flex" flexDirection="row">
      <MuiPhoneNumber
        defaultCountry={'br'}
        sx={{
          ...sx,
          width,
          paddingRight: '2%',
        }}
        InputProps={{ style: { height: '2.25rem' } }}
        value={phone}
        variant="outlined"
        helperText={textHelp}
        error={!!textHelp.length}
        onChange={(event) => {
          const phone = event.toString()
          setPhone(phone)
          if (phone.length === 18) {
            setTextHelp('')
          }
        }}
        inputProps={{ style: { border: 10 } }}
        onlyCountries={['br', 'cu']}
        countryCodeEditable={false}
      />
      {update ? (
        <>
          <Button color="success" onClick={handlePhone}>
            <Check />
          </Button>
          <Button color="error" onClick={() => update.setEditIndex(null)}>
            <Close />
          </Button>
        </>
      ) : (
        <Button
          sx={{ height: '2.25rem' }}
          variant="contained"
          onClick={() => handlePhone()}
        >
          Adicionar telefone
          <Add />
        </Button>
      )}
    </Box>
  )
}
