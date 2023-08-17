import { Box, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

export function Footer() {
  const theme = useTheme()
  return (
    <Box
      bgcolor={theme.palette.primary.main}
      color="white"
      height="4rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <NavLink to="">
        <Typography
          sx={{
            color: '#ffff00',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          variant="subtitle1"
        >
          Dar feedback
        </Typography>
      </NavLink>

      <Typography variant="subtitle1">
        Site feito por{' '}
        <Box
          component={NavLink}
          target="_blank"
          to="https://github.com/gutvo"
          rel="noreferrer"
          sx={{
            color: '#ffff00',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
        >
          @Gustavo
        </Box>
      </Typography>
    </Box>
  )
}
