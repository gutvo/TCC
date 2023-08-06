import { HelmetTitle } from '@Components/helmet'
import { HomeContainer } from './styles'

export function Home() {
  return (
    <HomeContainer className="container">
      <HelmetTitle label="Home" />
      <h1>Página Home</h1>
    </HomeContainer>
  )
}
