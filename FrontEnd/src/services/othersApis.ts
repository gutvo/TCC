import { ViaCepPropsDTO } from '@Interfaces/services/Services'
import axios from 'axios'

export async function getInformationsByCEP(CEP: string) {
  const response: ViaCepPropsDTO = await axios.get(
    `https://viacep.com.br/ws/${CEP}/json/`,
  )
  return response.data
}
