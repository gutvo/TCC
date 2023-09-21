import { TextField } from '@mui/material'
import { useState } from 'react'

export function TextfieldCnpjCpf() {
  function mask(v: string) {
    v = v.replace(/\D/g, '')

    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, '$1.$2')
      v = v.replace(/(\d{3})(\d)/, '$1.$2')
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    } else {
      v = v.substring(0, 14) // limita em 14 números
      v = v.replace(/^(\d{2})(\d)/, '$1.$2')
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      v = v.replace(/\.(\d{3})(\d)/, '.$1/$2')
      v = v.replace(/(\d{4})(\d)/, '$1-$2')
    }

    return v
  }
  const [cnpjCpf, setCnpjCpf] = useState('')
  return (
    <TextField
      value={cnpjCpf}
      onChange={(event) => {
        const { value } = event.target
        const formatValue = mask(value)
        setCnpjCpf(formatValue)
      }}
    />
  )
}
