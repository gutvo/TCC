import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import animalsServices from '@Services/animals'

export default async function listRandomController (req: Request, res: Response) {
  try {
    const ongId = req.query.ongId as string
    const city = req.query.city as string

    const { data } = await animalsServices.listRandomService({ city, ongId })

    return res.json({ data })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
