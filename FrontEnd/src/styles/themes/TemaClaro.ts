import { grey, lightBlue, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const temaClaro = createTheme({
  palette: {
    info: {
      main: grey.A700,
      light: grey[900],
    },
    primary: {
      main: grey[200], // cor do container
      dark: grey[50],
      contrastText: red.A700,
    },
    error: {
      main: red.A700,
    },
    secondary: {
      main: lightBlue.A700,
    },
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: lightBlue.A700,
            backgroundColor: grey[50],
            '&:hover': {
              color: grey[50],
              backgroundColor: grey[500],
            },
            '&.MuiPaginationItem-ellipsis': {
              background: 'none',
              color: lightBlue.A700,
            },
          },
          ul: {
            '& .Mui-selected ': {
              color: grey[50],
              backgroundColor: lightBlue.A700,
            },
          },
        },
      },
    },
  },
})

export default temaClaro
