import { Box, Paper, Typography, useTheme } from '@mui/material'

interface CardKpisProps {
  label: String
  value: string | number | undefined
}

export function CardKpis({ label, value = 0 }: CardKpisProps) {
  const theme = useTheme()
  const { palette } = theme
  return (
    <Box
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '17rem',
        height: '4.5rem',
        bgcolor: palette.secondary.dark,
      }}
      component={Paper}
    >
      <Typography variant="h5" fontWeight="bold" color="white">
        {value} {label}
      </Typography>
    </Box>
  )
}
