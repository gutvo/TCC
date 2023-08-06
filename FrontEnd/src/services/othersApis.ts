import axios from 'axios'

interface ViaCepPropsDTO {
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

export async function getInformationsByCEP(CEP: string) {
  const response: ViaCepPropsDTO = await axios.get(
    `https://viacep.com.br/ws/${CEP}/json/`,
  )
  return response.data
}
