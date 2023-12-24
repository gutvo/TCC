import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import usersServices from '@Services/users'

export default async function deleteController (req: Request, res: Response) {
  try {
    const id = req.query.id as string
    const email = req.query.email as string

    const { message, status } = await usersServices.deleteService({ email, id })

    return res.status(status).json({ message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
