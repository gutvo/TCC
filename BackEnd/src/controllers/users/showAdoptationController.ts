import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import usersServices from '@Services/users'

export default async function showAdoptationController (req: Request, res: Response) {
  try {
    const id = req.query.id as string

    const { message, status, data } = await usersServices.showAdoptationService(id)

    return res.status(status).json({ data, message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
