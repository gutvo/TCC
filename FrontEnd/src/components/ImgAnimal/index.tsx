import notFound from '../../images/isNotFound.jpg'
import { ImageContainer } from './styles'

interface ImageProps {
  source?: string
  name?: string
  race?: string
  age?: number
  sex?: string
}

export function Image({ source, name, race, age, sex }: ImageProps) {
  return (
    <ImageContainer>
      <a href="">
        <img
          className="image"
          src={source || notFound}
          alt="Imagem de um Cachorro"
        />
        <div className="desc">
          <ul>
            <li>
              Nome: <span>{name}</span>
            </li>
            <li>
              Raça: <span>{race}</span>
            </li>
            <li>
              Idade: <span>{age} anos</span>
            </li>
            <li>
              Sexo: <span>{sex} </span>
            </li>
          </ul>
        </div>
      </a>
    </ImageContainer>
  )
}
