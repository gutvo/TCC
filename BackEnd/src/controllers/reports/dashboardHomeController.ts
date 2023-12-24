import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import reportsServices from '@Services/reports'

export default async function dashboardHomeController (req: Request, res: Response) {
  try {
    const { countAdoptedAnimals, countAvailableAnimals, countTotalAnimals, countTotalOngs } = await reportsServices.dashboardHomeService()

    return res.json({ countAdoptedAnimals, countAvailableAnimals, countTotalAnimals, countTotalOngs })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
