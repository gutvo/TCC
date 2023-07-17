import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { CadastroContainer } from './styles'
// import { useState } from 'react'

export function Cadastro() {
  // const [user, setUser] = useState('')
  // const [email, setEmail] = useState('')
  // const [senha, setSenha] = useState('')
  return (
    <CadastroContainer>
      <div className="container">
        <div className="divForm">
          <form method="POST">
            <h1>Cadastro</h1>
            <Input textolabel="Usuario" placeholder="Digite o Usuário" />
            <Input textolabel="Email" placeholder="Digite o Email" />
            <Input textolabel="Senha" placeholder="Digite o Senha" />
            <Button
              texto="Cadastrar"
              corFundo="var(--green-400)"
              corFundoHover="var(--green-300)"
              tipo="submit"
            />
          </form>
        </div>
      </div>
    </CadastroContainer>
  )
}
