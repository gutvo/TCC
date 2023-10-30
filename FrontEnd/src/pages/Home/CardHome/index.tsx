import { Box, Paper, Typography, useTheme } from '@mui/material'

interface CardHomeProps {
  label: String
  value: string | number | undefined
}

export function CardHome({ label, value = 0 }: CardHomeProps) {
  const theme = useTheme()
  const { palette } = theme
  return (
    <Box
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '16rem',
        height: '6rem',
        bgcolor: palette.secondary.dark,
      }}
      component={Paper}
    >
      <Typography variant="subtitle1" fontWeight="bold" color="white">
        {value} {label}
      </Typography>
    </Box>
  )
}
