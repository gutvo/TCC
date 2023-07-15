import { Botao } from './styles'

interface ButtonProps {
  texto: string | number
  corFundo: 'blue' | 'green' | 'red' | 'gray'
  corFundoHover: 'blue' | 'green' | 'red' | 'gray'
  corFundoActive: 'blue' | 'green' | 'red' | 'gray'
  ativo?: boolean
  desabilitado?: boolean
  onClick?: () => void
  className?: string
  tipo?: 'button' | 'submit' | 'reset'
}
/*  blue: 'blue-200',
  green: 'green-300',
  red: 'red-100',
  gray: 'gray-300', */
export function Button({
  texto,
  corFundo,
  corFundoHover,
  corFundoActive,
  ativo,
  onClick,
  desabilitado,
  className,
  tipo,
}: ButtonProps) {
  return (
    <Botao
      Cor={corFundo}
      CorActive={corFundoActive}
      CorHover={corFundoHover}
      type={tipo}
      className={className}
      disabled={desabilitado}
      desabilitado={desabilitado}
      onClick={onClick}
      ativo={ativo}
    >
      {texto}
    </Botao>
  )
}

/*
código no hover para aumentar o botão
		font-size: ${(props) =>
			props.theme.desabilitado ? "1.25rem" : "1.3rem"};
		transition: 80ms;
*/
