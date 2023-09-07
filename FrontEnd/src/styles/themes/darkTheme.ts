import { grey, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const temaEscuro = createTheme({
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
