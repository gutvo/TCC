import { Typography } from '@mui/material'

interface TyphographyNoDataProps {
  label: string
}

export function TyphographyNoData({ label }: TyphographyNoDataProps) {
  return (
    <Typography
      color="error"
      variant="h4"
      display="flex"
      alignItems="center"
      height="50vh"
      textAlign="center"
      justifyContent="center"
    >
      {label}
    </Typography>
  )
}
