import { Box } from '@mui/material'
import { Helmet } from 'react-helmet-async'

export function Home() {
  return (
    <Box>
      <Helmet title="Home" />
      <h1>Página Home</h1>
    </Box>
  )
}
