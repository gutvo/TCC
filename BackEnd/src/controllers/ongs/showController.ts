import { type Request, type Response } from 'express'
import ongsServices from '@Services/ongs'
import translate from '@Dictionary'

export default async function showController (req: Request, res: Response) {
  try {
    const id = req.query.id as string

    const { data } = await ongsServices.showService(id)

    return res.json({ data })
  } catch (error) {
    res.status(500).json({ message: translate({ id: 'server-error' }) })
  }
}
