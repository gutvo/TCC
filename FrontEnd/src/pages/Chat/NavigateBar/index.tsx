import { Box, Typography, useTheme } from '@mui/material'

export function NavigateBar() {
  const { palette } = useTheme()
  return (
    <Box bgcolor={palette.primary.dark} color="white" height="100%">
      <Typography>NAVIGATE BAR</Typography>
    </Box>
  )
}
