import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import { Send } from '@mui/icons-material'

export function Input() {
  const loading = false
  return (
    <Box
      height="20%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingX={2}
    >
      <TextField
        fullWidth
        multiline
        maxRows={3}
        InputProps={{
          endAdornment: (
            <IconButton>
              <InputAdornment disablePointerEvents position="end">
                {loading ? <CircularProgress /> : <Send />}
              </InputAdornment>
            </IconButton>
          ),
        }}
      />
    </Box>
  )
}
