import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { FieldError } from 'react-hook-form'

interface TextFieldPasswordProps {
  errors: FieldError | undefined
  label: string
  name: string
  register: any
  placeholder: string
}

export function TextFieldPassword({
  errors,
  register,
  label,
  name,
  placeholder,
}: TextFieldPasswordProps) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <TextField
      error={!!errors?.message}
      InputLabelProps={{ shrink: true }}
      helperText={errors?.message}
      color="info"
      label={label}
      type={passwordVisible ? 'password' : 'text'}
      placeholder={placeholder}
      {...register(name, { required: true })}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setPasswordVisible(!passwordVisible)
              }}
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
