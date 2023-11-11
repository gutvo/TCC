import { SxProps, TypographyVariant } from '@mui/material'
import { TypographyLabel } from './styles'

interface TypographyDetailProps {
  label?: string
  value?: string
  sx?: SxProps
  variant?: TypographyVariant
  noDescription?: boolean
  border?: boolean
}

export function TypographyDetail({
  label,
  sx,
  value,
  variant,
  noDescription,
  border,
}: TypographyDetailProps) {
  return (
    <TypographyLabel
      variant={variant}
      sx={{
        ...sx,
        marginBottom: border ? 1.5 : 2,
        padding: 1,
        border: border ? 'solid 1px #d4d4d4' : 'none',
        borderRadius: 1,
      }}
    >
      {label}{' '}
      <span
        style={{
          fontWeight: 'normal',
          color: noDescription ? 'red' : 'black',
        }}
      >
        {value}
      </span>
    </TypographyLabel>
  )
}
