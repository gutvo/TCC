import { Box, CircularProgress, InputAdornment, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'

export function Input() {
  const loading = false
  return (
    <Box
      height="20%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderTop="1px solid blueviolet"
      paddingX={2}
    >
      <TextField
        fullWidth
        multiline
        maxRows={3}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment disablePointerEvents position="end">
                {loading ? <CircularProgress /> : <Send />}
              </InputAdornment>
            </>
          ),
        }}
      />
    </Box>
  )
}
