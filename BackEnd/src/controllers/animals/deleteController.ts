import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import animalsServices from '@Services/animals'

export default async function deleteController (req: Request, res: Response) {
  try {
    const id = req.query.id as string

    const { message, status } = await animalsServices.deleteService(id)

    return res.status(status).json({ message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
