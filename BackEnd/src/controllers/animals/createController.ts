import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import animalsServices from '@Services/animals'

interface animalDTO {
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: string
  image: string
  ongId: number
}

export default async function createController (req: Request, res: Response) {
  try {
    const animalData: animalDTO = req.body
    const file = req.file

    const { message, status } = await animalsServices.createService({ ...animalData, file })

    return res.status(status).json({ message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
