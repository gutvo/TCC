import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import citiesServices from '@Services/cities'

export default async function listController (req: Request, res: Response) {
  try {
    const { data } = await citiesServices.listService()

    return res.json({ data })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
