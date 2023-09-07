import React, { forwardRef, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  CircularProgress,
  // CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  useTheme,
} from '@mui/material'

import { FieldError } from 'react-hook-form'

export interface StyledTextFieldProps extends Omit<TextFieldProps, 'type'> {
  errors?: FieldError
  isPassword?: boolean
  customType?: React.InputHTMLAttributes<HTMLInputElement>['type']
  loading?: boolean
  isOptional?: boolean
}

export const TextFieldStyled = forwardRef<
  HTMLInputElement,
  StyledTextFieldProps
>(function TextFieldPassword(
  { errors, isPassword, customType = 'text', loading, isOptional, ...rest },
  ref,
) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const theme = useTheme()
  return (
    <>
      {isPassword ? (
        <TextField
          error={!!errors?.message}
          helperText={errors?.message}
          required={!isOptional}
          InputLabelProps={{ shrink: true }}
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 1,
          }}
          fullWidth
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
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 1,
          }}
          InputLabelProps={{ shrink: true }}
          required={!isOptional}
          error={!!errors?.message}
          helperText={errors?.message}
          color="info"
          fullWidth
          type={customType}
          {...rest}
          inputRef={ref}
          InputProps={{
            endAdornment: (
              <>
                {loading ? (
                  <InputAdornment disablePointerEvents position="end">
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
