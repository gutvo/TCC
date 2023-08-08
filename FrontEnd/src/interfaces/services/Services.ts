import { UserData } from '../redux/users'

export interface ViaCepPropsDTO {
  data: {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
    ibge: string
    gia: string
    ddd: string
    siafi: string
  }
}

export interface refleshTokenDTO {
  data: {
    data: UserData
    token: string
  }
}

export interface LocalStorageProps {
  email: string
  password: string
}
