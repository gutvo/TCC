import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import reportsServices from '@Services/reports'

export default async function rescuedAdoptedAnimalController (req: Request, res: Response) {
  try {
    const ongId = req.query.ongId as string
    const year = parseInt(req.query.year as string)

    const { data } = await reportsServices.rescuedAdoptedAnimalService({ ongId, year })

    return res.json({ data })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
