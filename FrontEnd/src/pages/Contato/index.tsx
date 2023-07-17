import { Ul } from './styles'

export function Contato() {
  return (
    <div>
      <div className="container">
        <h1>Contatos</h1>
        <Ul>
          <li>
            Email:
            <a target="_blank" href="mailto:asda" rel="noreferrer">
              Email
            </a>
          </li>
          <li>
            Teste:
            <a target="_blank" href="/teste">
              Teste
            </a>
          </li>
          <li>Telefone: (14)992342342</li>
        </Ul>
      </div>
    </div>
  )
}
