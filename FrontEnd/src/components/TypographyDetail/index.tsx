import { TypographyProps } from '@mui/material'
import { TypographyLabel } from './styles'

interface TypographyDetailProps extends TypographyProps {
  label?: string
  value?: string
  noDescription?: boolean
  haveBorder?: boolean
}

export function TypographyDetail({
  label,
  sx,
  value,
  variant,
  noDescription,
  haveBorder,
  ...rest
}: TypographyDetailProps) {
  return (
    <TypographyLabel
      variant={variant}
      sx={{
        marginBottom: haveBorder ? 1.5 : 2,
        padding: 1,
        border: haveBorder ? 'solid 1px #d4d4d4' : 'none',
        borderRadius: 1,
        ...sx,
      }}
      {...rest}
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
