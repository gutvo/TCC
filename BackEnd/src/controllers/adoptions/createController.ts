import { type Request, type Response } from 'express'
import adoptionsService from '../../services/adoptions'
import translate from '@Dictionary'

interface createControllerDTO {
  userId: string
  ongId: string
  animalId: string
}

export default async function createController (req: Request, res: Response) {
  try {
    const { userId, ongId, animalId } = req.body as createControllerDTO

    const { message, status, data } = await adoptionsService.createService({ animalId, ongId, userId })

    return res.status(status).json({ message, data })
  } catch (error) {
    res.status(500).json({ message: translate({ id: 'server-error' }) })
  }
}
