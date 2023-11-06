import { SxProps, TypographyVariant } from '@mui/material'
import { TypographyLabel } from './styles'

interface TypographyDetailProps {
  label?: string
  value?: string
  sx?: SxProps
  variant?: TypographyVariant
  noDescription?: boolean
}

export function TypographyDetail({
  label,
  sx,
  value,
  variant,
  noDescription,
}: TypographyDetailProps) {
  return (
    <TypographyLabel variant={variant} sx={sx}>
      {label}{' '}
      <span
        style={{ fontWeight: 'normal', color: noDescription ? 'red' : 'black' }}
      >
        {value}
      </span>
    </TypographyLabel>
  )
}
