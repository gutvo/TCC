import { Typography, Box } from '@mui/material'
import { RecuedAdoptedAnimal } from './Charts/AdoptedAnimal'

export function Reports() {
  return (
    <>
      <Box marginBottom={3}>
        <Typography
          textAlign="center"
          variant="h4"
          marginBottom={1}
          fontWeight="bold"
        >
          Relatórios
        </Typography>
      </Box>

      <RecuedAdoptedAnimal />
    </>
  )
}
