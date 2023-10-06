import { Container, Typography, Box, Grid, Link } from '@mui/material'

export function Footer() {
  const white = '#ffffff'
  const primary = '#454545'
  const secondary = '#d4d4d4'

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: primary,
        color: white,
        p: 2,
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color={white} gutterBottom>
              Sobre o site
            </Typography>
            <Typography variant="body2" color={white}>
              Site foi criado com o intuito trazer uma melhor comunicação entre
              os adotantes e as organizações
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color={white} gutterBottom>
              Contatos
            </Typography>
            <Typography variant="body2" color={secondary}>
              Email:{' '}
              <Link
                href="mailto:gustavo.souza@ead.eduvaleavare.com.br"
                color="inherit"
                alignItems="center"
              >
                gustavo.souza@ead.eduvaleavare.com.br
              </Link>
            </Typography>

            <Typography variant="body2" color={secondary}>
              Git:{' '}
              <Link
                href="https://github.com/gutvo"
                color="inherit"
                alignItems="center"
              >
                {' '}
                Gutvo9{' '}
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color={secondary} align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://localhost">
              Pet Meu
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
