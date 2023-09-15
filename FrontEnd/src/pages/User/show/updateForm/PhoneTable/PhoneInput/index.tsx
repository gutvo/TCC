import { Box, Button } from '@mui/material'
import { useState } from 'react'
import MuiPhoneNumber from 'material-ui-phone-number-2'
import { Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@Redux/users/slice'
import { RootState } from '@Redux/store'

export default function PhoneInput() {
  const [phone, setPhone] = useState('')
  const [textHelp, setTextHelp] = useState('')
  const dispatch = useDispatch()
  const { createPhoneRequest } = actions
  const ongId = useSelector((state: RootState) => state.users.data?.ongData?.id)
  function handleAddPhone() {
    if (phone.length < 18) {
      return setTextHelp('Coloque um numero válido.')
    } else {
      setTextHelp('')
    }
    if (ongId) {
      dispatch(createPhoneRequest(phone, ongId, setPhone))
    }
  }
  return (
    <Box display="flex">
      <MuiPhoneNumber
        defaultCountry={'br'}
        sx={{ width: '74%', paddingRight: '2%' }}
        InputProps={{ style: { height: '2.75rem' } }}
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
      <Button
        sx={{ height: '2.75rem' }}
        variant="contained"
        onClick={() => handleAddPhone()}
      >
        Adicionar telefone
        <Add />
      </Button>
    </Box>
  )
}
