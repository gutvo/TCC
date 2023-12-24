import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import usersServices from '@Services/users'

export default async function updateController (req: Request, res: Response) {
  try {
    const body = req.body

    const newImage = req.file

    const { message, status, data } = await usersServices.updateService({ data: body, newImage })

    return res.status(status).json({ data, message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
