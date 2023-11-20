import { grey, lightBlue, orange, blue } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'

const white = '#ffffff'

export const lightTheme = createTheme(
  {
    palette: {
      // primary: {
      //   main: blue[800],
      //   light: blue[500],
      //   dark: blue[900],
      //   contrastText: white,
      //   '100': blue[500],
      // },
      secondary: {
        main: orange[500],
        light: orange[300],
        dark: orange[700],
        contrastText: white,
        '100': orange[500],
      },
      Chat: {
        main: blue[600],
        light: blue[500],
        dark: blue[800],
        contrastText: white,
        // main: teal[800],
        // light: teal[700],
        // dark: teal[900],
        // contrastText: white,
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
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        mobile: 740,
        md: 900,
        lg: 1200,
        xl: 1536,
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
  },
  ptBR,
)
