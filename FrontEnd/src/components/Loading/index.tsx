import { Box, CircularProgress, SxProps } from '@mui/material'

interface LoadingProps {
  sx?: SxProps
}

export function Loading({ sx }: LoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <CircularProgress size={'7rem'} />
    </Box>
  )
}
