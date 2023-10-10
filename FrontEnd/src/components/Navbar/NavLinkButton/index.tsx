import { SvgIconComponent } from '@mui/icons-material'
import { Button, ButtonProps, SxProps } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface NavLinkProps extends ButtonProps {
  label: string
  href: string
  sx?: SxProps
  Icon?: SvgIconComponent
}

export function NavLinkButton({
  href,
  label,
  sx,
  Icon,
  ...rest
}: NavLinkProps) {
  const navigation = useNavigate()
  return (
    <Button
      onClick={() => {
        navigation(href)
      }}
      sx={{ fontSize: '1.1rem', fontWeight: 'bold', ...sx }}
      {...rest}
      color="navLink"
    >
      {Icon && <Icon sx={{ marginRight: '0.1rem' }} />} {label}
    </Button>
  )
}
