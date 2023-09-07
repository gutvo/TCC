import { grey, lightBlue } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const temaClaro = createTheme({
  palette: {
    secondary: {
      main: '#101010',
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
