import { grey, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const temaEscuro = createTheme({
  palette: {
    info: {
      main: grey[400],
      light: grey[50],
    },
    primary: {
      main: grey[900], // cor personalizada = #262626
      dark: grey[800], // cor personalizada = #333333
      contrastText: red.A700,
    },
    error: {
      main: red.A700,
    },
    secondary: {
      main: red.A700,
    },
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: red.A700,
            backgroundColor: grey[50],
            '&:hover': {
              color: grey[50],
              backgroundColor: grey[500],
            },
            '&.MuiPaginationItem-ellipsis': {
              background: 'none',
              color: red.A700,
            },
          },
          ul: {
            '& .Mui-selected ': {
              color: grey[50],
              backgroundColor: red.A700,
            },
          },
        },
      },
    },
  },
})

export default temaEscuro
