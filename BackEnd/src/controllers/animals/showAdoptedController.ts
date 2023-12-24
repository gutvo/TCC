import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import animalsServices from '@Services/animals'

export default async function showAdoptedController (req: Request, res: Response) {
  try {
    const id = req.params.id
    const { data, message, status } = await animalsServices.ShowAdoptedService(id)
    return res.status(status).json({ data, message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
