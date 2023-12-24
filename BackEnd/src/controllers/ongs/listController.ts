import { type Request, type Response } from 'express'
import { type OngsFilterProps } from '@Services/ongs/listService'
import ongsServices from '@Services/ongs'
import translate from '@Dictionary'

export default async function listController (req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string)
    const offset = parseInt(req.query.offset as string)
    const city = req.query.city as string
    const filter = req.query.filter as OngsFilterProps

    const { data, pagination } = await ongsServices.listService({ city, limit, offset, filter })

    return res.json({ data, pagination })
  } catch (error) {
    res.status(500).json({ message: translate({ id: 'server-error' }) })
  }
}
