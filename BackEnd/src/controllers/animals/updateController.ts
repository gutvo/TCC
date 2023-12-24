import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import animalsServices from '@Services/animals'

export default async function updateController (req: Request, res: Response) {
  try {
    const id = req.body.id as string
    const body = req.body
    const newImage = req.file

    const { message, data, status } = await animalsServices.updateService({ body, id, newImage })

    return res.status(status).json({ data, message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
