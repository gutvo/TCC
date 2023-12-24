import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import usersServices from '@Services/users'

export default async function showImageController (req: Request, res: Response) {
  try {
    const email = req.params.email

    const { message, status, data } = await usersServices.showImageService(email)

    if (data !== undefined) {
      res.sendFile(data, {
        headers: {
          'Content-Type': 'image/jpeg'
        }
      })
    } else {
      res.status(status).json({ message })
    }
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
