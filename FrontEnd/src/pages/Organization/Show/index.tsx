import { Box, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

export function ShowOng() {
  const id = useLocation().state
  return (
    <Box>
      <Helmet title="Instituição"></Helmet>
      <Typography>Mostrar Ong {id}</Typography>
    </Box>
  )
}
