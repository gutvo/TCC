import styled from 'styled-components'

/* const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const // fala que o texto vai ser sempre o mesmo e uqe não muda

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS // precisa fazer isso pq o styled componentes não consegue ler typescript
}
*/
const CorFundo = {
  blue: 'blue-400',
  green: 'green-400',
  red: 'red-300',
  gray: 'gray-300',
} as const
const CorFundoHover = {
  blue: 'blue-200',
  green: 'green-300',
  red: 'red-100',
  gray: 'gray-300',
} as const
const CorFundorActive = {
  blue: 'blue-400',
  green: 'green-600',
  red: 'red-300',
  gray: 'gray-300',
} as const

interface COLORSProps {
  Cor: keyof typeof CorFundo
  CorHover: keyof typeof CorFundoHover
  CorActive: keyof typeof CorFundorActive
  desabilitado?: true | false
  ativo?: true | false
}

export const Botao = styled.button<COLORSProps>`
  background: ${(props) =>
    props.ativo
      ? props.theme[CorFundorActive[props.CorActive]]
      : props.theme[CorFundo[props.Cor]]}; //retorna a cor escolhida
  color: ${(props) => props.theme.white};
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  border: 0;
  margin: 0.5rem 0;

  &:hover {
    background-color: ${(props) => {
      return props.desabilitado
        ? null
        : props.theme[CorFundoHover[props.CorHover]] // returona a cor escolhida quando passada o mouse
    }};
  }
  &:disabled {
    background: ${(props) => props.theme['gray-700']};
    cursor: default;
  }
`
