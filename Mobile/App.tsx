import { ThemeProvider } from '@rneui/themed'
import Route from './src/routes'
import theme from './src/themes'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Route />
    </ThemeProvider>
  )
}
