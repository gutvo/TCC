import { grey, lightBlue, orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const white = '#ffffff'

export const lightTheme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
      light: orange[300],
      dark: orange[700],
      contrastText: white,
      '100': orange[500],
    },

    navLink: {
      main: white,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
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
