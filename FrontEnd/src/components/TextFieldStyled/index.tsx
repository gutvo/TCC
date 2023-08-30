import React, { forwardRef, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
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
}

export const TextFieldStyled = forwardRef<
  HTMLInputElement,
  StyledTextFieldProps
>(function TextFieldPassword(
  { errors, isPassword, customType = 'text', loading, ...rest },
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
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 1,
          }}
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
          error={!!errors?.message}
          helperText={errors?.message}
          color="info"
          type={customType}
          {...rest}
          inputRef={ref}
          // InputProps={{
          //   endAdornment: (
          //     <>
          //       {loading ? (
          //         <InputAdornment position="end">
          //           <CircularProgress />
          //         </InputAdornment>
          //       ) : null}
          //     </>
          //   ),
          // }})
        />
      )}
    </>
  )
})
