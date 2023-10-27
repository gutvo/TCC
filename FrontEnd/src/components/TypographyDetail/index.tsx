import { SxProps, TypographyVariant } from '@mui/material'
import { TypographyLabel } from './styles'

interface TypographyDetailProps {
  label?: string
  value?: string
  sx?: SxProps
  variant?: TypographyVariant
}

export function TypographyDetail({
  label,
  sx,
  value,
  variant,
}: TypographyDetailProps) {
  return (
    <TypographyLabel variant={variant} sx={sx}>
      {label} <span style={{ fontWeight: 'normal' }}>{value}</span>
    </TypographyLabel>
  )
}
