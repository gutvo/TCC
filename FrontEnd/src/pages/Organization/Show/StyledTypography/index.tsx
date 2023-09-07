import { Typography } from '@mui/material'

interface StyledTypographyProps {
  label: string
  value: string
}

export function StyledTypography({ label, value }: StyledTypographyProps) {
  return (
    <>
      <Typography fontSize="1.4rem">
        <span style={{ fontWeight: 'bold' }}>{label}:</span> {value}
      </Typography>
    </>
  )
}
