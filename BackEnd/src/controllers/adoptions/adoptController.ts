import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import adoptionsService from '../../services/adoptions'

export default async function adoptController (req: Request, res: Response) {
  try {
    const adoptionId = req.body.adoptionId as string

    const { message, status } = await adoptionsService.adoptService(adoptionId)

    return res.status(status).json({ message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
