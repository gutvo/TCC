import axios from 'axios'

const link = 'http://localhost:8082/api/animais/'

type User = {
  id: number
  userName: string
  userEmail: string
  userAge: number
  sex: 'Macho' | 'Fêmea'
  imagem?: string | null
}

export async function addUser(user: User) {
  try {
    const response = await axios.post(link, { data: user })
    return response
  } catch (error) {
    console.log(error)
  }
}
