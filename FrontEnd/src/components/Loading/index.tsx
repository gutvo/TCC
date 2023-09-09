import { Box, CircularProgress } from '@mui/material'

export function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={'7rem'} />
    </Box>
  )
}
