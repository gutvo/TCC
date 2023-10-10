import { SvgIconComponent, ExpandLess, ExpandMore } from '@mui/icons-material'
import { Button, MenuItem, Menu as MenuMui } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface MenuProps {
  list: { label: string; path: string; Icon?: SvgIconComponent }[]
  name: string
  Icon?: SvgIconComponent
}

export function Menu({ list, name, Icon }: MenuProps) {
  const navigation = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id="button"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
        color="navLink"
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
      >
        {Icon && <Icon sx={{ marginRight: '0.1rem' }} />}
        {name}
      </Button>
      <MenuMui
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'button',
        }}
      >
        {list.map((item) => {
          const { label, path, Icon } = item
          return (
            <MenuItem key={path} onClick={() => navigation(path)}>
              {Icon && (
                <Icon
                  color="primary"
                  fontSize="small"
                  sx={{ marginRight: '0.1rem' }}
                />
              )}
              {label}
            </MenuItem>
          )
        })}
      </MenuMui>
    </>
  )
}
