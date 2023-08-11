import React, { forwardRef, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'

import { FieldError } from 'react-hook-form'

interface TextFieldPasswordProps extends Omit<TextFieldProps, 'type'> {
  errors: FieldError | undefined
  isPassword?: boolean
  customType?: React.InputHTMLAttributes<HTMLInputElement>['type']
  loading?: boolean
}

export const TextFieldStyled = forwardRef<
  HTMLInputElement,
  TextFieldPasswordProps
>(function TextFieldPassword(
  { errors, isPassword, customType = 'text', loading, ...rest },
  ref,
) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <>
      {isPassword ? (
        <TextField
          error={!!errors?.message}
          InputLabelProps={{ shrink: true }}
          helperText={errors?.message}
          color="info"
          {...rest}
          inputRef={ref}
          type={passwordVisible ? 'text' : 'password'}
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
      ) : (
        <TextField
          error={!!errors?.message}
          InputLabelProps={{ shrink: true }}
          helperText={errors?.message}
          color="info"
          type={customType}
          {...rest}
          inputRef={ref}
          InputProps={{
            endAdornment: (
              <>
                {loading ? (
                  <InputAdornment position="end">
                    <CircularProgress />
                  </InputAdornment>
                ) : null}
              </>
            ),
          }}
        />
      )}
    </>
  )
})
